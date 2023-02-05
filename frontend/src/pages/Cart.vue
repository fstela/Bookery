<template>
  <div class="flex flex-column p-8">
    Cart {{ formatPrice(cart.totalPrice) }}
  </div>
  <div class="flex flex-col">
    <div v-for="item in cart.items" :key="item.book.id" class="flex w-col">
      <h2>{{ item.book.title }}</h2>
      <p>{{ item.book.author }}</p>
      <p>{{ formatPrice(item.book.price) }}</p>
      <p>{{ item.quantity }}</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/cart";
import { formatPrice } from "../utils/price";

const cart = useCartStore();
</script>
