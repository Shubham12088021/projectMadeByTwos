const express = require("express");
const Stripe = require("stripe");

const router = express.Router();

// 🔐 Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Checkout Session
router.post("/create-checkout-session", async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",

            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),

            metadata: {
                customItems: JSON.stringify(cartItems),
            },

            success_url: "http://localhost:5174/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5174/cancel",
        });


        res.json({ url: session.url });


    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: "Payment failed" });
    }
});

module.exports = router;
