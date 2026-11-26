/*
 * Mockups de computador e celular feitos com HTML e CSS,
 * em preto, branco e verde-limão. Não usam imagens externas.
 */
export default function DeviceMockup({ variant = 'both' }) {
  const desktop = (
    <div className="w-full overflow-hidden rounded-2xl border border-white/25 bg-black shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/15 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/50" />
        <span className="h-2 w-2 rounded-full bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="space-y-4 p-6 md:p-8">
        <div className="h-2 w-16 rounded bg-accent" />
        <div className="h-7 w-3/4 rounded bg-white" />
        <div className="h-2 w-1/2 rounded bg-white/30" />
        <div className="grid grid-cols-3 gap-3 pt-4">
          <div className="h-16 rounded-lg border border-white/20" />
          <div className="h-16 rounded-lg border border-white/20" />
          <div className="h-16 rounded-lg border border-accent/70" />
        </div>
      </div>
    </div>
  );

  const phone = (
    <div className="w-[34%] overflow-hidden rounded-[1.6rem] border-4 border-white/30 bg-black shadow-2xl">
      <div className="mx-auto mt-2 h-1.5 w-1/3 rounded-full bg-white/30" />
      <div className="space-y-3 p-3 pt-4">
        <div className="h-16 rounded bg-accent" />
        <div className="h-2 w-3/4 rounded bg-white/60" />
        <div className="h-2 w-1/2 rounded bg-white/30" />
        <div className="mt-3 h-8 rounded-full bg-accent" />
      </div>
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-lg pb-8" aria-hidden="true">
      {desktop}
      {variant === 'both' && <div className="absolute -bottom-2 right-3">{phone}</div>}
    </div>
  );
}
