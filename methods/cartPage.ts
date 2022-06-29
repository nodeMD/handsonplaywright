import { expect, Page } from "@playwright/test";
import { cartPageSelectors } from "../selectors/cartPage";

export class CartPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async checkThatNumberOfItemsInCartEquals(numberOfItems: number) {
    await expect(
      this.page.locator(cartPageSelectors.containers.cartItem)
    ).toHaveCount(numberOfItems);
  }
  async checkThatCartItemPriceEquals(price: string) {
    await expect(
      this.page.locator(cartPageSelectors.containers.cartItemPrice)
    ).toHaveText(price);
  }
  async clickCheckout() {
    await this.page.locator(cartPageSelectors.buttons.checkout).click();
  }
}
