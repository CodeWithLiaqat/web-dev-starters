import { describe, expect, it } from "vitest";
import { cn, formatUsPhone, slugify } from "./format";

describe("format helpers", () => {
  it("cn skips falsy", () => expect(cn("a", false, null, "b")).toBe("a b"));
  it("formats 10 digits", () => expect(formatUsPhone("3045454670")).toBe("(304) 545-4670"));
  it("drops leading 1", () => expect(formatUsPhone("+1 304 545 4670")).toBe("(304) 545-4670"));
  it("leaves odd input", () => expect(formatUsPhone("12345")).toBe("12345"));
  it("slugifies", () => expect(slugify("  Café & Bar -- 24/7! ")).toBe("cafe-bar-24-7"));
});
