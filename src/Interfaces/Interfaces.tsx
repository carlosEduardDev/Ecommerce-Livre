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

export interface reduceProduct {
  productsFetch: {
    loading: boolean;
    data: null | Products;
    error: null | string;
  };
}
