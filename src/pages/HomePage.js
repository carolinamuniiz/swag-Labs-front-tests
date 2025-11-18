
import { BasePage } from "./BasePage.js";
import { homeSelectors } from "../selectors/homeSelectors.js";

export class HomePage extends BasePage {
  async doLogin(username, password) {
    await this.page.fill(homeSelectors.usernameInput, username);
    await this.page.fill(homeSelectors.passwordInput, password);
    await this.page.click(homeSelectors.loginButton);
  }

  async openFirstProduct() {
    await this.page.click(homeSelectors.firstProduct);
  }

  async checkErrorMessageIsVisible() {
    await this.page.waitForSelector(homeSelectors.errorMessage);
    this.page.locator(homeSelectors.errorMessage).isVisible();
  }

  async validateUserIsLoggedIn() {
    await this.page.waitForSelector(homeSelectors.cartIcon);
    this.page.locator(homeSelectors.cartIcon).isVisible();
  }
  
}
