
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
    await expect(this.page.locator(productSelectors.productName)).toBeVisible;
  }

  async validateProductDescriptionIsVisible() {
    await expect(this.page.locator(productSelectors.productDescription)).toBeVisible;
  }

  async validatePriceIsVisible() {
    await expect(this.page.locator(productSelectors.productPrice)).toBeVisible;
  }

  async clickCartIcon() {
    await this.page.click(productSelectors.cartIcon);
  }

  async clickCheckoutButton() {
    await this.page.click(productSelectors.checkoutButton);
  }

  async fillInfoAndContinue(firstName, lastName, postalCode) {
    await this.page.fill(productSelectors.firstNameInput, firstName);
    await this.page.fill(productSelectors.lastNameInput, lastName);
    await this.page.fill(productSelectors.postalCodeInput, postalCode);
    await this.page.click(productSelectors.continueButton);
  }

  async clickFinishButton() {
    await this.page.click(productSelectors.finishButton);
  }

  async validateSuccessMessageIsVisible() {
    await expect(this.page.locator(productSelectors.successMessage)).toBeVisible;
  }
  
}
