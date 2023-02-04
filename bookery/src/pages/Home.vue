<template>
  <div class="flex flex-column p-8">
    <input
      type="text"
      v-model="keyword"
      class="rounded border-2 border-gray-200 w-full h-9"
      placeholder="Search"
      @change="searchBooks"
    />
  </div>
  <div
    class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 xl:gap-16 p-8"
  >
    <div
      v-for="book in books"
      :key="book.title"
      class="bg-gray-100 shadow rounded-xl"
    >
      <img
        src="../assets/book.png"
        alt="book"
        class="rounded-t-xl object-contain w-full h-48 "
      />
      <h3 class="p-3 pt-5 font-semibold">{{ book.title }}</h3>
      <h5>{{ book.author }}</h5>
      <h5>{{ book.category }}</h5>
      <div>
        <router-link to="/cart">Add to cart</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import store from "../store";
import { randBook } from "@ngneat/falso";
import { ref } from "vue";

let books = randBook({ length: 10 });
const keyword = ref("");
store.state.searchedBooks = books;
books = computed(() => store.state.searchedBooks);

function searchBooks() {
  store.dispatch("searchBooks", keyword);

  console.log(books);
}
</script>
