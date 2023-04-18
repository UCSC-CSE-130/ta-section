import { readdir, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function render(files) {
  const links = files
    .map(
      (file) =>
        `<li><a href="./${file}.html" target="_blank">${file}</a> (<a href="./${file}.pdf" target="_blank">PDF</a>)</li>`
    )
    .join("\n");
  return `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UCSC CSE 130 Spring 2023</title>
    <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
  </head>
  <body>
    <header>
      <h1>UCSC CSE 130</h1>
    </header>
    <ul>
      ${links}
    </ul>
  </body>
</html>
  `;
}

async function main() {
  const files = await readdir(join(__dirname, "slides"));
  const f = [];
  for (const file of files) {
    if (file.endsWith("md")) {
      f.push(file.split(".")[0]);
    }
  }
  f.sort();
  const data = new Uint8Array(Buffer.from(render(f)));
  await writeFile(join(__dirname, "public", "index.html"), data);
}

main();
