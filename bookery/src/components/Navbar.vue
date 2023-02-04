<template>
  <header class="bg-white shadow-md h-14 flex justify-between items-stretch">
    <router-link
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 pl-20 text-amber-800 font-bold text-xl"
    >
      BOOKERY
    </router-link>
    <div class="flex items-center gap-1">
      <router-link
        :to="{ name: 'categories' }"
        class="inline-flex items-center px-2 pr-5 h-full text-l transition-colors hover:text-gray-400"
      >
        Categorii
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg>
      </router-link>
      <router-link
        to="/"
        class="inline-flex items-center px-2 pr-5 h-full text-l transition-colors hover:text-gray-400"
      >
        Login
      </router-link>
      <router-link
        to="/"
        class="inline-flex items-center px-2 pr-7 h-full text-l transition-colors hover:text-gray-400"
      >
        Cosul tau
      </router-link>
    </div>
  </header>
  <div></div>
</template>
