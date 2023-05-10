// const firebase = require("firebase/app");
// require("firebase/database");

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCnUROYWtm_BscIL0UjjhR1xd_wrEDoBhA",
//   authDomain: "getnpay-bfbd2.firebaseapp.com",
//   databaseURL:
//     "https://getnpay-bfbd2-default-rtdb.asia-southeast1.firebasedatabase.app/",
//   projectId: "getnpay-bfbd2",
//   storageBucket: "getnpay-bfbd2.appspot.com",
//   messagingSenderId: "1041137350983",
//   appId: "1:1041137350983:web:f932622188833064cfb462",
// };

// firebase.initializeApp(firebaseConfig);

// app.post("/webhooks/payments/success", async (req, res) => {
//   const payment = req.body.data.attributes;

//   // Get the order ID from the payment description
//   const orderId = payment.description.split(" ")[2];

//   try {
//     // Verify the order ID
//     const orderRef = firebase.database().ref(`orders/${orderId}`);
//     const snapshot = await orderRef.once("value");
//     const order = snapshot.val();
//     if (!order) {
//       res.status(404).send("Order not found.");
//       return;
//     }

//     // Validate the payment amount
//     const orderTotal = order.products.reduce((total, product) => {
//       return total + product.price * product.quantity;
//     }, 0);
//     const paymentAmount = payment.amount / 100;
//     if (paymentAmount !== orderTotal) {
//       res.status(400).send("Payment amount does not match order total.");
//       return;
//     }

//     // Secure the payment method data
//     const paymentMethod = `${payment.source.brand} ending in ${payment.source.last4}`;
//     const securePaymentMethod = encrypt(paymentMethod); // replace with your encryption function

//     // Update the order status and payment details in Firebase
//     await orderRef.update({
//       status: "paid",
//       payment: {
//         amount: paymentAmount,
//         method: securePaymentMethod,
//       },
//     });

//     // Log the payment event
//     logEvent("payment_success", { orderId, paymentAmount });

//     res.status(200).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while updating the database.");
//   }
// });
