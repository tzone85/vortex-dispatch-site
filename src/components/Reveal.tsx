import type { ElementType, ReactNode } from "react";
import { useReveal } from "./hooks";

interface RevealProps {
  children: ReactNode;
  /** stagger, in ms */
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
}

/** Wraps children in a reveal-on-scroll container with an optional stagger. */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "", id }: RevealProps) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
