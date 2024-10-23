import http from "node:http";
import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";

function* generateData() {
  for (let index = 0; index < 100; index++) {
    yield {
      id: randomUUID(),
      name: `Alan-${index}`,
    };
  }
}

http
  .createServer((_, res) => {
    res.setHeader("Content-Type", "Application/json");
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    res.statusCode = 200;

    const readable = new Readable({
      read() {
        for (const data of generateData()) {
          this.push(JSON.stringify(data) + `\n`);
        }
        this.push(null);
      },
    });

    readable.pipe(res);
  })
  .listen(8080)
  .on("listening", () =>
    console.log("server running at http://localhost:8080")
  );
