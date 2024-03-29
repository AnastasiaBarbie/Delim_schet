<template>
  <v-app>
    Result!
    <v-btn @click="showDebtors">Кто кому должен</v-btn>
    <v-btn @click="showWhomShould">Кому кто должен</v-btn>
    <v-container>
      <v-list v-if="isShowDebtors">
        <v-list-item v-for="debt in store.debts" :key="debt.idDebt">
          <v-list-item-title>{{ debt.who }}</v-list-item-title>
          <v-list-item v-for="credit in debt.credit" :key="credit.idCredit">
            {{ debt.who }} должен(на) {{ credit.howMany }} рублей
            {{ credit.whom }}
          </v-list-item>
        </v-list-item>
      </v-list>
      <v-list v-if="isShowWhomShould">
        <v-list-item
          v-for="whomShould in store.whomShould"
          :key="whomShould.idWhomShould"
        >
          <v-list-item-title>
            {{ whomShould.whom }}
          </v-list-item-title>
          <v-list-item
            v-for="creditEntry in whomShould.credit"
            :key="creditEntry.idCredit"
          >
            {{ creditEntry.who }} должен(на) {{ creditEntry.howMany }}
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
    const isShowDebtors = ref(false);
    const isShowWhomShould = ref(false);

    const showDebtors = () => {
      isShowDebtors.value = true;
      isShowWhomShould.value = false;
    };

    const showWhomShould = () => {
      isShowDebtors.value = false;
      isShowWhomShould.value = true;
    };

    return {
      store,
      isShowDebtors,
      isShowWhomShould,
      showDebtors,
      showWhomShould,
    };
  },
};
</script>
