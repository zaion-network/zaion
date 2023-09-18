import fs from "fs";
import {
  js,
  // node
} from "@zionstate/zionbase/utils";
import { OpenSeaMetadata } from "../../lib/types";

// const runProcess = node.process.runProcess;

const { ZionRegExp } = js;

const check = ZionRegExp.fileExtensionWithPoint;
// TODO #190 @giacomogagliano integrare il check da ZionRegeExp
check;

const source1 =
  "/Users/WAW/Documents/Projects/ZION/apps/pfp_minter/database/content/_ipfs-logs";
const source2 =
  "/Users/WAW/Documents/Projects/ZION/apps/pfp_minter/database/_opensea";
const target =
  "/Users/WAW/Documents/Projects/ZION/apps/pfp_minter/database/content/metadata";

export async function main() {
  const files1 = fs.readdirSync(source1);
  const files2 = fs.readdirSync(source2);

  const coppie = files2
    .filter(file => file.split(".")[1] === "json")
    .map((file, i) => [files1[i], file]);
  coppie.map((coppia, i) => {
    const file0 = fs.readFileSync(
      source1 + "/" + coppia[0]
    );
    const file1 = fs.readFileSync(
      source2 + "/" + coppia[1]
    );
    const json0 = JSON.parse(file0.toString());
    const json1: OpenSeaMetadata = JSON.parse(
      file1.toString()
    );
    json1.image =
      "https://ipfs.io/ipfs/" +
      json0.path +
      "?filename=" +
      json0.path;
    json1.external_url = "https://znft.tech";
    json1.name =
      // TODO fix typescript error due to mismatch with object
      // members. Add a Generic to the types
      // @ts-expect-error
      json1.attributes.filter(
        att => att.trait_type === "sex"
      )[0].value +
      " " +
      // TODO fix typescript error due to mismatch with object
      // members. Add a Generic to the types
      // @ts-expect-error
      json1.attributes.filter(
        att => att.trait_type === "clothing"
      )[0].value +
      " #" +
      i;

    fs.writeFileSync(
      target + "/" + coppia[1],
      JSON.stringify(json1)
    );
  });
}

// runProcess(main, { successMess: "Success" });
export const combineJson_v1 = "yet to come";
