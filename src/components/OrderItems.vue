<template>
  <v-app>
    <v-dialog width="500" v-model="dialogProduct">
      <template #activator="{ props }">
        <v-btn style="margin-right: 75%" v-bind="props" text="Add products">
        </v-btn>
      </template>
      <template #default="{ isActive }">
        <v-card>
          <v-card-title>Products</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createProduct">
              <v-text-field v-model="newProduct.name" label="Name" required>
              </v-text-field>
              <v-text-field
                v-model="newProduct.price"
                type="number"
                label="Price"
                required
              >
              </v-text-field>
              <v-btn type="submit" @click="isActive.value = false">
                Добавить
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Закрыть" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-list>
      <v-list-item
        @click="toggleDetails(product)"
        v-for="product in store.products"
        :key="product.id"
      >
        {{ product.name }}: {{ product.price }}rub
        <v-list-item v-if="product.showDetails">
          <v-checkbox
            v-for="people in store.people"
            :key="people.id"
            :label="`${people.name}`"
          />
          Additional information: {{ product.additionalInfo }}
        </v-list-item>
      </v-list-item>
    </v-list>
  </v-app>
</template>

<script>
import { useStore } from "@/pinia/store";
import { ref } from "vue";

export default {
  name: "PeopleList",
  setup() {
    const store = useStore();
    const dialogProduct = ref(false);
    const newProduct = ref({
      name: "",
      price: 0,
      id: "",
    });
    const createProduct = () => {
      if (!newProduct.value.name) {
        return;
      }
      store.addProduct({
        name: newProduct.value.name,
        price: newProduct.value.price,
        id: store.nextIdProduct,
        showDetails: false, // Добавляем свойство для отображения дополнительной информации
        additionalInfo: "Some additional info", // Пример дополнительной информации
      });
      newProduct.value = {
        name: "",
        price: 0,
        id: "",
        showSelect: false,
      };
    };
    const toggleDetails = (product) => {
      product.showDetails = !product.showDetails; // Переключаем значение флага при клике
    };
    return {
      dialogProduct,
      store,
      createProduct,
      newProduct,
      toggleDetails,
    };
  },
};
</script>
