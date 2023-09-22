// https://bun.sh/guides/read-file/string

import { readdirSync } from "fs";

// string
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const path = "./index.html";
    const file = Bun.file(path);

    const text = await file.text();
    const url = new URL(req.url);
    if (url.pathname === "/assets/style.css") {
      const css = await Bun.file("./assets/style.css").text();
      const headers = {
        "Content-Type": "text/css", // Imposta il tipo di contenuto a HTML
      };
      return new Response(css, { headers });
    } else if (url.pathname === "/dist/index.js") {
      const js = await Bun.file("./dist/index.js").text();
      const headers = {
        "Content-Type": "application/javascript", // Imposta il tipo di contenuto a HTML
      };
      return new Response(js, { headers });
    }
    //                                    //
    // /////// ASSETS and QUERIES / API   //
    //                                    //
    else if (url.pathname.includes("/assets/")) {
      const filename = url.pathname.replace("/assets/", "");
      const md = await Bun.file(`./assets/${filename}`).text();
      const headers = {
        "Content-Type": "text/markdown", // Imposta il tipo di contenuto a HTML
      };
      return new Response(md, { headers });
    } else if (url.pathname === "/blogs") {
      const files = readdirSync("./assets/").map(e => e.replace(".md", ""));
      const headers = {
        "Content-Type": "application/json", // Imposta il tipo di contenuto a HTML
      };
      return new Response(JSON.stringify(files), { headers });
    } else {
      // subdomains
      const logcall = path => console.log(`got a call for ${path}`);
      function handleGiacomo(url) {
        logcall(url.hostname);
        const headers = {
          "Content-Type": "text/html", // Imposta il tipo di contenuto a HTML
        };
        return new Response(text, { headers });
      }
      function handleArianna(url) {
        logcall(url.hostname);
      }
      function handleNoa(url) {
        logcall(url.hostname);
      }
      function handleMia(url) {
        logcall(url.hostname);
      }
      function handleEra(url) {
        logcall(url.hostname);
      }
      if (url.hostname.includes("giacomo")) return handleGiacomo(url);
      if (url.hostname.includes("arianna")) return handleArianna(url);
      if (url.hostname.includes("noa")) return handleNoa(url);
      if (url.hostname.includes("mia")) return handleMia(url);
      if (url.hostname.includes("era")) return handleEra(url);

      const headers = {
        "Content-Type": "text/html", // Imposta il tipo di contenuto a HTML
      };
      return new Response(text, { headers });
    }
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
