import { defineStore } from "pinia";

export const useStore = defineStore("mainStore", {
  state: () => ({
    people: [],
    products: [],
  }),
  actions: {
    initializeStore() {
      const loadedData = this.loadState;
      Object.keys(loadedData).forEach((key) => {
        this.$state[key] = loadedData[key];
      });
    },
    addPeople(newPeople) {
      this.people.push(newPeople);
    },
    addProduct(newProduct) {
      this.products.push(newProduct);
    },
  },
  getters: {
    loadState() {
      const storedData = localStorage.getItem("mainStore");
      if (storedData) {
        return JSON.parse(storedData);
      }
      return this.$state;
    },
  },
});
