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
            <button :disabled="validate">Enviar</button>
        </form>
        <a href="#" @click.prevent="byeBye">Desconectar</a>
    </div>
</template>

<script setup>
//Libraries
import { useStoreUsers } from '@/stores/users';
import { reactive,computed } from 'vue';
//Cargamos store
const store = useStoreUsers();
//Variables
const form = reactive({
    email: '',
    password:''
});
const validate = computed(()=>form.email==='' || form.password==='');
const signIn = async () => {
    try {
        await store.signIn(form);
    } catch (error) {
        console.log(error.code,'=>',error.message);
    }
}
const byeBye = async () => {
    try {
        await store.loginOut();
    } catch (error) {
        console.log(error.code,'=>',error.message);
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