<template>
  <div class="w-full">
    <div class="col-12 text-center mb-5">
      <h3 class="pt-5 sm:text-xl lg:text-2xl shoppingTitle">
        Shopping cart total {{ formatPrice(cart.totalPrice) }}
      </h3>
    </div>
    <div class="flex p-10 flex-col gap-2 max-w-2xl mx-auto">
      <div
        v-for="item in cart.items"
        :key="item.book.id"
        class="w-full h-1/5 border border-gray-400 rounded-lg"
      >
        <div class="w-full flex flex-col md:flex-row pb-3">
          <div
            class="h-40 w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden p-2"
          >
            <img src="../assets/book.png" alt="book" class="" />
          </div>
          <div class="p-4 flex flex-col justify-between leading-normal w-full">
            <div class="mb-auto">
              <div class="text-gray-900 font-bold text-xl mb-2 cardTitleFont">
                {{ item.book.title }}
              </div>
              <p class="text-gray-700 text-base">{{ item.book.author }}</p>
            </div>

            <div class="text-sm flex flex-col sm:flex-row justify-between">
              <div>
                <p class="text-blue-400 leading-none">
                  Quantity: {{ item.quantity }}
                </p>
                <p class="text-amber-500">
                  {{ formatPrice(item.book.price * item.quantity) }}
                </p>
              </div>
              <div>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  @click="removeFromCart(item)"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 text-center p-10 mb-5">
      <router-link
        to="/order"
        class="block px-2 pr-7 sm:pr-15 md:pr-10 h-full text-l transition-colors text-gray-700 hover:text-gray-400 font-semibold"
      >
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Continue to checkout
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/cart";
import { formatPrice } from "../utils/price";

let cart = useCartStore();
const removeFromCart = (item) => {
  console.log(item);
  cart.removeItem(item);
};
</script>

<style>
.cardTitleFont {
  font-family: "Libre Baskerville", serif;
  font-weight: 500;
  font-style: italic;
}
.shoppingTitle {
  font-weight: 500;
  font-style: normal;
}
</style>
