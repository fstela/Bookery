import express from "express";
import { db } from "../service/firebase.js";
const router = express.Router();

router.get("/", async (_, res) => {
  const productsRef = db.collection("products");
  const snapshot = await productsRef.get();
  const books = [];
  snapshot.forEach((product) =>
    books.push({ ...product.data(), id: product.id })
  );
  res.json(books);
});

export default router;
