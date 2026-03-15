import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function TerminalCard({ title, children, className, active }: TerminalCardProps) {
  return (
    <div
      className={cn(
        "border rounded-sm bg-card overflow-hidden",
        active ? "border-primary/50" : "border-border",
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/40">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
          </div>
          <span className="text-xs text-muted-foreground ml-1">{title}</span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
