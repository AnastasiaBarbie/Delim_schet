<template>
  <v-app>
    <!-- Диалог для добавления продуктов -->
    <v-dialog width="500" v-model="dialogProduct">
      <template #activator="{ props }">
        <v-btn
          style="margin-right: 75%"
          v-bind="props"
          text="Добавить продукты"
        >
        </v-btn>
      </template>
      <template #default="{ isActive }">
        <v-card>
          <v-card-title>Продукты</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createProduct">
              <v-text-field v-model="newProduct.name" label="Название" required>
              </v-text-field>
              <v-text-field
                v-model="newProduct.price"
                type="number"
                label="Цена"
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
            <v-btn text="Закрыть" @click="isActive.value = false" />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <!-- Список продуктов -->
    <v-list>
      <v-list-item v-for="product in store.products" :key="product.id">
        <v-list-item-content @click="toggleDetails(product)">
          {{ product.name }}: {{ product.price }} руб
        </v-list-item-content>
        <template v-if="product.showDetails">
          <!-- Выбор человека, который оплатил -->
          <v-list-item>
            <v-select
              v-model="product.paidBy"
              label="Оплатил"
              :items="peopleNames"
            />
          </v-list-item>
          <!-- Выбор людей, кто ел продукт -->
          <v-list-item>
            <v-select
              v-model="product.consumed"
              label="Съели"
              :items="peopleNames"
              multiple
            />
          </v-list-item>
        </template>
      </v-list-item>
    </v-list>
    <router-link
      style="color: rgba(0, 0, 0, 0.776)"
      :to="{ name: 'FinalScore' }"
    >
      <v-btn :class="$route.name === 'FinalScore'" style="margin-left: 10px">
        Result
      </v-btn>
    </router-link>
    <router-view />
  </v-app>
</template>

<script>
import { useStore } from "@/pinia/store";
import { ref, computed } from "vue";

export default {
  name: "PeopleList",
  setup() {
    const store = useStore();
    const dialogProduct = ref(false);

    const peopleNames = computed(() =>
      store.people.map((person) => person.name)
    );
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
        id: Date.now(),
        showDetails: false,
        showNextSelect: false,
        paidBy: null, // Добавляем свойство для хранения информации об оплатившем
        consumed: [], // Добавляем свойство для хранения информации о тех, кто ел продукт
      });
      newProduct.value = {
        name: "",
        price: 0,
        id: "",
      };
    };
    const toggleDetails = (product) => {
      product.showDetails = !product.showDetails;
    };
    /*
    const createDebt = (product) => {
      const totalConsumers = product.consumed.length;
      const pricePerConsumer = product.price / totalConsumers;
      for (const consumer of product.consumed) {
        store.addDebt({
          who: consumer,
          whom: product.paidBy,
          howMany: pricePerConsumer,
          idDebt: Date.now(),
        });
      }
    }; */

    return {
      dialogProduct,
      store,
      createProduct,
      newProduct,
      toggleDetails,
      peopleNames,
    };
  },
};
</script>
