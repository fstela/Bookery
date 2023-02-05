import cors from "cors";
import express from "express";
import { config } from "../src/config.js";
import book from "./api/book.js";
import order from "./api/order.js";
import authorizationMiddleware from "./middleware/authorized.js";

const app = express();
app.use(express.json());
app.use(cors());

const publicRouter = express.Router();
const protectedRouter = express.Router();
protectedRouter.use(authorizationMiddleware);

/**
 * Protected routes
 */
protectedRouter.use(authorizationMiddleware);
protectedRouter.use("/order", order);

/**
 * Public routes
 */

publicRouter.get("/healt", (req, res) => {
  res.json({
    status: "ok",
  });
});
publicRouter.use("/book", book);

app.use(publicRouter);
app.use(protectedRouter);

app.listen(config.server.port, () =>
  console.log(`Server running on port ${config.server.port}`)
);
