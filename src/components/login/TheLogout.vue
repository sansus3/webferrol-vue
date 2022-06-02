<template>
    <a
        class="button"
        href="#"
        v-if="store.isLogged" 
        @click.prevent="logOut">
    Cerrar sesión </a>

</template>

<script setup>
//Libraries
import { useStoreUsers } from '@/stores/users';
//Iniciamos store de user
const store = useStoreUsers();
const logOut = async () => {
    try {
        await store.loginOut();
    } catch (e) {
        console.log(e.code,'=>',e.message);
    }
}
</script>

<style lang="scss" scoped>
</style>