/// <reference lib="dom" />
/// <reference lib="dom.iterable" />


import { Application, SpesaApplication } from "./classes"
import { Categoria } from "./classes"

const app = new SpesaApplication()

const list = app.makelist()

const prod = app.createProduct({ link: "", name: "", price: 10, })

prod.stores.push({ type: "", value: { link: "", name: "" } })

prod.categorie.push(new Categoria({ nome: "some" }))

console.log(prod);

const body = document.getElementById("body")

const title = document.createElement("h1")

const map = new Map()

const createInput = (id: string) => {
  const input = document.createElement("input")
  input.addEventListener("keydown", (e) => {
    const condition = e.key === "Enter"
    if (condition) {
      console.log(input.value);
      input.value = ""
    }
  })
  input.placeholder = id
  input.id = id
  return input
}


title.textContent = "I am a title"
body?.appendChild(title)

const productFields = () => {
  const div = document.createElement("div")
  div.appendChild(createInput("link"))
  div.appendChild(createInput("name"))
  body?.appendChild(div)
}

const categoriaFields = () => {
  const div = document.createElement("div")
  div.appendChild(createInput("nome"))
  body?.appendChild(div)
}

productFields()
categoriaFields()