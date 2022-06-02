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
import { useRouter } from "vue-router";
//Iniciamos store de user
const store = useStoreUsers();
//Iniciamos router
const router = useRouter();
const logOut = async () => {
    try {
        await store.loginOut();
    } catch (e) {
        console.log(e.code,'=>',e.message);
    } finally {
        router.push({name:'home'});
    }
}
</script>

<style lang="scss" scoped>
</style>