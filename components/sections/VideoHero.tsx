export default function VideoHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-surface">
      <video
        // Plays as an ambient loop. muted is required for browsers to
        // allow autoplay; playsInline stops iOS going fullscreen.
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/merch-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* Browsers pick the FIRST source whose media query matches, so
            the mobile file must come first. */}
        <source src="/videos/merch-hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/videos/merch-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b
                      from-black/30 via-black/40 to-black/85" />

      <div
        className="relative mx-auto flex h-full max-w-[1440px] flex-col
                   justify-end px-6 pb-24 md:px-12 md:pb-28"
      >
        <h1 className="font-heading text-[clamp(56px,10vw,140px)] font-bold
                       uppercase leading-[0.9] tracking-tight text-[#F5F0E8]">
          MSO Merch
        </h1>
        <p className="mt-5 text-xl text-[#F5F0E8]/60">Rep your roots.</p>
        <div className="mt-9">
          <a
            href="#products"
            data-cursor="hover"
            className="inline-block rounded-pill bg-primary px-10 py-4
                       font-heading text-sm font-bold uppercase tracking-widest
                       text-white transition-transform duration-300 ease-bounce
                       hover:scale-105 active:scale-95"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  )
}