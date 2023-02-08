<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <svg
          class="mx-auto h-12 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="#5046e3"
            d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          />
        </svg>

        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600"></p>
      </div>
      <div class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="loginForm.email"
              autocomplete="email"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="loginForm.password"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center text-sm">
            <router-link to="/Register" class="font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account?
            </router-link>
          </div>
        </div>
        <div class="pt-1">
          <button
            type="button"
            @click="login"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>
          <p class="text-red-500">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login as loginValidation } from "@bookery/shared";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const loginForm = ref({
  email: "",
  password: "",
});
const errorMessage = ref("");

const router = useRouter();

onMounted(() => {
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      router.push("/");
    }
  });
});

const login = () => {
  const validData = validate();
  if (validData.error === undefined) {
    console.log("ok");
    errorMessage.value = "";
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      validData.value.email,
      validData.value.password
    ).then((data) => {
      console.log(data);
    });
  } else {
    console.log("error");
    errorMessage.value = "Invalid login credentials";
  }
};

const validate = () => {
  const formData = loginForm.value;
  console.log(formData);
  return loginValidation.loginScheam.validate(formData);
};
</script>
