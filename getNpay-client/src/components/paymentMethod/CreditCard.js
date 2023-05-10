import React, { useState } from "react";

const CreditCard = ({ amount, description }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [cardHolder, setCardHolder] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [code, setCode] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  // Function to Listen to the Payment in the Front End
  const listenToPayment = async (fullClient) => {
    const paymentIntentId = fullClient.split("_client")[0];
    let i = 5;
    for (let i = 5; i > 0; i--) {
      setPaymentStatus(`Listening to Payment in ${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (i == 1) {
        const paymentIntentData = await fetch(
          "https://api.paymongo.com/v1/payment_intents/" +
            paymentIntentId +
            "?client_key=" +
            fullClient,
          {
            headers: {
              // Base64 encoded public PayMongo API key.
              Authorization: `Basic ${Buffer.from(
                "pk_test_XWgQRf7AGZuvdV4d8rveic12"
              ).toString("base64")}`,
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            console.log(response.data);
            return response.data;
          });

        if (paymentIntentData.attributes.last_payment_error) {
          setPaymentStatus(
            JSON.stringify(paymentIntentData.attributes.last_payment_error)
          );
        } else if (paymentIntentData.attributes.status === "succeeded") {
          setPaymentStatus("Payment Success");
        } else {
          i = 5;
        }
      }
    }
  };

  // Function to Create a Payment Intent by calling the site's api
  const createPaymentIntent = async () => {
    setPaymentStatus("Creating Payment Intent");
    const paymentIntent = await fetch("/api/createPaymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: amount * 100,
            payment_method_allowed: ["card"],
            payment_method_options: {
              card: { request_three_d_secure: "any" },
            },
            currency: "PHP",
            description: description,
            statement_descriptor: "descriptor business name",
          },
        },
      }),
    })
      .then((response) => {
        console.log(response.json);
        return response.json();
      })
      .then((response) => {
        return response.body.data;
      });

    return paymentIntent;
  };

  // Function to Create a Payment Method by calling the PayMongo API
  const createPaymentMethod = async () => {
    setPaymentStatus("Creating Payment Method");
    const paymentMethod = fetch("https://api.paymongo.com/v1/payment_methods", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("pk_test_XWgQRf7AGZuvdV4d8rveic12")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            details: {
              card_number: `${number}`, //"4343434343434345",
              exp_month: parseInt(`${month}`), //2
              exp_year: parseInt(`${year}`), //22
              cvc: `${code}`, //"123",
            },
            billing: {
              name: `${name}`,
              email: `${email}`,
              phone: `${phone}`,
            },
            type: "card",
          },
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        setPaymentStatus(err);
        return err;
      });

    return paymentMethod;
  };

  // Function to Attach a Payment Method to the Intent by calling the PayMongo API
  const attachIntentMethod = async (intent, method) => {
    setPaymentStatus("Attaching Intent to Method");
    fetch(`https://api.paymongo.com/v1/payment_intents/${intent.id}/attach`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("pk_test_XWgQRf7AGZuvdV4d8rveic12")}`,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            payment_method: `${method.id}`,
            client_key: `${intent.attributes.client_key}`,
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const paymentIntent = response.data;
        console.log(paymentIntent);
        const paymentIntentStatus = paymentIntent.attributes.status;
        if (paymentIntentStatus === "awaiting_next_action") {
          // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
          setPaymentStatus(paymentIntentStatus);
          window.open(
            paymentIntent.attributes.next_action.redirect.url,
            "_blank"
          );
          listenToPayment(paymentIntent.attributes.client_key);
        } else {
          setPaymentStatus(paymentIntentStatus);
        }
      })
      .catch((err) => {
        console.log(err);
        setPaymentStatus(JSON.stringify(err));
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const paymentIntent = await createPaymentIntent();
    const paymentMethod = await createPaymentMethod();
    await attachIntentMethod(paymentIntent, paymentMethod);
  };

  return (
    <div className="px-10">
      <form onSubmit={onSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Billing Information
        </h5>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="space-y-1">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="customer-name"
            >
              Customer Name:
            </label>
            <input
              id="customer-name"
              placeholder="Juan Dela Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="phone"
            >
              Phone Number:
            </label>
            <input
              id="phone"
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="user@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <h2>Payment Details</h2>
            <div>
              <label
                htmlFor="cc-name"
                className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Card Holder
              </label>
              <input
                id="cc-name"
                name="cc-name"
                placeholder="Juan Dela Cruz"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                required
                className="bg-gray-50 mb-2  mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="cc-number"
                className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Card Number:
              </label>
              <input
                id="cc-number"
                name="cc-number"
                maxLength="19"
                placeholder="#### #### #### ####"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div id="form-date" className="space-y-1">
              <label
                className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="expiry-month"
              >
                Expiry date:
              </label>
              <div className="flex justify-between">
                <select
                  id="expiry-month"
                  name="expiry-month"
                  className="w-45 h-10 text-sm"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                >
                  <option className="text-sm" id="trans-label_month">
                    Month
                  </option>
                  {[...Array(12)].map((_, i) => {
                    const monthValue = i + 1;
                    const monthLabel =
                      monthValue < 10 ? `0${monthValue}` : monthValue;
                    return (
                      <option key={monthValue} value={monthValue}>
                        {monthLabel}
                      </option>
                    );
                  })}
                </select>
                <select
                  id="expiry-year"
                  name="expiry-year"
                  className="w-45 h-10"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option id="trans-label_year" value="">
                    Year
                  </option>
                  {[...Array(27)].map((_, i) => {
                    const yearValue = 2021 + i;
                    return (
                      <option key={yearValue} value={yearValue}>
                        {yearValue.toString().substr(-2)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div id="form-sec-code">
              <label
                className="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="sec-code"
              >
                Security code:
              </label>
              <input
                name="sec-code"
                type="password"
                maxLength="3"
                placeholder="123"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Pay
        </button>
        <p>{paymentStatus}</p>
      </form>
    </div>
  );
};

export default CreditCard;
