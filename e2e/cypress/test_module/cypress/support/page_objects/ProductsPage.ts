/// <reference types="cypress" />

import BaseObject from "./Base";

class ProductsPageObject extends BaseObject {
  navigateToProductsPage() {
    super.navigate("/products");
  }
}

export default ProductsPageObject;
