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
    deliverySummary: ".summary_value_label:nth-child(4)",
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
    shippingMessage: "Free Pony Express Delivery!",
    thankYouMessage: "Thank you for your order!",
  },
};
