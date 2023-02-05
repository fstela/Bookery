<template>
  <div>
    <div class="flex flex-column p-8">
      <input
        type="text"
        v-model="filters.title"
        class="rounded border-2 border-gray-200 w-full h-9"
        placeholder="Search"
        @change="searchBooks"
      />
    </div>
    <div class="px-8">
      <FilterCategory @change-filter="categoryFilter"></FilterCategory>
    </div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 xl:gap-16 p-8"
    >
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="bg-gray-100 shadow rounded-xl flex flex-col"
      >
        <div class="flex flex-col grow justify-center">
          <img
            src="../assets/book.png"
            alt="book"
            class="rounded-t-xl object-contain w-full h-48"
          />
          <h3 class="p-3 pt-5 pb-0 font-semibold bookTitle text-center">
            {{ book.title }}
          </h3>
          <h5 class="pb-5 text-stone-400 text-center">{{ book.author }}</h5>
          <h5 class="pb-5 text-stone-400 text-center">{{ book.category }}</h5>
        </div>
        <div class="flex justify-between px-5 py-0 pb-1">
          <h5 class="text-amber-400 py-2 px-4">${{ book.price }}</h5>
          
            <button
              class="hover:bg-transparent bg-red-500 hover:text-red-700 font-semibold text-white py-2 px-4 border hover:border-red-500 border-transparent rounded"
              @click="addToCart(book)"
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-cart2"
                viewBox="0 0 16 16"
                id="IconChangeColor"
              >
                <path
                  d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                  id="mainIconPathAttribute"
                ></path>
              </svg>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import FilterCategory from "../components/FilterCategory.vue";
import { PublicApi } from "../service/api";
import { useCartStore } from "../store/cart";
const filters = ref({
  title: "",
  category: [],
});

const books = ref([]);
const publicApi = new PublicApi();
const cart = useCartStore()

const filteredBooks = computed(() => {
  let items = books.value;
  if (filters.value.title.length > 1) {
    items = items.filter((book) =>
      book.title.toUpperCase().includes(filters.value.title.toUpperCase())
    );
  }
  if (filters.value.category.length >= 1) {
    items = items.filter((book) =>
      filters.value.category.includes(book.category)
    );
  }
  return items;
});

onMounted(() => {
  publicApi.getBooks().then((response) => {
    books.value = response.data;
  });
});

const categoryFilter = (values) => {
  filters.value.category = values;
};

const addToCart = (item) => {
  cart.addItem(item)
}
</script>

<style>
.bookTitle {
  font-family: "Libre Baskerville", serif;
  font-weight: 500;
  font-style: italic;
}
</style>
