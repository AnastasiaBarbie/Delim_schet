<template>
  <v-app>
    <v-container>
      <v-btn @click="showInfo('expenses')" class="button-result">
        Кто сколько потратил
      </v-btn>
      <v-btn @click="showInfo('debtors')" class="button-result">
        Кто кому должен
      </v-btn>
      <v-btn @click="showInfo('whomShould')" class="button-result">
        Кому кто должен
      </v-btn>
    </v-container>
    <v-container>
      <v-list v-if="activeTab === 'expenses'">
        <v-list-item v-for="person in store.people" :key="person.id">
          <v-list-item-title>
            <strong>{{ person.name }}</strong>
          </v-list-item-title>
          <v-list-item> Потратил: {{ person.expenses }} </v-list-item>
        </v-list-item>
      </v-list>
      <v-list v-if="activeTab === 'debtors'">
        <!-- Отображение информации о должниках -->
        <v-list-item v-for="debt in store.debts" :key="debt.idDebt">
          <v-list-item-title>
            <strong> {{ debt.who }} </strong>
          </v-list-item-title>
          <v-list-item v-for="credit in debt.credit" :key="credit.idCredit">
            {{ debt.who }} должен(на) {{ credit.howMany }} рублей
            {{ credit.whom }}
          </v-list-item>
        </v-list-item>
      </v-list>
      <v-list v-else-if="activeTab === 'whomShould'">
        <!-- Отображение информации о том, кому должны -->
        <v-list-item
          v-for="whomShould in store.whomShould"
          :key="whomShould.idWhomShould"
        >
          <v-list-item-title>
            <strong> {{ whomShould.whom }} </strong>
          </v-list-item-title>
          <v-list-item
            v-for="creditEntry in whomShould.credit"
            :key="creditEntry.idCredit"
          >
            {{ creditEntry.who }} должен(на) {{ creditEntry.howMany }}
            {{ whomShould.whom }}
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-container>
  </v-app>
</template>

<script>
import { useStore } from "@/pinia/store";
import { ref } from "vue";

export default {
  name: "FinalScore",
  setup() {
    const store = useStore();
    const activeTab = ref(""); // флаг для отслеживания активной вкладки
    const showInfo = (tab) => {
      activeTab.value = tab; // Устанавливаем активную вкладку в зависимости от нажатой кнопки
    };
    return {
      store,
      activeTab,
      showInfo,
    };
  },
};
</script>
<style lang="scss">
@import "../styles/styles.scss";
</style>
