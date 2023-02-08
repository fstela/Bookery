import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
    /**
     * items: [
     *  {
     *      book: {
     *          id: string
     *          title: string
     *          author: string
     *          category: string;
     *          price: number
     *      },
     *      qunatity: number
     *  },....
     * ]
     */
    return {
      items: [],
    };
  },
  getters: {
    totalPrice: (state) =>
      state.items.reduce((prev, curr) => prev + curr.book.price, 0),
    noItems: (state) =>
      state.items.reduce((prev, curr) => prev + curr.quantity, 0),
  },
  actions: {
    addItem(item) {
      const exisitngItem = this.items.find(
        (existingItem) => existingItem.book.id === item.id
      );

      if (exisitngItem) {
        const itemsWithoutCurrentItem = this.items.filter(
          (exisitngItem) => exisitngItem.book.id !== item.id
        );
        this.items = [
          ...itemsWithoutCurrentItem,
          { ...exisitngItem, quantity: exisitngItem.quantity + 1 },
        ];
        return;
      }

      this.items.push({ book: item, quantity: 1 });
    },
    removeItem(item) {
      let exisitngItem = this.items.find(
        (existingItem) => existingItem.book.id === item.book.id
      );
      if (!exisitngItem) {
        return;
      }
      const itemsWithoutCurrentItem = this.items.filter(
        (exisitngItem) => exisitngItem.book.id !== item.book.id
      );
      
      if (exisitngItem.quantity > 1) {
        exisitngItem.quantity = exisitngItem.quantity - 1;
        this.items = [...itemsWithoutCurrentItem, exisitngItem];
        return;
      }

      this.items = itemsWithoutCurrentItem;
    },
    clean() {
      this.items= []
    }
  },
});
