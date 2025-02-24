import { test, expect, Page } from "@playwright/test";
import { CartPage } from "../pages/cartPage/cart.page";
import { CheckoutPage } from "../pages/checkoutPage/checkoutPage";
import { InventoryPage } from "../pages/inventoryPage/inventory.page";
import { LoginPage } from "../pages/loginPage/login.page";
import { checkoutPageSelectors } from "../pages/checkoutPage/checkout.page.selectors";
import {
  generateFakeUserData,
  validUser,
  randomItemNumberInRange,
} from "../utils/generateData";

const fakeUserData = generateFakeUserData();
const desiredNumberOfItems = 6;
const randomItem = randomItemNumberInRange(0, 5);

test.describe("checkout tests", () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test("user is able to finish checkout process", async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto("./");
    await loginPage.fillAndSubmitLoginForm(
      validUser.username,
      validUser.password
    );
    await page.waitForURL("**/inventory.html");

    await test.step(`user is able to see list of products is which has length of ${desiredNumberOfItems} items`, async () => {
      const numberOfItems = await inventoryPage.countInventoryItems();
      await expect(numberOfItems).toHaveCount(desiredNumberOfItems);
    });

    await test.step("user is able to add random item to cart then check if cart icon shows proper number and check if the proper price is shown on cart page", async () => {
      await inventoryPage.addItemToCart(randomItem);
      const numberOfItemsInCart = 1;
      await inventoryPage.checkThatRemoveFromCartButtonIsVisible();
      const price = await inventoryPage.getNthItemPrice(randomItem);
      await inventoryPage.checkThatCartIconShowsProperNumberOfItemsInCart(
        numberOfItemsInCart
      );
      await inventoryPage.openCart();
      await page.waitForURL("**/cart.html");
      await cartPage.checkThatNumberOfItemsInCartEquals(numberOfItemsInCart);
      await cartPage.checkThatCartItemPriceEquals(price);
    });

    await test.step("user is able to proceed to checkout", async () => {
      await cartPage.clickCheckout();
      await page.waitForURL("**/checkout-step-one.html");
    });

    await test.step("user is unable to continue without filling checkout form with all required data", async () => {
      await checkoutPage.clickContinue();
      await checkoutPage.checkValidation(
        checkoutPageSelectors.validations.firstNameIsRequired
      );
      await checkoutPage.fillFirstName(fakeUserData.name);
      await checkoutPage.clickContinue();
      await checkoutPage.checkValidation(
        checkoutPageSelectors.validations.lastNameIsRequired
      );
      await checkoutPage.fillLastName(fakeUserData.lastName);
      await checkoutPage.clickContinue();
      await checkoutPage.checkValidation(
        checkoutPageSelectors.validations.postalCodeIsRequired
      );
    });

    await test.step("user is able to continue after filling checkout form with required data", async () => {
      await checkoutPage.fillPostalCode(fakeUserData.postalCode);
      await checkoutPage.clickContinue();
      await page.waitForURL("**/checkout-step-two.html");
    });

    await test.step(`user is able to see that the shipping information is '${checkoutPageSelectors.messages.shippingMessage}'`, async () => {
      await checkoutPage.checkMessageOnSelector(
        checkoutPageSelectors.labels.deliverySummary,
        checkoutPageSelectors.messages.shippingMessage
      );
    });

    await test.step(`user is able to see confirmation message: '${checkoutPageSelectors.messages.thankYouMessage}'`, async () => {
      await checkoutPage.clickFinish();
      await checkoutPage.checkMessageOnSelector(
        checkoutPageSelectors.headers.complete,
        checkoutPageSelectors.messages.thankYouMessage
      );
    });
  });
});
