import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const heightToNumber = (str: string): number => {
    return Number(str.replace("px", "")) || 0;
  };

const calculateRows = (textarea: HTMLTextAreaElement | null): number => {
    if (!textarea) return 1;
    const style = getComputedStyle(textarea);
    const lineHeight = heightToNumber(style.lineHeight) || 20;
    const paddingY = heightToNumber(style.paddingTop) + heightToNumber(style.paddingBottom);
    const textareaHeight = textarea.scrollHeight;
    return Math.floor((textareaHeight - paddingY) / lineHeight) || 1;
  };


export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [rows, setRows] = useState(1);

  const handleInput = () => {
    setRows(calculateRows(textareaRef.current));
  };

  useEffect(() => {
    setRows(calculateRows(textareaRef.current));
  }, []);

  return (
    <textarea
      ref={textareaRef}
      rows={rows}
      onInput={handleInput}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}


