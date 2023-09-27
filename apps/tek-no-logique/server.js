#!/usr/bin/env bun

import { SimpleServer } from "@zaionstate/server";
import { sendDM } from "./src/handleNostr";

new SimpleServer(8081, async req => {
  const url = new URL(req.url);
  if (url.pathname === "/subscribe") {
    const TNLPUB =
      "49fd86bcb4f59963a2eea88449b46716cc606b53be62b13cd450a7ee9cbd92fc";
    const giac =
      "005be03966ded6393a773e61469698b48a90944f6ce2b055b1d099e2c5fb1756";
    const sk = process.env.SEC;
    const pk = process.env.PUB;
    const res = await sendDM(giac, url.searchParams.get("m"), sk, pk, e => {});
    console.log(res);
    return url.searchParams.get("m");
  }
});
