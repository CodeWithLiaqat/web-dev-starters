import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("allows up to the limit then blocks", () => {
    const results = Array.from({ length: 4 }, () => rateLimit("a", 3, 1000).ok);
    expect(results).toEqual([true, true, true, false]);
  });

  it("tracks keys independently", () => {
    rateLimit("x", 1, 1000);
    expect(rateLimit("x", 1, 1000).ok).toBe(false);
    expect(rateLimit("y", 1, 1000).ok).toBe(true);
  });

  it("resets after the window", () => {
    rateLimit("w", 1, 1000);
    expect(rateLimit("w", 1, 1000).ok).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(rateLimit("w", 1, 1000).ok).toBe(true);
  });
});
