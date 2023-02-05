import { randBook, randFloat } from "@ngneat/falso";
import crypto from "crypto";
import { db } from "./service/firebase.js";
const batch = db.batch();
const fakeBooks = randBook({ length: 50 });

fakeBooks.forEach((book) => {
  const ref = db.collection("products").doc(crypto.randomUUID());
  batch.set(ref, {
    author: book.author,
    category: book.category,
    description: "",
    price: randFloat({ min: 10, max: 120, fraction: 2 }),
    title: book.title,
  });
});

await batch.commit();