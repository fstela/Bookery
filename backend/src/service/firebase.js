import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { initializeFirestore } from "firebase-admin/firestore";
import { config } from "../config.js";
export const app = initializeApp({
  credential: cert(config.firebase.cert),
  databaseURL: config.firebase.database,
});

export const auth = getAuth(app);
export const db = initializeFirestore(app)