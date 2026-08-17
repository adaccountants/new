import type { ReactNode } from "react";

type Block =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function parseLegalMarkdown(markdown: string): Block[] {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "ul", items: listItems });
    listItems = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "h1", text: trimmed.slice(2).trim() });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^[-*]\s+/, "").trim());
      continue;
    }
    if (trimmed.length === 0) {
      flushList();
      flushParagraph();
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }

  flushList();
  flushParagraph();
  return blocks;
}

export function LegalMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseLegalMarkdown(markdown);
  const nodes: ReactNode[] = blocks.map((block, index) => {
    if (block.type === "h1") {
      return (
        <h1
          key={index}
          className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
        >
          {block.text}
        </h1>
      );
    }
    if (block.type === "h2") {
      return (
        <h2
          key={index}
          className="mt-10 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === "ul") {
      return (
        <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
        {block.text}
      </p>
    );
  });

  return <div className="max-w-3xl">{nodes}</div>;
}
