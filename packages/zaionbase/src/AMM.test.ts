import { AMM, Client, Developer, Token } from "./AMM";

const projecttoken = new Token("projectToken");
const eur = new Token("eur");

const convertEur2Token = (eur: number, amm: AMM) => eur * amm.B_A() * 1;
const convertToken2Eur = (eur: number, amm: AMM) => eur * amm.A_B() * 1;

const client = new Client("Bob", 0);

const dev1 = new Developer("Arianna", 0);
const dev2 = new Developer("Giacomo", 0);
const dev3 = new Developer("Ansenio", 0);

const amm = new AMM([eur, projecttoken], [0, 0]);
const boo = (amm: AMM, amount: number, dev1: Developer) => {
  const amount1 = convertEur2Token(amount, amm);
  client.purchase(amm, amount);
  client.paydev(dev1, amount1);
  dev1.withdraw(amm, convertEur2Token(amount, amm));
};
// dev1.showbalance();
// amm.showAmount();
const startRation = [1000 / 3, 1000 / 3];
projecttoken.mint(dev1, startRation[1]);
projecttoken.mint(dev2, startRation[1]);
projecttoken.mint(dev3, startRation[1]);

eur.mint(dev1, startRation[0]);
eur.mint(dev2, startRation[0]);
eur.mint(dev3, startRation[0]);
eur.mint(client, startRation[0]);

amm.addASymm(startRation[0], dev1);
amm.addASymm(startRation[0], dev2);
amm.addASymm(startRation[0], dev3);

// boo(amm, 100, dev1);
client.purchase(amm, 10);
client.paydev(dev1, 10);
dev1.withdraw(amm, convertEur2Token(10, amm));
amm.showAmount();
amm.showTokens();
// console.log(dev1.tokens, amm.address);
// console.log(projecttoken);
