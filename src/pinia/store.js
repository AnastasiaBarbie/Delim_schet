import { defineStore } from "pinia";

export const useStore = defineStore("mainStore", {
  state: () => ({
    people: [],
    nextIdPeople: 1,
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
      this.nextIdPeople += 1;
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
