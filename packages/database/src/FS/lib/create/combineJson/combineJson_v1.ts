import fs from "fs";
import { OpenSeaMetadata } from "../../types";

type combineJsonProps = {
  source1: string;
  source2: string;
  target: string;
};
export async function combineJson_v1(
  props: combineJsonProps
) {
  const { source1, source2, target } = props;
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
    let json1: OpenSeaMetadata = JSON.parse(
      file1.toString()
    );
    json1 = edit({ json1, json0, i });
    fs.writeFileSync(
      target + "/" + coppia[1],
      JSON.stringify(json1)
    );
  });
}

type decorateProps<T, R> = {
  json1: T;
  json0: R;
  i: number;
};
type edit<T, R> = (props: decorateProps<T, R>) => T;

const edit: edit<OpenSeaMetadata, { path: string }> =
  function (props) {
    const { i, json0, json1 } = props;
    json1.image =
      "https://ipfs.io/ipfs/" +
      json0.path +
      "?filename=" +
      json0.path;
    json1.external_url = "https://znft.tech";
    json1.name =
      // TODO #180 @giacomogagliano fix typescript error due to mismatch with object
      // members. Add a Generic to the types
      // @ts-expect-error
      json1.attributes.filter(
        att => att.trait_type === "sex"
      )[0].value +
      " " +
      // @ts-expect-error
      json1.attributes.filter(
        att => att.trait_type === "clothing"
      )[0].value +
      " #" +
      i;
    return json1;
  };
