<template>
   <div class="bg-white h-full">
    <navbar/>
    <main>
      <router-view />
    </main>
  </div>

</template>

<script setup>
import Navbar from "./Navbar.vue"
</script>