import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import { Cart } from "../models/Cart.js";
const router=Router()

//create
router.post("/create", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/user/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userIdFromUrl=req.params.id;
        const cartToUpdate = await Cart.findOne({
            userId: userIdFromUrl,
            // Add any additional conditions to uniquely identify the cart
          });
          if (!cartToUpdate) {
            return res.status(404).json("Cart not found");
          }
      const updatedCart = await Cart.findByIdAndUpdate(
        cartToUpdate._id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/user/:id",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userIdFromUrl=req.params.id;
        const cartTodelete = await Cart.findOne({
            userId: userIdFromUrl,
            // Add any additional conditions to uniquely identify the cart
          });
          if (!cartTodelete) {
            return res.status(404).json("Cart not found");
          }
      await Cart.findByIdAndDelete(cartTodelete._id);
      return res.status(200).json("Cart has been deleted...");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  //GET USER CART
  router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userIdFromUrl=req.params.id;
        const cartToUpdate = await Cart.findOne({
            userId: userIdFromUrl,
            // Add any additional conditions to uniquely identify the cart
          });
          if (!cartToUpdate) {
            return res.status(404).json("Cart not found");
          }
      res.status(200).json(cartToUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  export default router