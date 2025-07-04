export type ProductTypeRoute = {
  productType: "food" | "clothing" | "electronics";
};

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products/:productType",
  SUCCESS_ORDER: "/success-order",
  NOT_FOUND: "*",
} as const;

export type PathParams = {
  [ROUTES.PRODUCTS]: ProductTypeRoute;
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
