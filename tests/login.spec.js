import { test, expect } from "@playwright/test";
import { HomePage } from "../src/pages/HomePage.js";
import { CREDENTIALS } from "../src/config/credentials.js";

test.describe("Login Tests", () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto("/");
  });

  test("Realiza login com usuário Standard", async ({ page }) => {

    await home.doLogin(CREDENTIALS.USERS.STANDARD, CREDENTIALS.PASSWORD);
    await home.validateUserIsLoggedIn();
  });

  test("Tentativa de login para usuário bloqueado", async ({ page }) => {
    await home.doLogin(CREDENTIALS.USERS.LOCKED_OUT, CREDENTIALS.PASSWORD);

    await home.checkErrorMessageIsVisible();
  });
});

