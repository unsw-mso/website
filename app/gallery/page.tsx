'use client'

import SphereGallery from '@/components/gallery/SphereGallery'

/**
 * Full-screen spherical gallery. It's a fixed, z-1000 overlay so it sits on
 * top of the persistent Navbar/Footer from the root layout — you're meant to
 * be *inside* the sphere with no site chrome competing for attention. The
 * component ships its own Close button back to /events.
 */
export default function GalleryPage() {
  return <SphereGallery />
}
