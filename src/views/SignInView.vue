<template>
    <div class="container">
        <h1>Formulario de contacto</h1>
        <form @submit.prevent="signIn" action="#">
            <ul class="fields">
                <li class="field">
                    <label for="email">Correo</label>
                    <input required v-model.trim="form.email" type="email" id="email">
                </li>
                <li class="field">
                    <label for="passord">Password</label>
                    <input required v-model.trim="form.password" type="password" id="password">
                </li>
            </ul>
            <input @click="byeBye" v-if="store.isLogged"  type="button" value="desconectar">
            <button v-else :disabled="validate">Enviar</button>
        </form>
        <strong v-if="error">{{error.code}}{{error.message}}</strong>
        
    </div>
</template>

<script setup>
//Libraries
import { useStoreUsers } from '@/stores/users';
import { ref,reactive,computed } from 'vue';
//Cargamos store
const store = useStoreUsers();
//Variables
const form = reactive({
    email: 'gonzaleztenreiro@gmail.com',
    password:'Tq0xuxvBMs27042304()'
});
const error = ref(false);
const validate = computed(()=>form.email==='' || form.password==='');
const signIn = async () => {
    try {
        error.value = false;
        await store.signIn(form);
    } catch (e) {
        //Errores
        //https://firebase.google.com/docs/auth/admin/errors?hl=es&authuser=0
        //console.log(e.code,'=>',e.message);
         error.value=e;
    }
}
const byeBye = async () => {
    try {
        error.value = false;
        await store.loginOut();
    } catch (e) {
        //console.log(e.code,'=>',e.message);
        error.value=e;
    }
}
</script>

<style lang="scss" scoped>
    ul{
        border-style: solid;
        list-style-type: none;
        padding-left: none;
    }
</style>