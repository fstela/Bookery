import { order } from "@bookery/shared";
import crypto from "crypto";
import express from "express";
import { db } from "../service/firebase.js";
const router = express.Router();
/**
 * Create a new order for current user
 */
router.post("/", async (req, res) => {
  const data = order.createOrderSchema.validate(req.body);
  if (data.error !== undefined) {
    res.status(400).json({
      error: data.error,
    });
    return;
  }

  if (!(await validateProducts(data.value.items))) {
    res.status(400).json({
      error: "Invalid products",
    });
    return;
  }

  const orderRef = db.collection("orders").doc(crypto.randomUUID());
  await orderRef.set({
    ...data.value,
    userId: req.user.uid,
    createdAt: new Date(),
  });
  res.status(201).json({
    status: "ok",
  });
});

const validateProducts = async (data) => {
  const ids = data.map((item) => item.productId);
  const noProducts = await db
    .collection("products")
    .where("__name__", "in", ids)
    .count()
    .get();
  return noProducts.data().count === ids.length;
};

/**
 * List the orders of current user
 */
router.get("/", (req, res) => {
  db.collection("orders")
    .where("userId", "=", req.user.uid)
    .get()
    .then((ceva) => {
      var data = [];
      ceva.forEach((doc) => data.push(doc.data()));
      res.json(data);
    });
});

export default router;
