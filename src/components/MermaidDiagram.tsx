"use client";

import { useEffect, useId, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const reactId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "neutral",
          fontFamily: "var(--font-source), system-ui, sans-serif",
        });
        const { svg: rendered } = await mermaid.render(
          `mermaid-${reactId}`,
          chart.trim(),
        );
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (failed) {
    return (
      <pre className="my-5 overflow-x-auto rounded-md bg-code-bg p-4 text-[0.86rem] text-[#e8eef3]">
        {chart}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="my-5 border border-line bg-mist/40 px-4 py-8 text-center text-sm text-ink-soft">
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      className="mermaid-diagram my-5 overflow-x-auto border border-line bg-paper/90 p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
