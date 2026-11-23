import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "@/components/CodeBlock";
import { MermaidDiagram } from "@/components/MermaidDiagram";

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  children?: React.ReactNode;
  className?: string;
  node?: unknown;
};

function getText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    return getText(
      (node as React.ReactElement<{ children?: React.ReactNode }>).props.children,
    );
  }
  return "";
}

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          a({ href, children }) {
            if (!href) return <span>{children}</span>;
            const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");
            if (external) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <Link href={href}>{children}</Link>;
          },
          code({ className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className ?? "");
            const language = match?.[1];
            const text = getText(children).replace(/\n$/, "");
            const isInline =
              !language && !text.includes("\n") && !className?.includes("hljs");

            if (isInline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            if (language === "mermaid") {
              return <MermaidDiagram chart={text} />;
            }

            return (
              <CodeBlock language={language} raw={text}>
                <code className={className}>{children}</code>
              </CodeBlock>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
