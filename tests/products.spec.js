import { test, expect } from "@playwright/test";
import { ProductPage } from "../src/pages/ProductPage.js";
import { HomePage } from "../src/pages/HomePage.js";
import { CREDENTIALS } from "../src/config/credentials.js";

test.describe("Product Tests", () => {
  let home;
  let product;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto("/");
    await home.doLogin(CREDENTIALS.USERS.STANDARD, CREDENTIALS.PASSWORD);
  });

  test("Seleciona um produto, verifica título, preço e descrição", async ({ page }) => {
    product = new ProductPage(page);
    await product.selectProduct();
    await product.addToCart();
    await product.validateProductDescriptionIsVisible();
    await product.validatePriceIsVisible();
    await product.clickCartIcon();
    await product.clickCheckoutButton();
    await product.fillInfoAndContinue("User", "Random", "12345");
    await product.clickFinishButton();
    await product.validateSuccessMessageIsVisible();
  });

});

