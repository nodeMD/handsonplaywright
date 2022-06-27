import { Page } from "@playwright/test";
import { inventoryPageSelectors } from "../selectors/inventoryPage";

export class InventoryPage {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async addItemToCart(itemNumber: number) {
    await this.page
      .locator(inventoryPageSelectors.buttons.addToCart)
      .nth(itemNumber)
      .click();
  }
  async openCart() {
    await this.page.locator(inventoryPageSelectors.buttons.cart).click();
  }
}
