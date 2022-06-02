<template>
    <form class="my-form" id="signIn" @submit.prevent="signIn" action="#">
        <ul class="field">
            <li class="field">
                <label class="label" for="email">Correo</label>
                <div class="control">
                    <input required v-model.trim="form.email" type="email" id="email" class="input">
                    <p class="help">Correo de acceso a área privada</p>
                </div>
            </li>
            <li class="field">
                <label class="label" for="passord">Password</label>
                <div class="control">
                    <input required v-model.trim="form.password" type="password" id="password" class="input">
                </div>
            </li>
        </ul>
        <div v-if="notification" class="notification is-danger">
            <button @click.prevent="closeNotification" class="delete"></button>
            {{error.message}}
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button :disabled="validate || store.isLogged" class="button is-link">LogIn</button>
            </div>
        </div>
    </form>
</template>

<script setup>
//Libraries
import { useStoreUsers } from '@/stores/users';
import { ref, reactive, computed } from 'vue';
//Cargamos store
const store = useStoreUsers();
//Variables
const form = reactive({
    email: 'gonzaleztenreiro@gmail.com',
    password: 'Tq0xuxvBMs27042304()'
});
const error = ref(false);
const notification = ref(false);

const validate = computed(() => form.email === '' || form.password === '');



const closeNotification = () => {
    notification.value = false;
}

const signIn = async () => {
    try {
        error.value = false;
        notification.value = false;
        await store.signIn(form);
    } catch (e) {
        //Errores
        //https://firebase.google.com/docs/auth/admin/errors?hl=es&authuser=0
        //console.log(e.code,'=>',e.message);
        error.value = e;
        notification.value = true;
    }
}
</script>

<style lang="scss" scoped>
ul {
    list-style-type: none;
    padding-left: none;
}
</style>