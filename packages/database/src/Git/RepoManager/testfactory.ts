abstract class AbstractAnimal {
  abstract type: "mammel" | "insect";
}

class Mammel extends AbstractAnimal {
  type: "mammel" = "mammel";
}
class Scimmia extends AbstractAnimal {
  type: "mammel" = "mammel";
  kind: "scimmia" = "scimmia";
}
class Toro extends AbstractAnimal {
  type: "mammel" = "mammel";
  kind: "toro" = "toro";
}

class Insect extends AbstractAnimal {
  type: "mammel" = "mammel";
}

class Animal {
  create(type: "insect", kind?: "bono"): Insect;
  create(type: "mammel", kind?: "scimmia"): Scimmia;
  create(type: "mammel", kind?: "toro"): Toro;
  create(
    type: "mammel" | "insect",
    kind?: string
  ): AbstractAnimal {
    if (type === "mammel") return new Mammel();
    else return new Insect();
  }
}

let animal = new Animal();
let insect = animal.create("mammel", "scimmia");

const myMap: Map<string, number> = new Map();
myMap.set("value", 42);
const myValue: number = myMap.get("value")!;
console.log(myValue); // output: 42
