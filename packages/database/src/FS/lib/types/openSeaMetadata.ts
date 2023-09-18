type OPSM = {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    }
  ];
};

export type OpenSeaMetadata = OPSM;
