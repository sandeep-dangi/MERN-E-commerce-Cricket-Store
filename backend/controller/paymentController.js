const asyncWrapper = require("../middleWare/asyncWrapper");

// process the payment
exports.processPayment = asyncWrapper(async (req, res, next) => {
  console.log("here");
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // asigning key as well
  
  const amount = req.body.ammount;
  console.log(amount);
  const myPayment = await stripe.paymentIntents.create({
     amount: req.body.ammount,
      // amount: amount,

    currency: "inr",
    metadata: {
      company: "Ecommerce", // not mandatory
    },
  });

  res
    .status(200)
    .json({ sucess: true, client_secret: myPayment.client_secret });
});

// send STRIPE_API_KEY to user => 

exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  // res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
