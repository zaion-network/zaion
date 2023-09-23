import { SimpleServer, getFileString } from "..";

const defaultHtml = `
<h1>SimpleServer</h1>
<div id="pis"><p>this is a</p> <p class="red">default</p> <p>html</p></div>
<div id="pis"><p>to get started simply add an</p> <pre>index.html</pre> <p>and an</p> <pre>assets/style.css</pre> <p>file in your repo</p></div>
<script type='module' src='./dist/index.js' ></script>
<link rel='stylesheet' href='/assets/style.css' />
`;

const defaultJs = `console.log("Hello world, this is a default js files loaded with SimpleServer")`;

const defaultCss = `
.red { color: red;}
#pis { display:flex; }
#pis p, #pis pre { 
  margin: 0; 
  margin-right: 4px; 
}
#pis pre { 
  position:relative; 
  top: 2px; 
  background-color: grey; 
  color:white; 
}`;

export const sendFileResponse = async (
  key: SimpleServer.Header.HeaderKeys,
  type: SimpleServer.Header.ContentTypeValues,
  path: string,
  fallback: (headers: Headers) => Response = (headers) => {
    if (type === SimpleServer.Header.ContentTypeValues.TEXT_HTML) {
      return new Response(defaultHtml, { headers });
    } else if (type === SimpleServer.Header.ContentTypeValues.TEXT_JAVASCRIPT)
      return new Response(defaultJs, { headers });
    else if (type === SimpleServer.Header.ContentTypeValues.TEXT_CSS)
      return new Response(defaultCss, { headers });
    return new Response("oh mamma");
  }
) => {
  const headers = new Headers();
  headers.append(key, type);
  try {
    const string = await getFileString(path);
    return new Response(string, { headers });
  } catch (error) {
    return fallback(headers);
  }
};
