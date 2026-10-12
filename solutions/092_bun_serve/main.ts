const server = Bun.serve({
  port: 0,
  fetch(): Response {
    return new Response("hi");
  },
});

const t = await (await fetch(`http://localhost:${server.port}/`)).text();
console.log("served:" + t);
server.stop();

export {};
