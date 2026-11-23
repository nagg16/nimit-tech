"use client";

import { useState } from "react";

type Props = {
  children: React.ReactNode;
  language?: string;
  raw?: string;
};

export function CodeBlock({ children, language, raw }: Props) {
  const [copied, setCopied] = useState(false);
  const label = language && language !== "text" ? language : undefined;

  async function copy() {
    const text =
      raw ??
      (typeof children === "string"
        ? children
        : extractText(children));
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text.trimEnd());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <div className="code-block group relative my-5 overflow-hidden rounded-md bg-code-bg">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[0.7rem] tracking-wide text-white/55 uppercase">
          {label ?? "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded px-2 py-0.5 text-[0.7rem] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto rounded-none bg-transparent p-4 text-[0.86rem] leading-relaxed text-[#e8eef3]">
        {children}
      </pre>
    </div>
  );
}

function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = node.props as { children?: React.ReactNode };
    return extractText(props.children);
  }
  return "";
}
