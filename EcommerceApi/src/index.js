import express from "express";
import connectDB from './db/db.js';
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"
import stripeRoute from "./routes/stripe.js"


dotenv.config({
    path: './.env'
})
const app=express()
app.use(express.json({limit: "16kb"}))
connectDB()
.then(() => {
    app.listen(process.env.PORT||5000, () => {
        console.log("⚙️ Server is running at port : 5000");
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
app.use(cors({
    origin: [
        'https://ecommerce-app-react-sooty.vercel.app',
        'https://ecommerce-app-react-sooty.vercel.app/'
    ]
}));

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/checkout",stripeRoute)