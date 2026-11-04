"use client";

// Imports
import Editor, { type OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

// Component
export function CodeEditor({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "vs-dark" : "light";

  const handleMount = useCallback<OnMount>((editor) => {
    editor.updateOptions({
      minimap: { enabled: false },
      fontSize: 14,
      lineHeight: 22,
      padding: { top: 12, bottom: 12 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      wordWrap: "on",
    });
  }, []);

  return (
    <div className="h-full min-h-[280px] overflow-hidden rounded-lg border bg-[#fffffe] dark:bg-[#1e1e1e]">
      <Editor
        language="python"
        theme={theme}
        value={value}
        onChange={(next) => onChange?.(next ?? "")}
        onMount={handleMount}
        loading={<p className="p-4 text-sm text-muted-foreground">Loading editor…</p>}
        options={{
          readOnly,
          domReadOnly: readOnly,
          minimap: { enabled: false },
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      />
    </div>
  );
}
