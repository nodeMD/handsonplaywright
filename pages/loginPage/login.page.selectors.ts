export const loginPageSelectors = {
  inputs: {
    username: "#user-name",
    password: "#password",
  },
  buttons: {
    logIn: "#login-button",
  },
  validations: {
    usernameIsRequired: "Epic sadface: Username is required",
    passwordIsRequired: "Epic sadface: Password is required",
    userNotFound:
      "Epic sadface: Username and password do not match any user in this service",
  },
};
