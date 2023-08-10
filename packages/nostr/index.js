import { Nostr } from "./dist/build.mjs";

const container = document.getElementById("container");
const nostr = document.createElement("div");
nostr.className = "node";
const data = document.createElement("div");
data.className = "node";
// Test data
const myData = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
  },
  communities: {
    tekno: "tekno",
    party: { hangar: true, club: true },
  },
  hobbies: ["Reading", "Painting", { what: "yes, coding" }],
  map: new Map(),
};

let idCounter = 0;
let o = (valueElement) => () => {
  if (valueElement.parentElement.className === "key-value") {
    console.log(library[valueElement.textContent]);
    el.remove();
    const newel = createDivWithKeyValue(
      library[valueElement.textContent],
      document.createElement("div")
    );
    container.appendChild(newel);
  }
};
function createDivWithKeyValue(obj, parentElement) {
  parentElement.className = "node";
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  for (const key in obj) {
    const div = document.createElement("div");
    div.setAttribute("id", `div_${idCounter++}`); // Set unique ID
    if (Array.isArray(obj[key])) {
      div.classList.add("array"); // Add class to indicate an array
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      div.classList.add("object"); // Add class to indicate an object
    } else {
      div.classList.add("key-value"); // Add class to indicate a key-value pair
    }

    const keyElement = document.createElement("div");
    keyElement.textContent = key + ": ";
    keyElement.setAttribute("class", "key"); // Set ID "key" to the key element
    div.appendChild(keyElement);
    const valueElement = document.createElement("div");
    valueElement.setAttribute("class", "value"); // Set ID "value" to the value element
    valueElement.addEventListener("click", o(valueElement));
    div.appendChild(valueElement);
    if (typeof obj[key] === "object" && obj[key] !== null) {
      createDivWithKeyValue(obj[key], valueElement);
    } else {
      valueElement.textContent = obj[key];
    }
    parentElement.appendChild(div);
  }
  return parentElement;
}
const library = { nip01: Nostr.Nip_001.nip_001, nip02: Nostr.Nip_002.nip_002 };
const lib = { nostr: Object.keys(library) };
// const el = createDivWithKeyValue(Nostr.Nip_001.nip_001, nostr);
// const el2 = createDivWithKeyValue(myData, data);
// container.appendChild(el);
// container.appendChild(el2);
const el = createDivWithKeyValue(lib, document.createElement("div"));
container.appendChild(el);

const makeKey = (props) => {
  const keyElement = document.createElement("div");
  keyElement.textContent = `${props.key}:`;
  keyElement.className = "key";
  return keyElement;
};
const makeValue = (props) => {
  const valueElement = document.createElement("div");
  valueElement.textContent = props.value;
  valueElement.className = "value";
  return valueElement;
};

const keyvalue = (props) => {
  const container = document.createElement("div");
  const keyElement = makeKey(props);
  const valueElement = makeValue(props);
  container.appendChild(keyElement);
  container.appendChild(valueElement);
  container.className = props.class;
  return {
    container,
    keyElement,
    valueElement,
    setContainerClass(className) {
      this.container.className = className;
      return this;
    },
    setKey(key) {
      this.keyElement.textContent = key;
      return this;
    },
    setKeyClass(className) {
      this.keyElement.className = className;
      return this;
    },
    setValue(value) {
      this.valueElement.textContent = value;
      return this;
    },
    setValueClass(className) {
      this.valueElement.className = className;
      return this;
    },
    removeKeyElement() {
      this.keyElement.remove();
    },
  };
};
const array = (props) => {
  const container = document.createElement("div");
  props.values
    .map((e) => {
      return makeValue({ value: e });
    })
    .forEach((e) => container.appendChild(e));
  return container;
};

const createw = (obj, node, createKeyValue) => {
  // if (node.parentElement && node.parentElement.className === "array") {
  //   node.className = "array-values";
  // } else if (node.parentElement && node.parentElement.className === "object") {
  //   node.className = "object-values";
  // } else {
  // }
  node.className = "node";
  for (let key in obj) {
    const container = document.createElement("div");
    const keyEl = makeKey({ key });
    if (typeof obj[key] === "object") {
      if (Array.isArray(obj[key])) {
        container.className = "array";
      }
      createw(obj[key], container, createKeyValue);
    } else {
      const valueEl = makeValue({ value: obj[key] });
      container.appendChild(keyEl);
      container.appendChild(valueEl);
    }
    node.appendChild(container);
    // const keyvalue = createKeyValue();
    // keyvalue.setKey(key);
    // keyvalue.setKeyClass("key");
    // keyvalue.setValueClass("value");
    // if (typeof obj[key] === "object") {
    //   if (Array.isArray(obj[key])) {
    //     keyvalue.setContainerClass("array");
    //   } else keyvalue.setContainerClass("object");
    //   createw(obj[key], keyvalue.valueElement, createKeyValue);
    // } else {
    //   keyvalue.setContainerClass("key-value");
    //   keyvalue.setValue(obj[key]);
    // }
    // node.appendChild(keyvalue.container);
  }
};

// const cont = document.createElement("div");
// createw(myData, cont, keyvalue);
// container.appendChild(cont);
// const element = keyvalue({
//   key: "ciao",
//   value: "mamma",
//   class: "key-value",
// }).container;
// const arr = array({ values: ["uno", "due"] });
// container.appendChild(element);
// container.appendChild(arr);
