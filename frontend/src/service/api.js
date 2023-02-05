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
    const data = order.deliverySchema(content);
    if (data.error) {
      throw new Exception("Invalid data");
    }
    return this.#client.put(`/order/${orderId}`, data.value);
  };

  cancelOrder = (orderId) => {
    return this.#client.delete(`/order/${orderId}`);
  };

  placeOrder = (content) => {
    const data = order.createOrderSchema(content);
    if (data.error) {
      throw new Exception("Invalid data");
    }

    return this.#client.post("/order", data.value);
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
