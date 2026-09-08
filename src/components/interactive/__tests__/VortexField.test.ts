import { describe, expect, it } from "vitest";
import { Fragment, createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { VortexField } from "../VortexField";

/**
 * Hero mounts VortexField twice (a hidden mobile copy and the desktop one).
 * Chromium refuses to paint a gradient defined inside a display:none subtree,
 * and url(#id) always resolves to the FIRST id in the document, so shared ids
 * made the spiral arms and core glow vanish in Chrome, Dia and friends.
 * Every instance must own its paint servers.
 */
const idsOf = (html: string) => [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const refsOf = (html: string) => [...html.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);

describe("VortexField paint servers", () => {
  const a = renderToStaticMarkup(createElement(VortexField));
  // Both instances in ONE tree, as Hero mounts them (ids come from useId).
  const both = renderToStaticMarkup(
    createElement(Fragment, null, createElement(VortexField), createElement(VortexField)),
  );

  it("defines gradients and a filter", () => {
    expect(idsOf(a).length).toBeGreaterThanOrEqual(3);
    expect(refsOf(a).length).toBeGreaterThanOrEqual(3);
  });

  it("references only ids it defines itself", () => {
    for (const ref of refsOf(a)) expect(idsOf(a)).toContain(ref);
  });

  it("two mounted instances never share an id", () => {
    const ids = idsOf(both);
    expect(ids.length).toBe(idsOf(a).length * 2);
    expect(new Set(ids).size).toBe(ids.length);
    for (const ref of refsOf(both)) expect(ids).toContain(ref);
  });
});
