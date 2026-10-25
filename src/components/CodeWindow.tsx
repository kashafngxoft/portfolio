"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

type TokenKind = "kw" | "fn" | "str" | "type" | "comment" | "plain";
type Token = [text: string, kind?: TokenKind];

// The snippet from the original hero, now syntax-tinted.
const lines: Token[][] = [
  [["@app.post", "fn"], ["("], ['"/api/features"', "str"], [")"]],
  [["async def ", "kw"], ["ship", "fn"], ["(feature: "], ["Feature", "type"], ["):"]],
  [["    plan = "], ["clarify", "fn"], ["(feature)"]],
  [["    api = "], ["design_contract", "fn"], ["(plan)"]],
  [["    ui = "], ["integrate_react", "fn"], ["(api)"]],
  [["    "], ["return ", "kw"], ["deploy", "fn"], ["(ui, api)"]],
  [],
  [["# FastAPI · React · Next.js · Python", "comment"]],
  [["# Shopenzi · Amspensan · Rench · Earth Day", "comment"]],
];

const tokenClass: Record<TokenKind, string> = {
  kw: "code-kw",
  fn: "code-fn",
  str: "code-str",
  type: "code-type",
  comment: "code-comment",
  plain: "",
};

/** Decorative editor window; its lines type in the first time it scrolls into view. */
export function CodeWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className={`code-window relative overflow-hidden ${inView ? "is-typing" : ""}`} aria-hidden>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-3 font-mono text-[0.7rem] text-ink-subtle">ship.py</span>
        <span className="ml-auto rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-subtle">
          python
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[0.72rem] leading-[1.85] text-ink sm:text-[0.8rem]">
        <code>
          {lines.map((tokens, index) => (
            <span key={index} className="code-line" style={{ "--i": index } as React.CSSProperties}>
              <span className="mr-5 inline-block w-4 select-none text-right text-ink-subtle/60">
                {index + 1}
              </span>
              {tokens.map(([text, kind = "plain"], tokenIndex) => (
                <span key={tokenIndex} className={tokenClass[kind]}>
                  {text}
                </span>
              ))}
              {index === lines.length - 1 ? <span className="caret" /> : null}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
