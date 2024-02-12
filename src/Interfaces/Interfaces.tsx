export interface reduceSearch {
  search: {
    result: string;
  };
}

export interface Products {
  results: [
    {
      id: string;
      title: string;
      condition: string;
      permalink: string;
      thumbnail: string;
      price: number;
      original_price: number;
      available_quantity: number;
      seller: {
        nickname: string;
      };
      attributes: [
        {
          name: string;
          value_name: string;
        }
      ];
    }
  ];
}

export interface IProduct {
  title: string;
  price: number;
  original_price: number;
  condition: string;
  permalink: string;
  pictures: { url: string }[];
  seller_address: {
    city: { name: string };
    state: { name: string };
    country: { name: string };
  };
  attributes: {
    name: string;
    value_name: string;
  }[];
  warranty: string;
  date_created: string;
  last_updated: string;
}

export interface reduceProduct {
  productsFetch: {
    loading: boolean;
    data: null | Products;
    error: null | string;
  };
}
