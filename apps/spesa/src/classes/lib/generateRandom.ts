import { js } from "@zionstate/zionbase/utils";
export let createRandom = js.lib.createRandom;

export let generateRandom = () =>
  Math.round(Math.random() * 100_000_000_000).toString(16);
