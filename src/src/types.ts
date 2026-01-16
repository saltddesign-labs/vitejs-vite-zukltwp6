export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isCustomizable: boolean;
  freeShipping: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: {
    text?: string;
    image?: string;
    color?: string;
  };
}

export enum FlowStep {
  START = 'START',
  PRODUCT_GRID = 'PRODUCT_GRID',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  PERSONALIZE = 'PERSONALIZE',
  CHECKOUT = 'CHECKOUT',
  SUCCESS = 'SUCCESS'
}

export interface User {
  name?: string;
  email?: string;
  isGuest: boolean;
}