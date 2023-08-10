import { Timeout } from "./Timeout";

const timeout = new Timeout(() => console.log("ciao"), 1000);

new Timeout(() => {
  timeout.refresh();
}, 100);

new Timeout(() => {
  timeout.close();
}, 1200);
