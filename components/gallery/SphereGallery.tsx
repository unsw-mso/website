'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { gsap } from '@/lib/utils/gsap'
import { galleryCards, type GalleryCard } from './galleryData'

/* ────────────────────────────────────────────────────────────────────────
   Sphere / grid tuning. We tile cards onto the INSIDE of a sphere and put
   the camera at the centre, so you're looking outward at a curved wall of
   work — the phantom.land effect. Everything below was tuned live against
   the reference in Chrome; change COLS/ROWS/RADIUS and the layout re-tiles.
   ──────────────────────────────────────────────────────────────────────── */
const RADIUS = 10 // sphere radius (world units); camera sits at 0,0,0
const COLS = 16 // cards around the full 360° band
// We lay the cards out on the ORIGINAL full-sphere grid (curvier, more
// circular) but only build the middle band: TOTAL_ROWS defines the curve,
// SKIP_ROWS drops that many rows off the top AND bottom. 8 − 2 − 2 = 4 rows.
const TOTAL_ROWS = 8
const SKIP_ROWS = 2
const PHI_MAX = 1.16 // latitude the full grid would span (radians, ~66°)
const CARD_W = 3.05
const CARD_H = 3.5
const FOV = 66 // wider FOV = stronger fisheye toward the edges

const ROT_SENS = 0.0042 // radians of rotation per pixel dragged
const EASE = 0.085 // lenis-style follow lag (lower = floatier)
const FRICTION = 0.94 // momentum decay after release
const DRIFT = 0.00035 // gentle idle auto-rotation
// The band is centred on the equator, so black sky sits above the top row and
// a black floor below the bottom row. Clamp keeps you from tilting so far you
// lose the band into that emptiness.
const PITCH_UP = 0.4 // max tilt looking up
const PITCH_DOWN = -0.4 // max tilt looking down (into the floor)

/* Face art used for every card until a per-card `image` is set. Swap the file
   at this path (e.g. drop in the tiger PNG) and every card updates. */
const CARD_PLACEHOLDER = '/images/card-placeholder.png'

/* ── Procedural card texture ─────────────────────────────────────────────
   Draws a full phantom-style tile onto a canvas: brand + event date across the
   top, an image (or gradient fallback) in the middle with a big title, then a
   date + tag pills + year meta row. Black margins blend into the scene. The
   image is drawn only once it has loaded; drawCardFace is re-run then. */
const CARD_CANVAS_W = 900
const CARD_CANVAS_H = 1040

function drawCardFace(
  ctx: CanvasRenderingContext2D,
  card: GalleryCard,
  img?: HTMLImageElement,
) {
  const W = CARD_CANVAS_W
  const H = CARD_CANVAS_H
  ctx.clearRect(0, 0, W, H)

  // Opaque background matching the scene so we avoid alpha-sorting artifacts
  ctx.fillStyle = '#0A0A0A'
  ctx.fillRect(0, 0, W, H)

  const pad = 40
  const light = '#F5F0E8'

  const roundRect = (x: number, y: number, w: number, h: number, rad: number) => {
    ctx.beginPath()
    ctx.moveTo(x + rad, y)
    ctx.arcTo(x + w, y, x + w, y + h, rad)
    ctx.arcTo(x + w, y + h, x, y + h, rad)
    ctx.arcTo(x, y + h, x, y, rad)
    ctx.arcTo(x, y, x + w, y, rad)
    ctx.closePath()
  }

  // ── top label row (bigger, more legible) ──
  ctx.textBaseline = 'alphabetic'
  ctx.font = '700 34px "Space Grotesk", sans-serif'
  ctx.fillStyle = card.brand === 'MSO' ? '#FF6B00' : 'rgba(245,240,232,0.9)'
  ctx.textAlign = 'left'
  ctx.fillText(card.brand.toUpperCase(), pad, 66)

  ctx.font = '600 30px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(245,240,232,0.75)'
  ctx.textAlign = 'right'
  ctx.fillText(card.date.toUpperCase(), W - pad, 64)

  // ── image area ──
  const ix = pad
  const iy = 100
  const iw = W - pad * 2
  const ih = iw // square
  const r = 18

  ctx.save()
  roundRect(ix, iy, iw, ih, r)
  ctx.clip()

  if (img && img.complete && img.naturalWidth > 0) {
    // cover-fit the image into the square face
    const dar = iw / ih
    const iar = img.naturalWidth / img.naturalHeight
    let sw: number, sh: number, sx: number, sy: number
    if (iar > dar) {
      sh = img.naturalHeight
      sw = sh * dar
      sx = (img.naturalWidth - sw) / 2
      sy = 0
    } else {
      sw = img.naturalWidth
      sh = sw / dar
      sx = 0
      sy = (img.naturalHeight - sh) / 2
    }
    ctx.drawImage(img, sx, sy, sw, sh, ix, iy, iw, ih)
  } else {
    // gradient fallback face
    const grad = ctx.createLinearGradient(ix, iy, ix + iw, iy + ih)
    grad.addColorStop(0, card.colors[0])
    grad.addColorStop(1, card.colors[1])
    ctx.fillStyle = grad
    ctx.fillRect(ix, iy, iw, ih)

    const glow = ctx.createRadialGradient(
      ix + iw * 0.72, iy + ih * 0.28, 20,
      ix + iw * 0.72, iy + ih * 0.28, iw * 0.6,
    )
    glow.addColorStop(0, 'rgba(255,255,255,0.28)')
    glow.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = glow
    ctx.fillRect(ix, iy, iw, ih)

    ctx.strokeStyle = card.accent
    ctx.globalAlpha = 0.55
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.ellipse(ix + iw * 0.68, iy + ih * 0.34, iw * 0.22, iw * 0.1, -0.5, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(ix + iw * 0.68, iy + ih * 0.34, iw * 0.1, iw * 0.22, -0.5, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  // legibility scrim at the bottom so the title reads over any art
  const scrim = ctx.createLinearGradient(0, iy + ih * 0.52, 0, iy + ih)
  scrim.addColorStop(0, 'rgba(0,0,0,0)')
  scrim.addColorStop(1, 'rgba(0,0,0,0.82)')
  ctx.fillStyle = scrim
  ctx.fillRect(ix, iy + ih * 0.52, iw, ih * 0.48)

  // big title, wrapped, bottom-left
  ctx.textAlign = 'left'
  ctx.fillStyle = light
  ctx.font = '700 68px "Space Grotesk", sans-serif'
  const words = card.title.toUpperCase().split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > iw - 56 && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  lines.push(line)
  const lineH = 70
  let ty = iy + ih - 40 - (lines.length - 1) * lineH
  for (const l of lines) {
    ctx.fillText(l, ix + 28, ty)
    ty += lineH
  }
  ctx.restore()

  // faint frame around image
  ctx.strokeStyle = 'rgba(245,240,232,0.12)'
  ctx.lineWidth = 1
  roundRect(ix + 0.5, iy + 0.5, iw - 1, ih - 1, r)
  ctx.stroke()

  // ── meta row (date + tags + year), all bumped up in size ──
  const my = iy + ih + 54
  ctx.font = '600 30px "Space Grotesk", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillStyle = 'rgba(245,240,232,0.95)'
  ctx.fillText(card.date.toUpperCase(), pad, my)

  // tag pills after the date
  let px = pad + ctx.measureText(card.date.toUpperCase()).width + 24
  ctx.font = '500 26px "Space Grotesk", sans-serif'
  for (const tag of card.tags) {
    const tw = ctx.measureText(tag).width
    const pw = tw + 34
    ctx.strokeStyle = 'rgba(245,240,232,0.24)'
    ctx.lineWidth = 1.5
    roundRect(px, my - 34, pw, 48, 24)
    ctx.stroke()
    ctx.fillStyle = 'rgba(245,240,232,0.78)'
    ctx.fillText(tag, px + 17, my)
    px += pw + 14
  }

  // year, right-aligned
  ctx.textAlign = 'right'
  ctx.font = '500 30px "Space Grotesk", sans-serif'
  ctx.fillStyle = 'rgba(245,240,232,0.5)'
  ctx.fillText(card.year, W - pad, my)
}

interface Selected {
  card: GalleryCard
}

export default function SphereGallery() {
  const mountRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [selected, setSelected] = useState<Selected | null>(null)
  // Imperative handles the render loop needs but React shouldn't re-render on
  const api = useRef<{ closeDetail: () => void }>({ closeDetail: () => {} })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0A0A0A')
    // subtle depth fog so far cards recede into the black
    scene.fog = new THREE.Fog('#0A0A0A', RADIUS * 0.4, RADIUS * 2.4)

    // Fullscreen fixed overlay — size from the viewport. (Reading clientHeight
    // off the mount can be 0 mid-hydration while the template transition runs.)
    const sizeW = () => mount.clientWidth || window.innerWidth
    const sizeH = () => mount.clientHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(FOV, sizeW() / sizeH(), 0.1, 100)
    camera.position.set(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizeW(), sizeH())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.touchAction = 'none'

    const maxAniso = renderer.capabilities.getMaxAnisotropy()

    // Build a texture per unique card, reused across tiles. Each starts with
    // the gradient fallback drawn immediately, then swaps to the card image as
    // soon as it loads (redraw + needsUpdate) so nothing pops in blank.
    const loadedImages: HTMLImageElement[] = []
    const textures = galleryCards.map((card) => {
      const canvas = document.createElement('canvas')
      canvas.width = CARD_CANVAS_W
      canvas.height = CARD_CANVAS_H
      const ctx = canvas.getContext('2d')!
      drawCardFace(ctx, card)

      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = maxAniso
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.generateMipmaps = true

      const src = card.image ?? CARD_PLACEHOLDER
      if (src) {
        const img = new Image()
        loadedImages.push(img)
        img.onload = () => {
          drawCardFace(ctx, card, img)
          tex.needsUpdate = true
        }
        img.src = src
      }
      return tex
    })

    const group = new THREE.Group()
    scene.add(group)

    const geometry = new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1)
    const meshes: THREE.Mesh[] = []
    const worldUp = new THREE.Vector3(0, 1, 0)
    const orient = new THREE.Matrix4()
    const origin = new THREE.Vector3(0, 0, 0)

    let idx = 0
    // Walk the ORIGINAL full-sphere grid but skip the top/bottom SKIP_ROWS so
    // the surviving rows keep the wider, curvier spacing of the full sphere.
    for (let row = SKIP_ROWS; row < TOTAL_ROWS - SKIP_ROWS; row++) {
      const phi = -PHI_MAX + (row / (TOTAL_ROWS - 1)) * (PHI_MAX * 2)
      // brick-offset alternate rows a touch so the grid feels less rigid
      const rowOffset = (row % 2) * (Math.PI / COLS)
      for (let col = 0; col < COLS; col++) {
        const theta = (col / COLS) * Math.PI * 2 + rowOffset
        const cardData = galleryCards[idx % galleryCards.length]
        const mat = new THREE.MeshBasicMaterial({
          map: textures[idx % textures.length],
          transparent: true,
          side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(geometry, mat)

        const x = RADIUS * Math.cos(phi) * Math.sin(theta)
        const y = RADIUS * Math.sin(phi)
        const z = RADIUS * Math.cos(phi) * Math.cos(theta)
        mesh.position.set(x, y, z)
        // Orient every card to face the centre with a fixed world up-vector.
        // (setFromUnitVectors takes the shortest arc and rolls the card as you
        // pass behind the camera; lookAt with an up keeps them all upright.)
        orient.lookAt(origin, mesh.position, worldUp)
        mesh.quaternion.setFromRotationMatrix(orient)
        mesh.userData = { card: cardData, baseScale: 1, hover: 0 }
        group.add(mesh)
        meshes.push(mesh)
        idx++
      }
    }

    /* ── interaction state ── */
    const rot = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const vel = { x: 0, y: 0 }
    let dragging = false
    let interacted = false
    let last = { x: 0, y: 0 }
    let downAt = { x: 0, y: 0 }
    let frozen = false // true while a detail card is open

    const pointer = new THREE.Vector2(-2, -2)
    const clickNDC = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    let hovered: THREE.Mesh | null = null

    const clampPitch = () => {
      target.x = Math.max(PITCH_DOWN, Math.min(PITCH_UP, target.x))
    }

    const onDown = (e: PointerEvent) => {
      if (frozen) return
      dragging = true
      interacted = true
      last = { x: e.clientX, y: e.clientY }
      downAt = { x: e.clientX, y: e.clientY }
      vel.x = 0
      vel.y = 0
      renderer.domElement.setPointerCapture(e.pointerId)
    }

    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      if (!dragging || frozen) return
      const dx = e.clientX - last.x
      const dy = e.clientY - last.y
      target.y += dx * ROT_SENS
      target.x += dy * ROT_SENS
      clampPitch()
      vel.y = dx * ROT_SENS
      vel.x = dy * ROT_SENS
      last = { x: e.clientX, y: e.clientY }
    }

    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      try {
        renderer.domElement.releasePointerCapture(e.pointerId)
      } catch {}
      // treat a near-still press+release as a click. Raycast fresh from THIS
      // event's own coordinates rather than the render loop's `hovered` (which
      // can be a frame stale) or the shared `pointer` (which only updates on
      // pointermove — a synthetic click may skip that).
      const dist = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y)
      if (dist < 6 && !frozen) {
        const rect = renderer.domElement.getBoundingClientRect()
        clickNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        clickNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(clickNDC, camera)
        const hit = raycaster.intersectObjects(meshes, false)[0]?.object as
          | THREE.Mesh
          | undefined
        if (hit) openDetail(hit)
      }
    }

    renderer.domElement.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    /* ── open / close detail ── */
    let flying: THREE.Mesh | null = null
    const flyStore = { pos: new THREE.Vector3(), quat: new THREE.Quaternion(), scale: 1 }

    const openDetail = (mesh: THREE.Mesh) => {
      frozen = true
      flying = mesh
      flyStore.pos.copy(mesh.position)
      flyStore.quat.copy(mesh.quaternion)
      flyStore.scale = mesh.scale.x

      // Bring the chosen card to the top of the render order
      ;(mesh.material as THREE.Material).depthTest = false
      mesh.renderOrder = 999

      // A point ~2.4 units in front of the camera, along the card's view dir
      const front = mesh.position.clone().normalize().multiplyScalar(2.4)
      const faceCam = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        front.clone().negate().normalize(),
      )

      gsap.to(mesh.position, {
        x: front.x, y: front.y, z: front.z,
        duration: 0.9, ease: 'power3.inOut',
      })
      gsap.to(mesh.scale, {
        x: 2.05, y: 2.05, z: 2.05,
        duration: 0.9, ease: 'power3.inOut',
      })
      gsap.to(mesh.quaternion, {
        x: faceCam.x, y: faceCam.y, z: faceCam.z, w: faceCam.w,
        duration: 0.9, ease: 'power3.inOut',
      })
      // dim everyone else
      meshes.forEach((m) => {
        if (m === mesh) return
        gsap.to(m.material as THREE.MeshBasicMaterial, {
          opacity: 0.12, duration: 0.6, ease: 'power2.out',
        })
      })

      setSelected({ card: mesh.userData.card as GalleryCard })
    }

    const closeDetail = () => {
      if (!flying) return
      const mesh = flying
      gsap.to(mesh.position, {
        x: flyStore.pos.x, y: flyStore.pos.y, z: flyStore.pos.z,
        duration: 0.8, ease: 'power3.inOut',
      })
      gsap.to(mesh.scale, {
        x: flyStore.scale, y: flyStore.scale, z: flyStore.scale,
        duration: 0.8, ease: 'power3.inOut',
      })
      gsap.to(mesh.quaternion, {
        x: flyStore.quat.x, y: flyStore.quat.y, z: flyStore.quat.z, w: flyStore.quat.w,
        duration: 0.8, ease: 'power3.inOut',
        onComplete: () => {
          ;(mesh.material as THREE.Material).depthTest = true
          mesh.renderOrder = 0
          flying = null
          frozen = false
        },
      })
      meshes.forEach((m) => {
        if (m === mesh) return
        gsap.to(m.material as THREE.MeshBasicMaterial, {
          opacity: 1, duration: 0.6, ease: 'power2.out',
        })
      })
      setSelected(null)
    }
    api.current.closeDetail = closeDetail

    /* ── resize ── */
    const onResize = () => {
      const w = sizeW()
      const h = sizeH()
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)
    // Catches the case where the overlay resolves its height a frame after mount
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)

    /* ── entry animation ── */
    group.scale.setScalar(1.6)
    meshes.forEach((m) => ((m.material as THREE.MeshBasicMaterial).opacity = 0))
    gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 1.6, ease: 'power3.out' })
    meshes.forEach((m, i) => {
      gsap.to(m.material as THREE.MeshBasicMaterial, {
        opacity: 1,
        duration: 0.8,
        delay: 0.15 + (i / meshes.length) * 0.7,
        ease: 'power2.out',
      })
    })
    target.y = -0.5
    gsap.to(target, { y: 0, duration: 2, ease: 'power3.out' })

    /* ── render loop ── */
    let raf = 0
    const tmpScale = new THREE.Vector3()
    const tick = () => {
      raf = requestAnimationFrame(tick)

      if (!frozen) {
        if (!dragging) {
          target.y += vel.y
          target.x += vel.x
          vel.y *= FRICTION
          vel.x *= FRICTION
          clampPitch()
          // idle drift once momentum has died down
          if (!interacted || (Math.abs(vel.y) < 0.0004 && Math.abs(vel.x) < 0.0004)) {
            target.y += DRIFT
          }
        }
        rot.y += (target.y - rot.y) * EASE
        rot.x += (target.x - rot.x) * EASE
        group.rotation.x = rot.x
        group.rotation.y = rot.y

        // hover raycast (skip while actively dragging for perf/feel)
        if (!dragging) {
          raycaster.setFromCamera(pointer, camera)
          const hits = raycaster.intersectObjects(meshes, false)
          const first = (hits[0]?.object as THREE.Mesh) ?? null
          if (first !== hovered) {
            hovered = first
            renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab'
          }
        }
      }

      // ease hover scale on each card (skip the card GSAP is flying)
      for (const m of meshes) {
        if (frozen && m === flying) continue
        const want = m === hovered && !dragging ? 1 : 0
        m.userData.hover += (want - m.userData.hover) * 0.15
        tmpScale.setScalar(1 + m.userData.hover * 0.12)
        m.scale.copy(tmpScale)
      }

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      renderer.domElement.removeEventListener('pointerdown', onDown)
      loadedImages.forEach((img) => (img.onload = null))
      geometry.dispose()
      meshes.forEach((m) => (m.material as THREE.Material).dispose())
      textures.forEach((t) => t.dispose())
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[1000] select-none bg-bg">
      {/* WebGL canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* top chrome — mimics the phantom HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6 md:p-8">
        <div className="max-w-[280px] font-heading text-[11px] uppercase leading-relaxed tracking-[0.12em] text-text-60">
          MSO ARCHIVE — A SPHERICAL RECORD OF EVERY NIGHT, GAME AND GATHERING.
        </div>
        <button
          onClick={() => router.push('/events')}
          className="pointer-events-auto rounded-pill border border-line bg-bg/40 px-5 py-2.5
                     font-heading text-[12px] uppercase tracking-widest text-text
                     backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
        >
          Close
        </button>
      </div>

      {/* bottom hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-8">
        <span className="font-heading text-[11px] uppercase tracking-[0.2em] text-text-muted">
          Drag to explore · Tap a card to open
        </span>
      </div>

      {/* detail overlay — the "new page" that animates in on tap */}
      {selected && (
        <DetailPanel card={selected.card} onClose={() => api.current.closeDetail()} />
      )}
    </div>
  )
}

/* ── the basic detail "page" that flies in over the gallery ── */
function DetailPanel({ card, onClose }: { card: GalleryCard; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el, { xPercent: 100, duration: 0.7, ease: 'power4.out' })
      gsap.from('[data-detail-item]', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.25,
        ease: 'power3.out',
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const close = () => {
    const el = ref.current
    if (!el) return onClose()
    gsap.to(el, {
      xPercent: 100,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={ref}
      className="absolute inset-y-0 right-0 z-20 flex w-full flex-col justify-between
                 border-l border-line bg-bg/85 p-8 backdrop-blur-2xl md:w-[46%] md:p-14"
    >
      <div>
        <button
          data-detail-item
          onClick={close}
          className="mb-12 flex items-center gap-2 font-heading text-[12px] uppercase
                     tracking-widest text-text-60 transition-colors hover:text-primary"
        >
          ← Back to sphere
        </button>

        <div
          data-detail-item
          className="mb-6 inline-block rounded-pill border border-line px-4 py-1.5
                     font-heading text-[11px] uppercase tracking-widest text-text-60"
        >
          {card.date} · {card.year}
        </div>

        <h1
          data-detail-item
          className="font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight
                     text-text md:text-7xl"
        >
          {card.title}
        </h1>

        <div
          data-detail-item
          className="mt-10 h-[42vh] w-full overflow-hidden rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${card.colors[0]} 0%, ${card.colors[1]} 100%)`,
          }}
        />

        <p data-detail-item className="mt-10 max-w-md text-[15px] leading-relaxed text-text-60">
          A moment from the {card.brand} archive. This template stands in for a full
          case-study page — headline, hero, gallery and story would live here. The focus
          of this build is the spherical gallery you just came from.
        </p>
      </div>

      <div data-detail-item className="flex flex-wrap gap-3 pt-8">
        {card.tags.map((t) => (
          <span
            key={t}
            className="rounded-pill border border-line px-4 py-2 font-heading text-[11px]
                       uppercase tracking-widest text-text-60"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
