import { Page } from "@playwright/test";
import { cartPageSelectors } from "../selectors/cartPage";

export class CartPage {
  constructor(readonly page: Page) {
    this.page = page;
  }
  async clickCheckout() {
    await this.page.locator(cartPageSelectors.buttons.checkout).click();
  }
}
