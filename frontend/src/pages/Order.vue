<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-4 md:gap-6 mt-10">
      <div class="md:col-span-1 flex justify-center"></div>
      <div v-if="!isOrderCompleted" class="mt-5 md:col-span-2 md:mt-0">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-700"
                  >Full name</label
                >
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  v-model="formData.firstName"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="block text-sm font-medium text-gray-700"
                  >Phone
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="formData.phone"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="country"
                  class="block text-sm font-medium text-gray-700"
                  >Country</label
                >
                <select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>Romania</option>
                </select>
              </div>

              <div class="col-span-6">
                <label
                  for="street-address"
                  class="block text-sm font-medium text-gray-700"
                  >Address</label
                >
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autocomplete="street-address"
                  v-model="formData.address"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div class="col-span-6">
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-700"
                  >City</label
                >
                <input
                  type="text"
                  name="city"
                  id="city"
                  autocomplete="address-level2"
                  v-model="formData.city"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <p class="text-red-500">{{ errMessage }}</p>
            <button
              type="button"
              @click="order"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Order now
            </button>
          </div>
        </div>
      </div>
      <div v-if="isOrderCompleted">
        <p class="text-green-500">Order placed successfully</p>
        <router-link to="/">
          <button>Back to store</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import { order as orderValidation } from "@bookery/shared";
import { useCartStore } from "../store/cart";
import { ProtectedApi } from "../service/api";
const cart = useCartStore();
const router = useRouter();
const formData = ref({
  firstName: "",
  lastName: "",
  address: "",
  city: "",
});
const isOrderCompleted = ref(false);

const protectedApiService = ref(undefined);
const errMessage = ref("");
onMounted(() => {
  if (cart.items.length < 1) {
    router.push("/");
    return;
  }
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (!user || user.isAnonymous) {
      router.push("/");
      return;
    }
    protectedApiService.value = new ProtectedApi(user.accessToken);
  });
});

const order = () => {
  const validData = validate();
  console.log(validData);
  if (validData.error !== undefined) {
    errMessage.value = "invalid data";
    return;
  }
  protectedApiService.value.placeOrder(validData.value).then(
    (response) => {
      isOrderCompleted.value = true;
      cart.clean();
    },
    (error) => {
      errMessage.value = "server error";
    }
  );
};

const validate = () => {
  const order = {
    delivery: {
      city: formData.value.city,
      address: formData.value.address,
      name: formData.value.firstName,
      phone: formData.value.phone,
    },
    items: cart.items.map((item) => ({
      productId: item.book.id,
      quantity: item.quantity,
    })),
  };
  return orderValidation.createOrderSchema.validate(order);
};
</script>
