<template>
    <div class="section work-experience columns is-multiline">
       <!-- The Loader -->
       <TheLoader :is-active="loader"></TheLoader>
       <!--Pagination-->
        <div class="column is-full">
            <ThePagination @handleNext="onNextClick" @handlePrevious="onPreviousClick"
                @handlePaginationLink="onPaginationLink" :perPage="store.limit" :actualPage="store.actualPage"
                :total="store.total" :nextDisabled="false" :previousDisabled="false"></ThePagination>

        </div>

        <div v-if="errorOutput.error" class="column title has-text-centered notification is-danger">
            {{ errorOutput.message }}
        </div>
        <div class="column is-one-quarter" v-for="(item, key) in store.workExperiences" :key="key">
            <article class="panel has-background-white"
                :class="{ 'is-success': key % 2 == 0, 'is-info': key % 2 != 0 }">
                <p class="panel-heading notification">
                    {{ item.code }}
                    <button @click="onDelete(item.ref)" class="delete is-small"></button>
                </p>
                <div class="panel-block">

                    {{ item.jobTitle }}
                </div>
                <div class="panel-block">

                    {{ item.title }}
                </div>
                <div class="panel-block">

                    {{ item.place }}
                </div>
                <div class="panel-block">

                    {{ item.province }}
                </div>
                <div class="panel-block">

                    <span class="is-size-7">
                        {{ getDayMonthFullYear(item.dateStart) }}
                    </span>
                    &nbsp;
                    <span class="is-size-7">
                        {{ getDayMonthFullYear(item.dateEnd) }}
                    </span>
                </div>
            </article>
        </div>
        <!-- <pre>
            {{data}}
        </pre> -->
    </div>
</template>

<script setup>
//Dependencies
import { useStoreProfile } from '@/stores/profile';
import { reactive } from 'vue';
import ThePagination from '@/components/ThePagination.vue';
import TheLoader from '@/components/TheLoader.vue';
//hook de funciones
import { getDayMonthFullYear } from "@/hooks/getters";
//Variables
const loader = reactive({'is-active':false });
const errorOutput = reactive({
    error: false,
    message: ''
});
//lanzamos el store
const store = useStoreProfile();
//Lanzamos la promesa
(async () => {
    try {
        loader['is-active'] = true;
        await store.setTotalExperiences();
        await store.setExperiences();
    } catch (error) {
        console.log('Error en fichero WorkExperience.ve', error);
        errorOutput.error = true;
        errorOutput.message = error.message;

    } finally {
        loader['is-active'] = false;
    }
})()

//Paginación
const onNextClick = async () => {
    try {
        loader['is-active'] = true;
        await store.setNextExperiences();
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }

}
const onPreviousClick = async () => {
    try {
        loader['is-active'] = true;
        await store.setPreviousExperiences();
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }
}
const onPaginationLink = async page => {
    try {
        loader['is-active'] = true;
        await store.setPaginationExperiences(page);
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }
}
//Eliminación
const onDelete = async ref => {
    try {
        loader['is-active'] = true;
        errorOutput.message = '';
        await store.deleteWorkExperience(ref);
        loader['is-active'] = false;
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
    }
}
</script>

<style scoped lang="scss">
ol.list>li:nth-child(2) {
    background-color: rgb(234, 237, 237);
}

.work-experience{
    position: relative;   
}
</style>