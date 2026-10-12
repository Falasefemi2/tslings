// 092_bun_serve.ts — Bun.serve
//
// Bun.serve() starts an HTTP server with just a fetch handler, no framework
// needed. Passing `port: 0` asks the OS to pick any free port, which you can
// read back as `server.port`, and `server.stop()` shuts it back down cleanly.
//
// Can you find the problem?

const server = Bun.serve({
  port: 0,
  fetch(): ___ {
    return new Response("hi");
  },
});

const t = await (await fetch(`http://localhost:${server.port}/`)).text();
console.log("served:" + t);
server.stop();

export {};
