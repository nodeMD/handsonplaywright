import { Page } from "@playwright/test";
import { checkoutPageSelectors } from "../selectors/checkoutPage";

export class CheckoutPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async fillFirstName(name: string) {
    await this.page.locator(checkoutPageSelectors.inputs.firstName).fill("");
    await this.page.locator(checkoutPageSelectors.inputs.firstName).fill(name);
  }
  async fillLastName(lastName: string) {
    await this.page.locator(checkoutPageSelectors.inputs.lastName).fill("");
    await this.page
      .locator(checkoutPageSelectors.inputs.lastName)
      .fill(lastName);
  }
  async fillPostalCode(postalCode: string) {
    await this.page.locator(checkoutPageSelectors.inputs.postalCode).fill("");
    await this.page
      .locator(checkoutPageSelectors.inputs.postalCode)
      .fill(postalCode);
  }
  async clickContinue() {
    await this.page.locator(checkoutPageSelectors.buttons.continue).click();
  }
  async clickFinish() {
    await this.page.locator(checkoutPageSelectors.buttons.finish).click();
  }
}
