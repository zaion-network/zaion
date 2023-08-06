import { Product } from "../js/Product.js";

const motoscafoTelecomandato = new Product({
  dataTag: "elettronica",
  src: `https://ipfs.io/ipfs/QmTGX3ZTRaxXJUZGqUC8aHYvdJXc5XAWFGSucnfhPVeY2G?filename=Motoscafo.jpeg`,
  title: "Motoscafo Telecomandato Ricaricabile ",
  description: `Motoscafo con telecomando tutto funzionante alla grande, molto divertente , ottimo prodotto robusto, è stato usato pochissimo. Spedizione esclusa.`,
  tags: [
    `#motoscafoGiocattolo`,
    `#usato-pochissimo`,
    `#con-telecomando`,
    `#ricaricabile`,
    `#divertimento`,
  ],
});
const magliaRaso = new Product({
  dataTag: "vestiti",
  src: `https://ipfs.io/ipfs/QmTfMy9ngXqd41YzUkYFGNMXGVDw3NLJzPcnGDVravgjhJ?filename=MagliettaRaso.JPG`,
  title: "Maglietta Raso ",
  description: `Maglietta raso spalle scoperte, colore BIANCO, ROSSO, taglia S; Molto carina, leggera, estiva, è stato usato pochissimo. Spedizione esclusa.`,
  tags: [
    `#comodissimo`,
    `#usato-pochissimo`,
    `#Raso`,
    `#ottime-rifiniture`,
    `#tagliaS`,
  ],
});
const giaccaJeans = new Product({
  dataTag: "vestiti",
  src: `https://ipfs.io/ipfs/QmR5wuJ5a5uGCYVrXXp16pQJPNvghVumTUq1DYyK5cVXi6?filename=GiaccaJeansM.JPG`,
  title: "Giacchetto di Jeans ",
  description: `Giacca Jeans, colore JEANS blu scuro, taglia M; Semplice taglio largo, sportivo/casual come nuovo. Spedizione esclusa.`,
  tags: [
    `#comodissimo`,
    `#come-nuovo`,
    `#Jeans`,
    `#ottimo-tessuto`,
    `#tagliaM`,
  ],
});
const vestitoTezenis = new Product({
  dataTag: "vestiti",
  src: `https://ipfs.io/ipfs/Qmb6ra4dHvQbLvb3grub48jtLDXBBSc4N3vL9ki2CM6GTA?filename=TezenisVestitoGiallo.JPG`,
  title: "Vestito Tezenis ",
  description: `Vestito corto, colore GIALLO, taglia S; Accuratamente ricamato con gonna a balze, è stato usato pochissimo. Spedizione esclusa.`,
  tags: [
    `#comodissimo`,
    `#usato-pochissimo`,
    `#Tezenis`,
    `#ottime-rifiniture`,
    `#tagliaS`,
  ],
});
const gonnaArmani = new Product({
  dataTag: "vestiti",
  src: `https://ipfs.io/ipfs/QmbsnKttsWrSHERzbZ51e3Cp2xDBzXDYEHMcXG4HvfUzax?filename=ArmaniGonna46.JPG`,
  title: "Gonna - Giorgio Armani ",
  description: `Gonna Lunga colore NERO, taglia 46; composta da due strati il superiore accuratamente lavorato nero/trasparente il sottostante nero cotone coprente parte intima. Spedizione esclusa.`,
  tags: [
    `#comodissima`,
    `#mai-usata`,
    `#GiorgioArmani`,
    `#ottime-rifiniture`,
    `#taglia46`,
  ],
});
const soundSys = new Product({
  dataTag: "soundsystem",
  src: ``,
  title: "SOUNDSYSTEM",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const viaggi = new Product({
  dataTag: "viaggiare",
  src: ``,
  title: "Viaggi a piu non posso  ",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const viniliUsati = new Product({
  dataTag: "musica",
  src: ``,
  title: "Vinili Usati x dj ",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const sedia = new Product({
  dataTag: "mobili",
  src: `https://ipfs.io/ipfs/QmVtvHzsdXbsKCaXGP7WkUj9b5XYDdg5K4LWjhyaZa4Jyx?filename=graffiti-chair.jpg`,
  title: "Sedia Vintage",
  description: `Vendo causa trasloco sedia Vintage super ricercata, usata
  pochissimo. Paglia non rovinata, puzza un pò perchè era in
  cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#comodissima`, `#poco-usata`, `#1970`, `#ottime-rifiniture`],
});
const foto = new Product({
  dataTag: "mobili",
  src: `https://ipfs.io/ipfs/QmaHmnyKGenoP3HtY37hfCxzS6awqMzAjGtAv5HTx3jdvS?filename=Group-1601.jpg`,
  title: "Foto Vintage",
  description: ` Vendo causa trasloco foto Vintage super ricercata, usata
  pochissimo. Non rovinata, molto interessante, puzza un pò perchè
  era in cantina, c'è un po di umidità. Spedizione esclusa.`,
  tags: [`#bellisma`, `#molto-vecchi`, `#1901`, `#ottimo-quadretto`],
});

export const prodotti = {
  soundSys,
  viaggi,
  viniliUsati,
  sedia,
  foto,
  gonnaArmani,
  vestitoTezenis,
  giaccaJeans,
  magliaRaso,
  motoscafoTelecomandato,
};
