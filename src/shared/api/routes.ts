export const ALLOWED_PRODUCT_TYPE = ['food', 'clothing', 'electronics'] as const;
export type ProductType = typeof ALLOWED_PRODUCT_TYPE[number]


export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products/:productType",
  SUCCESS_ORDER: "/success-order",
  NOT_FOUND: "*",
} as const;

export type PathParams = {
  [ROUTES.PRODUCTS]: {
    productType: ProductType
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
