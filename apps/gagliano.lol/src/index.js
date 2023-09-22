/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

console.log("gagliano kick asses");
console.log("bumbalacaca");

import { mdToHtmlString } from "./mdToHtmlString";
import page from "page";

const parser = new DOMParser();

const indexhtml = `
<div id="container">
  <h1>Gagliano Family =)</h1>
  <h3>we are</h3>
  <a href="./giacomo">Giacomo</a>
  <a href="./arianna">Arianna</a>
  <a href="./noa">Noa Josephine</a>
  <a href="./mia">Mia Jacqueline</a>
  <a href="./era">Era Jasmine</a>
</div>
`;

const giacomohtml = `
<div id="container">
  <a id="back" href="./">back</a>
  <p>my Name is Giacomo, here you can find some of the cool stuff I do.</p>
  <p>
    I am working with my team,of which
    <a href="./arianna">arianna</a> on a cool project that we called
    Zaion Network
  </p>
</div>
`;

const arihtml = `
<div id="container">
  <a id="back" href="./">back</a>
  <p>my Name is Arianna, here you can find some of the cool stuff I do.</p>
  <p>
    I am working with my team,of which
    <a href="./giacomo">giacomo</a> on a cool project that we called
    Zaion Network
  </p>
</div>
`;

const noahtml = ``;

const miahtml = ``;

const erahtml = ``;

const deleteContent = async content => {
  if (content.firstChild) {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  }
};

const stringToJsHtml = (string, parser) => {
  const element = parser.parseFromString(string, "text/html");
  return element.body.childNodes;
};
const attach = (element, nodes) => {
  nodes.forEach(n => element.appendChild(n));
};

const setup = parser => (page, htmlstring) => {
  console.log(page);
  const content = document.getElementById("content");
  deleteContent(content);
  const nodes = stringToJsHtml(htmlstring, parser);
  attach(content, nodes);
};
const setupper = setup(parser);

function index() {
  setupper("index", indexhtml);
}
function giacomo() {
  setupper("giacomo", giacomohtml);
}
function ari() {
  setupper("arianna", arihtml);
}
function noa() {
  setupper("noa", noahtml);
}
function mia() {
  setupper("mia", miahtml);
}
function era() {
  setupper("era", erahtml);
}
function blog() {}

page("/", index);
page("/giacomo", giacomo);
page("/arianna", ari);
page("/noa", noa);
page("/mia", mia);
page("/era", era);
page("/blog", blog);
page("/blog/:filename", load);
page();

function load(ctx, next) {
  console.log(ctx);
  mdToHtmlString(
    `assets/${ctx.params.filename}.md`,
    document.getElementById("content")
  );
}
