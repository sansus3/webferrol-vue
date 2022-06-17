<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click.prevent="onPreviousClick" :class="{'is-disabled':previousDisabled}" title="This is the first page">Anterior</a>
        <a class="pagination-next" @click="onNextClick" :class="{'is-disabled':nextDisabled}">Siguiente</a>
        <ul class="pagination-list">
            <li v-for="i in total" :key="i">
                <a v-if="isCurrent===i" class="pagination-link is-current" :aria-label="`Page ${i}`" aria-current="page">{{i}}</a>
                <a v-else class="pagination-link" :aria-label="`Goto page ${i}`">{{i}}</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const props = defineProps({
    total: {
        type: Number,
        default: 8,
    },
    isCurrent: {
        type: Number,
        default: 2,
    },
    nextDisabled: {
        type: Boolean,
        default: false,
    },
    previousDisabled: {
        type: Boolean,
        default: false,
    }
});
const emits = defineEmits(['handleNext','handlePrevious']);

const onNextClick = () => {
    if(!props.nextDisabled)
        emits('handleNext');
}
const onPreviousClick = () => {
    if(!props.previousDisabled)
        emits('handlePrevious')
}
</script>