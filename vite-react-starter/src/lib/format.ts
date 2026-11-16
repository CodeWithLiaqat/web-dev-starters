/** Join class names, skipping falsy values. */
export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

/** Format a US phone number: 3045454670 -> (304) 545-4670. Returns input unchanged if not 10 digits. */
export function formatUsPhone(input: string): string {
  const d = input.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : input;
}

/** Turn text into a URL slug. */
export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
