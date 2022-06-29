import { expect, Page } from "@playwright/test";
import { inventoryPageSelectors } from "../selectors/inventoryPage";

export class InventoryPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async countInventoryItems() {
    return await this.page.locator(inventoryPageSelectors.containers.item);
  }
  async addItemToCart(itemNumber: number) {
    await this.page
      .locator(inventoryPageSelectors.buttons.addToCart)
      .nth(itemNumber)
      .click();
  }
  async checkThatRemoveFromCartButtonIsVisible() {
    await this.page.waitForSelector(
      `text=${inventoryPageSelectors.buttons.removeFromCart}`
    );
  }
  async getNthItemPrice(itemNumber: number) {
    return (
      (await this.page
        .locator(inventoryPageSelectors.containers.itemPrice)
        .nth(itemNumber)
        .textContent()) || ""
    );
  }
  async checkThatCartIconShowsProperNumberOfItemsInCart(itemsInCart: number) {
    await expect(
      this.page.locator(inventoryPageSelectors.icons.shoppingCart)
    ).toHaveText(itemsInCart.toString());
  }
  async openCart() {
    await this.page.locator(inventoryPageSelectors.buttons.cart).click();
  }
}
