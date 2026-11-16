import { useId, useState } from "react";

export interface AccordionItem { title: string; content: string }

/** Accessible single-open accordion (aria-expanded / aria-controls). */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title}>
            <button aria-expanded={isOpen} aria-controls={`${base}-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
              {it.title}
            </button>
            {isOpen && <p id={`${base}-${i}`}>{it.content}</p>}
          </div>
        );
      })}
    </div>
  );
}
