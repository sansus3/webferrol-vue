<script setup>
//Libraries
import { RouterView } from 'vue-router'
import { useStoreUsers } from '@/stores/users';
import TheMenu from '@/components/TheMenu.vue';
import TheFooter from '@/components/TheFooter.vue';
//Store Pinia
const store = useStoreUsers();

/**
 * Lanzamos el store desde la entrada de la app
 */
(async () => {
  try {
    store.loadingSession = true;
    await store.onAuthState();
    store.loadingSession = false;
  } catch (error) {
    console.log("App.vue", error.message);
  }
})();
</script>

<template>
  <TheMenu></TheMenu> 
  <RouterView />
  <TheFooter :email="store.getUser?.email"></TheFooter>
</template>

<style lang="scss">
@import '@/assets/base.scss';
</style>
