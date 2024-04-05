<template>
  <v-app>
    <v-dialog width="500" v-model="dialog">
      <template #activator="{ props }">
        <v-btn class="btn-add" v-bind="props" text="Добавить клиента"> </v-btn>
      </template>
      <template #default="{ isActive }">
        <v-card>
          <v-card-title>Клиенты</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createPeople">
              <v-text-field v-model="newPeople.name" label="Имя" required>
              </v-text-field>
              <v-btn type="submit" @click="isActive.value = false">
                Добавить
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text="Закрыть" @click="isActive.value = false" />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-list>
      <v-list-item v-for="people in store.people" :key="people.id">
        {{ people.name }}
      </v-list-item>
    </v-list>
    <router-link
      style="color: rgba(0, 0, 0, 0.776)"
      :to="{ name: 'OrderItems' }"
    >
      <v-btn :class="$route.name === 'OrderItems'"> Далее </v-btn>
    </router-link>
    <router-view />
  </v-app>
</template>

<script>
import { useStore } from "@/pinia/store";
import { ref } from "vue";

export default {
  name: "PeopleList",
  setup() {
    const store = useStore();
    const dialog = ref(false);
    const newPeople = ref({
      name: "",
      expenses: 0,
      id: "",
    });
    const createPeople = () => {
      if (!newPeople.value.name) {
        return;
      }
      store.addPeople({
        name: newPeople.value.name,
        expenses: 0,
        id: Date.now(),
      });
      newPeople.value = {
        name: "",
        id: "",
      };
    };
    return {
      dialog,
      store,
      createPeople,
      newPeople,
    };
  },
};
</script>

<style lang="scss">
@import "../styles/styles.scss";
</style>
