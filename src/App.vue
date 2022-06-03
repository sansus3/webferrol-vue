<script setup>
import { RouterView } from 'vue-router'
import { useStoreUsers } from './stores/users';
import TheMenu from './components/TheMenu.vue';
//import '@/assets/base.scss';
const store = useStoreUsers();
store.logged();//Comprobamos si el usuario está logueado
</script>

<template>
  <header>
       
      <TheMenu :logged="store.isLogged"></TheMenu>
       {{store.getUser.email}}
      
   
  </header>

  <RouterView />
</template>

<style lang="scss">
@import '@/assets/base.scss';
</style>
