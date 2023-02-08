<template>
  <div class="w-full">
    <div class="text-center mb-5">
      <h3 class="pt-5 sm:text-xl lg:text-2xl shoppingTitle">My orders</h3>
    </div>
    <div class="p-10 max-w-2xl mx-auto flex flex-col gap-5">
      <p v-if="orders.length < 1" class="text-center">You have no orders</p>
      <div
        v-for="order in orders"
        :key="order.id"
        class="w-full border-2 rounded-lg p-4"
      >
        <div class="mb-auto flex justify-between">
          <div>
            <span class="text-gray-400 text-xs mb-2">
              {{ order.id }}
            </span>
            <p class="text-gray-700 text-base">
              Date: {{ dateFormatter.format(order.createAt) }}
            </p>
          </div>
          <div>
            <button type="button" @click="selectedOrderForShowItems = order">
              Details
            </button>
          </div>
        </div>
        <div class="flex-col md:flex-row flex mt-4">
          <div class="w-full">
            <p class="text-blue-400 leading-none">
              No. products:
              {{ order.items.reduce((prev, curr) => prev + curr.quantity, 0) }}
            </p>
            <p>
              Total:
              {{
                formatPrice(
                  order.items.reduce(
                    (prev, curr) => prev + curr.quantity * curr.price,
                    0
                  )
                )
              }}
            </p>
          </div>

          <div
            v-if="orderValidation.canBeModified()"
            class="flex justify-between mt-4 md:pt-0 md:justify-end w-full gap-4"
          >
            <div>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                @click="onDelete(order.id)"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                class="bg-gray-200 hover:bg-gray-400 py-1 px-3 rounded"
                @click="onEdit(order)"
              >
                Change delivery
              </button>
            </div>
          </div>
          <div v-if="!orderValidation.canBeModified()">
            <p>The order can't be changed anymore (>5h)</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="selectedOrderIdForEdit"
      class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
    >
      <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Edit delivery information</h3>
          <svg
            @click="onEditCanel"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-red-900 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="mt-4">
          <div class="w-full flex flex-col gap-4 mb-4">
            <div class="w-full">
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
            <div class="w-full">
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
            <div class="w-full">
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

            <div class="w-full">
              <label for="city" class="block text-sm font-medium text-gray-700"
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
            <p class="text-red-500">{{ errorMessage }}</p>
          </div>
          <div class="flex justify-between">
            <button @click="onEditCanel" class="px-6 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button
              class="px-6 py-2 ml-2 text-white bg-blue-600 rounded"
              @click="onEditSave()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="selectedOrderForShowItems"
      class="absolute inset-0 flex items-center justify-center  bg-gray-700 bg-opacity-50"
    >
      <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl min-w-[50%]">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">Order details</h3>
          <svg
            @click="selectedOrderForShowItems = undefined"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-red-900 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="mt-4 w-full">
          <div class="w-full flex flex-col gap-4 mb-4">
            <div v-for="item in selectedOrderForShowItems.items" :key="item.id" class="flex justify-between">
              <p>{{ item.title }}</p>
              <span
                >{{ item.quantity }} x {{ formatPrice(item.price) }} ({{
                  formatPrice(item.quantity * item.price)
                }})
              </span>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              @click="selectedOrderForShowItems = undefined"
              class="px-6 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { order as orderValidation } from "@bookery/shared";
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ProtectedApi } from "../service/api";
import { formatPrice } from "../utils/price";

const router = useRouter();
const orders = ref([]);
const selectedOrderIdForEdit = ref(undefined);
const selectedOrderForShowItems = ref(undefined);
const formData = ref(undefined);
const errorMessage = ref("");

const dateFormatter = Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

const protectedApiService = ref();

onMounted(() => {
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (!user || user.isAnonymous) {
      // user is not logged in
      router.push("/");
      return;
    }
    const service = new ProtectedApi(user.accessToken);
    protectedApiService.value = service;
    service.getOrders().then((response) => {
      orders.value = response.data;
    });
  });
});

const refreshData = () => {
  protectedApiService.value.getOrders().then((response) => {
    orders.value = response.data;
  });
};

const onDelete = (id) => {
  return protectedApiService.value.cancelOrder(id).then(
    () => {
      refreshData();
    },
    (err) => console.log(err)
  );
};

const onEdit = (selectedOrder) => {
  formData.value = {
    name: selectedOrder.delivery.name,
    address: selectedOrder.delivery.address,
    city: selectedOrder.delivery.city,
    phone: selectedOrder.delivery.phone,
  };
  selectedOrderIdForEdit.value = selectedOrder.id;
};

const onEditSave = () => {
  const result = orderValidation.deliverySchema.validate(formData.value);
  if (result.error !== undefined) {
    errorMessage.value = "Invalid data";
    return;
  }
  protectedApiService.value
    .updateOrderDelivery(selectedOrderIdForEdit.value, formData.value)
    .then(
      () => {
        selectedOrderIdForEdit.value = undefined;
        formData.value = undefined;
        refreshData();
      },
      (err) => {
        console.log(err);
        errorMessage.value = "Server error";
      }
    );
};

const onEditCanel = () => {
  selectedOrderIdForEdit.value = undefined;
  formData.value = undefined;
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
