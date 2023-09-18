import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
export default {
  input: "src/index.js", // Il tuo file di ingresso principale
  output: {
    dir: "dist", // Il file di output del bundle
    format: "es", // Formato del bundle (puoi usare anche 'es' per moduli ES6)
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({ babelHelpers: "bundled" }),
  ],
  watch: true,
};
