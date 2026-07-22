export default function Home() {
  return (
    <main className="flex min-h-[250vh] flex-col items-center justify-start gap-8 p-24">
      <h1 className="font-heading text-6xl font-bold uppercase tracking-tight">
        Session 1 live
      </h1>
      <p data-cursor="text" className="max-w-md text-text-60">
        Hover me — the blob should become a caret. Scroll — it should glide.
        Click the corner flap — everything should crossfade.
      </p>
      <button
        data-cursor="hover"
        className="rounded-pill bg-primary px-8 py-4 font-heading text-sm
                   font-bold uppercase tracking-widest text-white
                   transition-transform duration-300 ease-bounce hover:scale-105"
      >
        Hover me
      </button>
      <div className="mt-40 h-[80vh] w-full rounded-lg bg-surface shadow-soft" />
    </main>
  )
}