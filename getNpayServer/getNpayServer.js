const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const { db } = require("./firebase.config");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { collection, getDocs, doc, updateDoc } = require("firebase/firestore");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/pay", async (req, res) => {
  console.log(req.body.token);
  await Stripe.charges.create({
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "php",
  });
  const checkoutID = req.body.checkoutID; // You'll need to pass this from the client
  await updateAllProducts(checkoutID);
});

const updateAllProducts = async () => {
  try {
    const productsRef = collection(db, "Products");
    const snapshot = await getDocs(productsRef);

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((docSnapshot) => {
      const product = docSnapshot.data();
      const updatedRFIDs = product.RFID.map((item) => ({
        ...item,
        isPaid: true,
      }));

      const productRef = doc(db, "Products", docSnapshot.id);

      updateDoc(productRef, {
        RFID: updatedRFIDs,
      })
        .then(() => {
          console.log("Update complete.");
        })
        .catch((err) => {
          console.error("Error updating document: ", err);
        });
    });
  } catch (err) {
    console.error("Error getting documents", err);
  }
};
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
