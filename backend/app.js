import cors from "cors";
import express from "express";
import {config} from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/healt", (_, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(config.server.port, () =>
  console.log(`Server running on port ${config.server.port}`)
);
