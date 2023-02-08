import { order } from "@bookery/shared";
import crypto from "crypto";
import express from "express";
import { db } from "../service/firebase.js";
const router = express.Router();

/**
 * Create new order
 */
router.post("/", async (req, res) => {
  const data = order.createOrderSchema.validate(req.body);
  if (data.error !== undefined) {
    res.status(400).json({
      error: data.error,
    });
    return;
  }
  const productPrices = await getProductsDetails(data.value.items);

  if (!productPrices) {
    res.status(400).json({
      error: "Invalid products",
    });
    return;
  }

  const orderRef = db.collection("orders").doc(crypto.randomUUID());

  const itemsData = data.value.items.map((item) => ({
    ...item,
    price:
      productPrices.find((product) => product.productId === item.id).price ?? 0,
  }));

  await orderRef.set({
    ...data.value,
    items: itemsData,
    userId: req.user.uid,
    createdAt: new Date(),
  });

  res.status(201).json({
    status: "ok",
  });
});

const getProductsDetails = async (data) => {
  const ids = data.map((item) => item.productId);
  const snapshot = await db
    .collection("products")
    .where("__name__", "in", ids)
    .get();
  const details = [];

  snapshot.forEach((product) =>
    details.push({
      id: product.id,
      price: product.data().price,
      title: product.data().title,
    })
  );

  if (details.length !== ids.length) {
    return undefined;
  }
  return details;
};

/**
 * List the orders of current user
 */
router.get("/", async (req, res) => {
  const ordersRef = db.collection("orders").where("userId", "=", req.user.uid);
  const snapshot = await ordersRef.get();
  const orders = [];
  const snapshotBucket = [];
  snapshot.forEach((order) => {
    snapshotBucket.push(order);
  });

  for (const order of snapshotBucket) {
    const data = await addProductDetailsToOrder({
      ...order.data(),
      id: order.id,
    });
    orders.push(data);
  }

  res.json(orders);
});

const addProductDetailsToOrder = async (order) => {
  const itemDetails = await getProductsDetails(order.items);
  return {
    ...order,
    items: order.items.map((item) => {
      console.log(item);
      return {
        ...item,
        title:
          itemDetails.find((itemDetail) => item.productId === itemDetail.id)
            .title ?? "",
      };
    }),
  };
};

/**
 * Remove order
 */
router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;

  const orderRef = db.collection("orders").doc(orderId);
  const orderSnapshot = await orderRef.get();
  if (!orderSnapshot.exists) {
    res.status(404).json({
      error: "Not found",
    });
    return;
  }
  const orderData = orderSnapshot.data();

  if (
    orderData.userId !== req.user.uid ||
    !order.canBeModified(orderData.createAt)
  ) {
    res.status(401).json({
      error: "Not authorized",
    });
    return;
  }

  await orderRef.delete();
  res.status(200).json({ status: "ok" });
});

/**
 * Edit delivery information
 */
router.put("/:id", async (req, res) => {
  const updateData = order.deliverySchema.validate(req.body);

  if (updateData.error !== undefined) {
    res.status(400).json({
      error: updateData.error,
    });
    return;
  }

  const orderId = req.params.id;

  const orderRef = db.collection("orders").doc(orderId);
  const orderSnapshot = await orderRef.get();
  if (!orderSnapshot.exists) {
    res.status(404).json({
      error: "Not found",
    });
    return;
  }
  const orderData = orderSnapshot.data();

  if (
    orderData.userId !== req.user.uid ||
    !order.canBeModified(orderData.createAt)
  ) {
    res.status(401).json({
      error: "Not authorized",
    });
    return;
  }

  await orderRef.update({
    ...orderData,
    delivery: updateData.value,
  });

  res.status(200).json({
    status: "ok",
  });
});

export default router;
