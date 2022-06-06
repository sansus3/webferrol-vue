<script setup>
import { RouterView } from 'vue-router'
import { useStoreUsers } from '@/stores/users';
import TheMenu from '@/components/TheMenu.vue';
import TheFooter from '@/components/TheFooter.vue';
//import '@/assets/base.scss';
const store = useStoreUsers();
store.logged();//Comprobamos si el usuario está logueado
</script>

<template>
  <TheMenu :logged="store.isLogged"></TheMenu>
  <RouterView />
  <TheFooter :email="store.getUser.email"></TheFooter>
</template>

<style lang="scss">
@import '@/assets/base.scss';
</style>
