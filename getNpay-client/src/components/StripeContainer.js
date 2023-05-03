import React from "react";
import { Element } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51MuEDZFWNvcSsDyX8BLoebDhjtd1Paz2uvoGGFfEaM0w17bY5DZ3ghAQ16tYJSdYcH60N23BFCXmkyr3jKCJymAH00XU1kSebi";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Element stripe={stripeTestPromise}>
      <PaymentForm />
    </Element>
  );
}
