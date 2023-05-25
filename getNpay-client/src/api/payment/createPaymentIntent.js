const express = require("express");
const cors = require("cors");
const Paymongo = require("paymongo");

const app = express();
app.use(cors());
app.use(express.json());

const paymongo = new Paymongo("sk_test_kE82VnYyRqT5aSTUuATpZf6S");

app.post("/api/create-payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await paymongo.paymentIntents.create({
      amount,
      currency,
      payment_method_allowed: ["card"],
      payment_method_options: {
        card: { request_three_d_secure: "any" },
      },
      description: "Payment for products",
      statement_descriptor: "descriptor business name",
    });

    res.json(paymentIntent);
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
