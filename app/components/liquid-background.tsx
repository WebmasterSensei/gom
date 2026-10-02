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
            "linear-gradient(180deg, rgba(27,19,38,0.5) 0%, rgba(21,16,33,0.12) 45%, rgba(15,12,23,0.5) 100%)",
        }}
      />

      {/* Drifting liquid blobs */}
      <div
        className="liquid-blob left-[-12%] top-[-10%] h-[56vmax] w-[56vmax] md:h-[60vmax] md:w-[60vmax]"
        style={{ background: "radial-gradient(circle at 35% 35%, rgba(217,167,47,0.42), transparent 64%)" }}
      />
      <div
        className="liquid-blob right-[-14%] bottom-[-12%] h-[54vmax] w-[54vmax] md:h-[58vmax] md:w-[58vmax]"
        style={{
          background: "radial-gradient(circle at 60% 60%, rgba(112,58,140,0.42), transparent 64%)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="liquid-blob left-[18%] bottom-[-18%] h-[40vmax] w-[40vmax] md:h-[44vmax] md:w-[44vmax]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(125,58,93,0.38), transparent 62%)",
          animationDelay: "-14s",
        }}
      />
      <div
        className="liquid-blob right-[22%] top-[-14%] h-[34vmax] w-[34vmax] md:h-[38vmax] md:w-[38vmax] max-md:hidden"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(56,90,140,0.36), transparent 62%)",
          animationDelay: "-4s",
        }}
      />

      {/* Glassy sheen sweep */}
      <div className="liquid-sheen" />

      {/* Film grain for the material feel */}
      <div className="grain absolute inset-0" />
    </div>
  );
}