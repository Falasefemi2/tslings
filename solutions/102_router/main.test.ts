// 102_router.ts — Typed router
// Capstone: records, string splitting, and classes from earlier chapters.
// A tiny router maps path patterns to handlers; colon segments like
// `:id` capture that path piece into `params`, and anything unmatched
// falls through to "404". The matcher below is one expression away
// from correct.
//
// Can you find the problem?
import { test, expect } from "bun:test";
type Handler = (params: Record<string, string>) => string;
function matchRoute(route: string, url: string): Record<string, string> | undefined {
  const rParts = route.split("/");
  const uParts = url.split("/");
  if (rParts.length !== uParts.length) return undefined;
  const params: Record<string, string> = {};
  for (let i = 0; i < rParts.length; i++) {
    const rp = rParts[i];
    const up = uParts[i];
    if (rp === undefined || up === undefined) return undefined;
    if (rp.startsWith(":")) {
      params[rp.slice(1)] = up;
    } else if (rp !== up) {
      return undefined;
    }
  }
  return params;
}
class Router {
  private routes = new Map<string, Handler>();
  add(path: string, handler: Handler): void {
    this.routes.set(path, handler);
  }
  handle(url: string): string {
    for (const [route, handler] of this.routes) {
      const params = matchRoute(route, url);
      if (params !== undefined) return handler(params);
    }
    return "404";
  }
}
test("serves a static route", () => {
  const r = new Router();
  r.add("/about", () => "about page");
  expect(r.handle("/about")).toBe("about page");
});
test("captures a path parameter", () => {
  const r = new Router();
  r.add("/users/:id", (p) => `user:${p["id"]}`);
  expect(r.handle("/users/42")).toBe("user:42");
});
test("returns 404 for unknown paths", () => {
  const r = new Router();
  r.add("/users/:id", (p) => `user:${p["id"]}`);
  expect(r.handle("/nope")).toBe("404");
  expect(r.handle("/users/42/posts")).toBe("404");
});
test("captures several parameters", () => {
  const r = new Router();
  r.add("/posts/:post/comments/:id", (p) => `${p["post"]}/${p["id"]}`);
  expect(r.handle("/posts/7/comments/9")).toBe("7/9");
});
