import { Router } from "express";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);
const router = Router();

router.post("/payment", async (req, res) => {
    try {
        const { products } = req.body;
        // console.log(products);

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.title,
                    images: [product.img]
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url:"http://localhost:5173/success" ,
            cancel_url:"http://localhost:5173/cancel" ,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "An error occurred while processing the payment" });
    }
});

export default router;
