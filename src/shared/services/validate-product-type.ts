import { ALLOWED_PRODUCT_TYPE, type ProductType } from "../api/routes";

export function validateProductType(productType: string | undefined): ProductType | null {
  if (productType && ALLOWED_PRODUCT_TYPE.includes(productType as ProductType)) {
    return productType as ProductType;
  }
  return null;
}