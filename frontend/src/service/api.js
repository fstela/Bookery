import { order } from "@bookery/shared";
import axios from "axios";
import { config } from "../config";

const sharedConfiguration = {
  baseURL: config.backend.url,
  timeout: 1000,
};

export class ProtectedApi {
  #client;

  constructor(token) {
    this.#client = axios.create({
      ...sharedConfiguration,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getOrders = () => {
    return this.#client.get("/order");
  };

  updateOrderDelivery = (orderId, content) => {
    return this.#client.put(`/order/${orderId}`, content);
  };

  cancelOrder = (orderId) => {
    return this.#client.delete(`/order/${orderId}`);
  };

  placeOrder = (content) => {
    return this.#client.post("/order", content);
  };
}

export class PublicApi {
  #client;
  constructor() {
    this.#client = axios.create({
      ...sharedConfiguration,
    });
  }
  getBooks = () => {
    return this.#client.get("/book");
  };
}
