// interfaces reducers

export interface reduceSearch {
  search: {
    result: string;
  };
}

export interface reduceFavorite {
  favorite: {
    item: { title: string; image: string; price: number; id: string }[];
  };
}

export interface reduceCart {
  cart: {
    items: { title: string; image: string; price: number; id: string }[];
  };
}

export interface reduceProduct {
  productsFetch: {
    loading: boolean;
    data: null | IProducts;
    error: null | string;
  };
}
// interfaces components

export interface IHeader {
  initial?: boolean;
  product?: boolean;
  bag?: boolean;
  label?: string;
}

export interface ICarroussel {
  images: string[];
}

export interface ICard {
  search?: string;
  id: string;
  price: number;
  title: string;
  image: string;
  bag?: boolean;
  product?: boolean;
  favorite?: boolean;
}

// interface fetch's

export interface IProducts {
  results: {
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
  }[];
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
  id: string;
}
