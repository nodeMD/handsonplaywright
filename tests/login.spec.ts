import { test } from "@playwright/test";
import { generateFakeUserData, validUser } from "../methods/generateData";
import { LoginPage } from "../methods/loginPage";
import { loginPageSelectors } from "../selectors/loginPage";

const fakeUserData = generateFakeUserData();

test.describe("login tests", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    loginPage = new LoginPage(page);
  });

  test("user should not be able to log in to app when using wrong login data", async () => {
    await loginPage.submitLoginForm();
    await loginPage.checkValidation(
      loginPageSelectors.validations.usernameIsRequired
    );
    await loginPage.fillUsername(fakeUserData.email.withoutAtSign);
    await loginPage.submitLoginForm();
    await loginPage.checkValidation(
      loginPageSelectors.validations.passwordIsRequired
    );
    await loginPage.fillPassword(fakeUserData.password.onlyLowerCaseLetters);
    await loginPage.submitLoginForm();
    await loginPage.checkValidation(
      loginPageSelectors.validations.userNotFound
    );
  });

  test("user should be able to log in to app", async ({ page }) => {
    await loginPage.fillAndSubmitLoginForm(
      validUser.username,
      validUser.password
    );
    await page.waitForURL("**/inventory.html");
  });
});
