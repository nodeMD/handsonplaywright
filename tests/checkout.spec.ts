import { test, expect, Page } from "@playwright/test";
import { CartPage } from "../methods/cartPage";
import { CheckoutPage } from "../methods/checkoutPage";
import {
  generateFakeUserData,
  validUser,
  randomItemNumberInRange,
} from "../methods/generateData";
import { InventoryPage } from "../methods/inventoryPage";
import { LoginPage } from "../methods/loginPage";
import { cartPageSelectors } from "../selectors/cartPage";
import { checkoutPageSelectors } from "../selectors/checkoutPage";
import { inventoryPageSelectors } from "../selectors/inventoryPage";

const fakeUserData = generateFakeUserData();
const desiredNumberOfItems = 6;
const randomItem = randomItemNumberInRange(0, 5);
const shippingMessage = "FREE PONY EXPRESS DELIVERY!";
const thankYouMessage = "THANK YOU FOR YOUR ORDER";

test.describe.serial("checkout tests", () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("./");
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.fillAndSubmitLoginForm(
      validUser.username,
      validUser.password
    );
    await page.waitForURL("**/inventory.html");
  });

  test(`user is able to see list of products is which has length of ${desiredNumberOfItems} items`, async () => {
    const numberOfItems = await page.locator(
      inventoryPageSelectors.containers.item
    );
    await expect(numberOfItems).toHaveCount(desiredNumberOfItems);
  });

  test("user is able to add random item to cart then check if cart icon shows proper number and check if the proper price is shown on cart page", async () => {
    await inventoryPage.addItemToCart(randomItem);
    await page.waitForSelector(
      `text=${inventoryPageSelectors.buttons.removeFromCart}`
    );
    let price =
      (await page
        .locator(inventoryPageSelectors.containers.itemPrice)
        .nth(randomItem)
        .textContent()) || "";
    await expect(
      page.locator(inventoryPageSelectors.icons.shoppingCart)
    ).toHaveText("1");
    await inventoryPage.openCart();
    await page.waitForURL("**/cart.html");
    await expect(
      page.locator(cartPageSelectors.containers.cartItem)
    ).toHaveCount(1);
    await expect(
      page.locator(cartPageSelectors.containers.cartItemPrice)
    ).toHaveText(price);
  });

  test("user is able to proceed to checkout", async () => {
    await cartPage.clickCheckout();
    await page.waitForURL("**/checkout-step-one.html");
  });

  test("user is unable to continue without filling checkout form with all required data", async () => {
    await checkoutPage.clickContinue();
    await page.waitForSelector(
      `text=${checkoutPageSelectors.validations.firstNameIsRequired}`
    );
    await checkoutPage.fillFirstName(fakeUserData.name);
    await checkoutPage.clickContinue();
    await page.waitForSelector(
      `text=${checkoutPageSelectors.validations.lastNameIsRequired}`
    );
    await checkoutPage.fillLastName(fakeUserData.lastName);
    await checkoutPage.clickContinue();
    await page.waitForSelector(
      `text=${checkoutPageSelectors.validations.postalCodeIsRequired}`
    );
  });

  test("user is able to continue after filling checkout form with required data", async () => {
    await checkoutPage.fillPostalCode(fakeUserData.postalCode);
    await checkoutPage.clickContinue();
    await page.waitForURL("**/checkout-step-two.html");
  });

  test(`user is able to see that the shipping information is '${shippingMessage}'`, async () => {
    await page.waitForSelector(`text=${shippingMessage}`);
  });

  test(`user is able to see confirmation message: '${thankYouMessage}'`, async () => {
    await checkoutPage.clickFinish();
    await expect(
      page.locator(checkoutPageSelectors.headers.complete)
    ).toHaveText(thankYouMessage);
  });
});
