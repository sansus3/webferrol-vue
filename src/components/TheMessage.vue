<template>
    <article 
        class="message m-3"
        :class="errorOutput && errorOutput.class?errorOutput.class: 'is-danger'" 
        v-if="errorOutput.error">
        <div class="message-header">
            <p>{{errorOutput && errorOutput.title?errorOutput.title: 'Error'}}</p>
            <button @click="closeErroOutput" class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
            {{errorOutput && errorOutput.message?errorOutput.message: ''}}
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    errorOutput: {
        type: Object,
        default: () => ({
            /**
             * 
             * @type {Boolean} error - Esta variable permite hacer visible o no la ventana modal
             * @type {String} message - Contenido de la ventana modal
             * @type {String} title - Mensaje de la barra de título de la ventana modal
             * @type {String} class - Clase aplicada a la ventana modal. Valores posibles: is-primary, is-link, is-info, is-success, is-warning, is-danger
             */
            error: false,
            message: '', 
            title: 'Error', 
            class: 'is-danger' 
        })
    }
});

const closeErroOutput = () => {
    props.errorOutput.error = false;
    props.errorOutput.message = '';
}
</script>