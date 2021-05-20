const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

const environment = () => {
  let clientId =
    "AXqCEiMwTobd5-PbzZozgPyUxaKGUcqV7iV3HnkpBAR43DKaFu8JWi2Bwb5eTKGsbWbPRMka0HlyXCAc";
  let clientSecret =
    "EPvTJk_CgMOOkfirrHBGa32ODEUpBLwnMOUyebn_hkeKQiE0dWyqzUdJk9tCQFJwAqVN0C9fYU7BFHtX";

  // for production
  //   if (process.env.NODE_ENV === 'production') {
  //     return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
  //   }

  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

export const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
};
