const catchAsyncErrors = require("../middleware/catchAsyncError");

const stripe = require("stripe")(
  "sk_test_51LMDaESGGFxqsWCTaCc3d7RpauuLt7gG2Lskc97pICOnwYm1CATQyobfGcLtWQXXMypUZkwQMVun6bZCafAYtm6D00MpsUvGBE"
);

exports.processPayment = catchAsyncErrors(async (req, res) => {
  await stripe.paymentIntents.create(
    {
      amount: req.body.amount,
      currency: "inr",
      payment_method_types: ["card"],
      description: "Hotel Booking Service",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({ success: false, stripeErr });
      } else {
        res.status(200).json({ success: true, stripeRes });
      }
    }
  );
});
