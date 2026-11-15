export function ArchitectureHeroVisual() {
  return (
    <div className="hero-plane relative min-h-[280px] w-full overflow-hidden sm:min-h-[340px] lg:min-h-[420px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 960 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          className="architecture-line"
          d="M120 210 H280 C310 210 310 120 340 120 H460 C490 120 490 210 520 210 H840"
          stroke="rgba(232,238,243,0.55)"
          strokeWidth="2"
        />
        <path
          className="architecture-line"
          d="M280 210 C310 210 310 300 340 300 H620 C650 300 650 210 680 210"
          stroke="rgba(217,119,6,0.55)"
          strokeWidth="2"
          style={{ animationDelay: "0.7s" }}
        />

        {[
          { x: 120, y: 210, label: "SitecoreAI" },
          { x: 340, y: 120, label: "Experience Edge" },
          { x: 340, y: 300, label: "CDP / Personalize" },
          { x: 620, y: 210, label: "Next.js" },
          { x: 840, y: 210, label: "CDN" },
        ].map((node, i) => (
          <g key={node.label} className="architecture-node" style={{ animationDelay: `${i * 0.25}s` }}>
            <circle cx={node.x} cy={node.y} r="10" fill="#0f766e" stroke="#e8eef3" strokeWidth="2" />
            <text
              x={node.x}
              y={node.y + 34}
              textAnchor="middle"
              fill="rgba(232,238,243,0.9)"
              fontSize="13"
              fontFamily="var(--font-body), sans-serif"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(15,28,36,0.55)] to-transparent" />
    </div>
  );
}
