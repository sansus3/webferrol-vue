<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click.prevent="onPreviousClick" :class="{'is-disabled':actualPage===1}" title="This is the first page">Anterior</a>
        <a class="pagination-next" @click="onNextClick" :class="{'is-disabled':actualPage===pages}">Siguiente</a>
        <ul class="pagination-list">
            <li v-for="i in pages" :key="i">
                <a v-if="actualPage===i" class="pagination-link is-current" :aria-label="`Page ${i}`" aria-current="page">{{i}}</a>
                <a @click="onPaginationLink(i)" v-else class="pagination-link" :aria-label="`Goto page ${i}`">{{i}}</a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    /**
     * @type total Número de items totales
     */
    total: {
        type: Number,
        default: 8,
    },
    /**
     * @type perPage Número de items a mostrar por página 
     */
    perPage:{
        type: Number,
        default: 3,
    },
    actualPage: {
        type: Number,
        default: 2,
    },
});

const pages = computed(()=>Math.ceil(props.total/props.perPage));

const emits = defineEmits(['handleNext','handlePrevious','handlePaginationLink']);

const onNextClick = () => {
    if(props.actualPage!==pages.value)
        emits('handleNext');
}
const onPreviousClick = () => {
    if(props.actualPage!==1)
        emits('handlePrevious')
}

const onPaginationLink = page => {
    emits('handlePaginationLink',page)
}
</script>

<style scoped>
.is-current{
    cursor: auto;
}
</style>