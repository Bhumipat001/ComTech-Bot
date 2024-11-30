import * as http from 'http';

export function startHttpServer() {
  const server = http.createServer((req, res) => {
    res.write("Hello, World!");
    res.end();
  });

  server.listen(8080, () => {
    console.log('Hello, World!');
  });
}
