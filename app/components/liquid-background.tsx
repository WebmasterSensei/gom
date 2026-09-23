export default function LiquidBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(27,19,38,0.55) 0%, rgba(21,16,33,0.15) 45%, rgba(15,12,23,0.55) 100%)",
        }}
      />

      {/* Drifting liquid blobs */}
      <div
        className="liquid-blob left-[-12%] top-[-10%] h-[60vmax] w-[60vmax]"
        style={{ background: "radial-gradient(circle at 35% 35%, rgba(217,167,47,0.5), transparent 62%)" }}
      />
      <div
        className="liquid-blob right-[-14%] bottom-[-12%] h-[58vmax] w-[58vmax]"
        style={{
          background: "radial-gradient(circle at 60% 60%, rgba(112,58,140,0.5), transparent 62%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="liquid-blob left-[18%] bottom-[-18%] h-[44vmax] w-[44vmax]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(125,58,93,0.45), transparent 60%)",
          animationDelay: "-12s",
        }}
      />
      <div
        className="liquid-blob right-[22%] top-[-14%] h-[38vmax] w-[38vmax]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(56,90,140,0.4), transparent 60%)",
          animationDelay: "-3s",
        }}
      />

      {/* Glassy sheen sweep */}
      <div className="liquid-sheen" />

      {/* Film grain for the material feel */}
      <div className="grain absolute inset-0" />
    </div>
  );
}