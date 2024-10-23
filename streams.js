// Readable -> Fonte de dados; Entrada de dados
// Transform -> Intermediário. Tratamento de dados.
// Writeable -> Saída de dados; Finalizar o processo

import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";

function* generateData() {
  for (let index = 0; index < 100; index++) {
    yield {
      id: randomUUID(),
      name: `Alan-${index}`
    }
  }
}

const readable = new Readable({
  read() {
    for (const data of generateData()) {
      this.push(JSON.stringify(data) + "\n");
    }
    this.push(null);
  },
});

readable.pipe(process.stdout);

async function teste() {}

const stream = await teste();


// process.stdin.pipe(process.stdout)
