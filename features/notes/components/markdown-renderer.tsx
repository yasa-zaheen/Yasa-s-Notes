"use client";

// Imports
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";

// Component
export function MarkdownRenderer({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <div
      suppressHydrationWarning
      className={cn(
        "max-w-none space-y-3 text-[15px] leading-7 text-foreground [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h3]:font-heading [&_h3]:text-base [&_h3]:font-semibold [&_li]:my-1 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_table]:w-full [&_table]:text-sm [&_td]:border-b [&_td]:px-2 [&_td]:py-1.5 [&_th]:border-b [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-5",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
