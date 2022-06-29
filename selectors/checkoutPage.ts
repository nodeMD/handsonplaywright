export const checkoutPageSelectors = {
  inputs: {
    firstName: "#first-name",
    lastName: "#last-name",
    postalCode: "#postal-code",
  },
  buttons: {
    finish: "#finish",
    continue: "#continue",
  },
  labels: {
    summary: ".summary_value_label",
  },
  headers: {
    complete: ".complete-header",
  },
  validations: {
    firstNameIsRequired: "Error: First Name is required",
    lastNameIsRequired: "Error: Last Name is required",
    postalCodeIsRequired: "Error: Postal Code is required",
  },
  messages: {
    shippingMessage: "FREE PONY EXPRESS DELIVERY!",
    thankYouMessage: "THANK YOU FOR YOUR ORDER",
  },
};
