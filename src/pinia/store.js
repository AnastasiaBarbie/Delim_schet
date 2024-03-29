import { defineStore } from "pinia";

export const useStore = defineStore("mainStore", {
  state: () => ({
    people: [],
    products: [],
    debts: [],
    whomShould: [],
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
    addDebt(newDebt) {
      this.debts.push(newDebt);
    },
    addWhomeShould(newWhomeShould) {
      this.whomShould.push(newWhomeShould);
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
