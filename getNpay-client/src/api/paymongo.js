const API_SECRET_KEY = "sk_test_kE82VnYyRqT5aSTUuATpZf6S";

export const paymongo = {
  async createPaymentIntent(amount, currency) {
    const response = await fetch(
      "https://api.paymongo.com/v1/payment_intents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            "sk_test_kE82VnYyRqT5aSTUuATpZf6S:",
            "utf8"
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount: amount,
              currency: currency,
            },
            type: "payment_intents",
          },
        }),
      }
    );

    const data = await response.json();
    return data;
  },
};
