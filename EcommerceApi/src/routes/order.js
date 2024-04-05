import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import { Order } from './../models/Order.js';
const router=Router()

//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER ORDERS
  router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const userIdFromUrl=req.params.id;
        const orderToget = await Order.findOne({
            userId: userIdFromUrl,
            // Add any additional conditions to uniquely identify the cart
          });
          if (!orderToget) {
            return res.status(404).json("No any order");
          }
      const orders = await Order.find(orderToget._id);
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // GET MONTHLY INCOME
  
  router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
export default router