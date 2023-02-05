<template>
  <div>
    <div class="flex flex-column p-8">Login</div>
    <div class="flex flex-col">
      <input
        name="email"
        v-model="loginForm.email"
        type="email"
        class="border-1"
        placeholder="email"
      />
      <input
        name="password"
        v-model="loginForm.password"
        type="password"
        class="border-1"
        placeholder="password"
      />
      <button class="bg-gray-200 rounded-lg p-2 m-2" @click="login">
        Login
      </button>
      {{ errorMessage }}
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
    if (!user.isAnonymous) {
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
