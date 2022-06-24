<template>
    <div class="section work-experience columns is-multiline">
        <!-- The Loader -->
        <TheLoader :is-active="loader"></TheLoader>
        <!--Pagination-->
        <div class="column is-full">
            <ThePagination @handleNext="onNextClick" @handlePrevious="onPreviousClick"
                @handlePaginationLink="onPaginationLink" :perPage="store.limit" :actualPage="store.actualPage"
                :total="store.total"></ThePagination>

        </div>

        <div v-if="errorOutput.error" class="column title has-text-centered notification is-danger">
            {{ errorOutput.message }}
        </div>
        <div class="column is-one-quarter" v-for="(item, key) in store.workExperiences" :key="key">
            <article class="panel has-background-white"
                :class="{ 'is-success': key % 2 == 0, 'is-info': key % 2 != 0 }">
                <p class="panel-heading notification">
                    {{ item.code }}
                    <button @click="handleModal(item)" class="delete is-small"></button>
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
    </div>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <TheModal :show="show" @close="show = false">
            <template #header>
                <div class="columns">
                    <div class="column has-text-right">
                        <button class="button is-rounded is-small is-default" @click="show = false">X</button>
                    </div>
                </div>
            </template>
            <template #body>
                <div class="notification is-warning">
                    ¿Desea eliminar esta experiencia <strong>{{experience?.jobTitle}}</strong> (código: {{experience?.code}})"?
                </div>
                <div class="control m-1">
                    <div class="tags has-addons">
                    <span class="tag is-medium is-dark">Referencia</span>
                    <span class="tag is-medium is-success">{{experience.ref}}</span>
                    </div>
                </div>                
                <div class="field is-grouped">
                    <p class="control is-expanded" :class="{'is-loading':iskeyDown}">
                        <input 
                            @keydown="iskeyDown=true" 
                            @keyup="iskeyDown=false" 
                            v-model.trim="reference" 
                            class="input" type="text" placeholder="Escribe la referencia para eliminar">
                    </p>
                    <p class="control">
                        <button 
                            @click="handleDelete" 
                            :disabled="!reference.length"
                            class="button is-danger"
                        >
                            Eliminar
                        </button>
                    </p>
                </div>
            </template>
            <template #footer>                
                <div class="notification is-danger" v-if="referenceError.length">{{referenceError}}</div>
                <div v-else></div>
            </template>
        </TheModal>
    </Teleport>
</template>

<script setup>
//Dependencies
import { useStoreProfile } from '@/stores/profile';
import { reactive, ref } from 'vue';
import ThePagination from '@/components/ThePagination.vue';
import TheLoader from '@/components/TheLoader.vue';
import TheModal from '@/components/TheModal.vue';
//hook de funciones
import { getDayMonthFullYear } from "@/hooks/getters";
//Variables
const loader = reactive({ 'is-active': false });
const iskeyDown = ref(false);
const reference = ref('');
const referenceError = ref('');
const errorOutput = reactive({
    error: false,
    message: ''
});
const show = ref(false);
const experience = ref(null);
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
const handleModal = item => {
    errorOutput.message = '';
    referenceError.value = "";
    show.value = true;
    experience.value = item;
    //console.log(experience.value.ref)
}
const handleDelete = async () => {
    referenceError.value = "";
    if(experience.value.ref!==reference.value){
        referenceError.value = `"${reference.value}" no coincide con "${experience.value.ref}"`;
        return;
    }
    try {
        if(experience.value===null)
            throw new Error("Identificador vacío");
        //console.log(experience.value)
        await store.deleteWorkExperience(experience.value.ref);
        loader['is-active'] = false;
        experience.value = null;
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    } finally {
        loader['is-active'] = false;
        show.value = false;
    }
}
</script>

<style scoped lang="scss">
ol.list>li:nth-child(2) {
    background-color: rgb(234, 237, 237);
}

.work-experience {
    position: relative;
}
</style>