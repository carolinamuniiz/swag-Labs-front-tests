
import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { productSelectors } from "../selectors/productSelectors.js";

export class ProductPage extends BasePage {
  async getProductName() {
    return this.page.locator(productSelectors.productName).innerText();
  }
  async getPrice() {
    return this.page.locator(productSelectors.productPrice).innerText();
  }
  async addToCart() {
    await this.page.click(productSelectors.addToCartButton);
  }

  async selectProduct() {
    await this.page.locator(productSelectors.productSauceLabsBackpack).click();
  }

  async validateProductTitleIsVisible() {
    await expect(this.page.locator(productSelectors.productNameByTestId)).toBeVisible();
  }

  
}
