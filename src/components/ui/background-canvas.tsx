export const BackgroundCanvas = () => {
  return (
    <>
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div
          className="absolute inset-x-0 top-0 h-72 opacity-[0.08] dark:opacity-[0.05]"
          style={{ background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-72 opacity-[0.08] dark:opacity-[0.05]"
          style={{ background: 'linear-gradient(0deg, hsl(var(--muted)) 0%, transparent 100%)' }}
        />
      </div>

      {/* Tactile Paper Texture & Noise Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.018] dark:opacity-[0.028] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};
