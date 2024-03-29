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
              <v-text-field
                v-model="newProduct.name"
                label="Название"
                required
              />
              <v-text-field
                v-model="newProduct.price"
                type="number"
                label="Цена"
                required
              />
              <v-select
                v-model="newProduct.paidBy"
                :items="peopleNames"
                label="Оплатил"
                outlined
                required
              />
              <v-select
                v-model="newProduct.consumed"
                label="Съели"
                :items="peopleNames"
                multiple
              />
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
          <v-list>
            <v-list-item> Оплатил: {{ product.paidBy }}</v-list-item>
            <v-list-item> Съели: {{ product.consumed }} </v-list-item>
          </v-list>
        </template>
      </v-list-item>
    </v-list>
    <v-container> Итого оплатить: {{ showSum() }} </v-container>
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
  name: "OrderItems",
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
      paidBy: null,
      consumed: [],
    });

    const createProduct = () => {
      if (
        !(
          newProduct.value.name &&
          newProduct.value.price &&
          newProduct.value.paidBy.length > 0 &&
          newProduct.value.consumed.length > 0
        )
      ) {
        return;
      }
      store.addProduct({
        name: newProduct.value.name,
        price: newProduct.value.price,
        id: Date.now(),
        showDetails: false,
        paidBy: newProduct.value.paidBy,
        consumed: newProduct.value.consumed,
      });
      const totalConsumers = newProduct.value.consumed.length;
      const pricePerConsumer = (
        newProduct.value.price / totalConsumers
      ).toFixed(2);
      for (const consumer of newProduct.value.consumed) {
        if (consumer !== newProduct.value.paidBy) {
          const existingWhomShouldIndex = store.whomShould.findIndex(
            (whome) => whome.whom === newProduct.value.paidBy
          );

          if (existingWhomShouldIndex !== -1) {
            const existingCreditIndex = store.whomShould[
              existingWhomShouldIndex
            ].credit.findIndex((entry) => entry.who === consumer);
            if (existingCreditIndex !== -1) {
              store.whomShould[existingWhomShouldIndex].credit[
                existingCreditIndex
              ].howMany += parseFloat(pricePerConsumer);
            } else {
              store.whomShould[existingWhomShouldIndex].credit.push({
                who: consumer,
                howMany: parseFloat(pricePerConsumer),
                idCredit: Date.now(),
              });
            }
          } else {
            store.addWhomeShould({
              whom: newProduct.value.paidBy,
              credit: [
                {
                  who: consumer,
                  howMany: parseFloat(pricePerConsumer),
                  idCredit: Date.now(),
                },
              ],
              idWhomeShould: Date.now(),
            });
          }
        }
      }

      for (const consumer of newProduct.value.consumed) {
        if (consumer !== newProduct.value.paidBy) {
          const existingDebtIndex = store.debts.findIndex(
            (debt) =>
              debt.who === consumer &&
              debt.credit.some(
                (entry) => entry.whom === newProduct.value.paidBy
              )
          );

          if (existingDebtIndex !== -1) {
            const existingCreditIndex = store.debts[
              existingDebtIndex
            ].credit.findIndex(
              (entry) => entry.whom === newProduct.value.paidBy
            );

            if (existingCreditIndex !== -1) {
              store.debts[existingDebtIndex].credit[
                existingCreditIndex
              ].howMany += parseFloat(pricePerConsumer);
            }
          } else {
            const existDebtWhoIndex = store.debts.findIndex(
              (debt) => debt.who === consumer
            );

            if (existDebtWhoIndex !== -1) {
              store.debts[existDebtWhoIndex].credit.push({
                whom: newProduct.value.paidBy,
                howMany: parseFloat(pricePerConsumer),
                idCredit: Date.now(),
              });
            } else {
              store.addDebt({
                who: consumer,
                credit: [
                  {
                    whom: newProduct.value.paidBy,
                    howMany: parseFloat(pricePerConsumer),
                    idCredit: Date.now(),
                  },
                ],
                idDebt: Date.now(),
              });
            }
          }
        }
      }
      newProduct.value.name = "";
      newProduct.value.price = 0;
      newProduct.value.paidBy = null;
      newProduct.value.consumed = [];
    };

    const toggleDetails = (product) => {
      product.showDetails = !product.showDetails;
    };
    const showSum = () => {
      let sum = store.products.reduce(
        (total, product) => total + parseFloat(product.price),
        0
      );
      console.log("Общая сумма продуктов:", sum);
      return sum;
    };

    return {
      dialogProduct,
      store,
      createProduct,
      newProduct,
      toggleDetails,
      peopleNames,
      showSum,
    };
  },
};
</script>
