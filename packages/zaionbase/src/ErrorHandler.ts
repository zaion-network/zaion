export interface errorCb {
  (message: string): () => never;
}

export const errorCb: errorCb = message => () => {
  throw new Error(message);
};
