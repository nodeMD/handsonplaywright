import { Page } from "@playwright/test";
import { loginPageSelectors } from "../selectors/loginPage";

export class LoginPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async fillUsername(username: string) {
    await this.page.locator(loginPageSelectors.inputs.username).fill("");
    await this.page.locator(loginPageSelectors.inputs.username).fill(username);
  }
  async fillPassword(password: string) {
    await this.page.locator(loginPageSelectors.inputs.password).fill("");
    await this.page.locator(loginPageSelectors.inputs.password).fill(password);
  }
  async submitLoginForm() {
    await this.page.locator(loginPageSelectors.buttons.logIn).click();
  }
  async fillAndSubmitLoginForm(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLoginForm();
  }
  async checkValidation(validation: string) {
    await this.page.waitForSelector(`text=${validation}`);
  }
}
