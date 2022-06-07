<template>
    <article class="message is-danger m-3" v-if="errorOutput.error">
        <div class="message-header">
            <p>Error</p>
            <button @click="closeErroOutput" class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
            {{ errorOutput.message }}
        </div>
    </article>
</template>

<script setup>
const props = defineProps({
    errorOutput: {
        type: Object,
        default: () => ({ error: false, message: '' })
    }
});

const closeErroOutput = () => {
    props.errorOutput.error = false;
    props.errorOutput.message = '';
}
</script>