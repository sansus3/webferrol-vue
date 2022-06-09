<template>
    <div class="section work-experience columns is-multiline">
        <div v-if="errorOutput.error" class="column title has-text-centered notification is-danger">
            {{ errorOutput.message }}
        </div>
        <div class="column is-one-quarter" v-for="(item, key) in store.workExperiences" :key="key">
            <article class="panel has-background-white"
                :class="{ 'is-success': key % 2 == 0, 'is-info': key % 2 != 0 }">
                <p class="panel-heading">

                    {{ item.code }}
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
import { ref, reactive } from 'vue';
//hook de funciones
import { getDayMonthFullYear } from "@/hooks/getters";
//Variables
const loading = ref(false);
const errorOutput = reactive({
    error: false,
    message: ''
});
//lanzamos el store
const store = useStoreProfile();
//Lanzamos la promesa
(async () => {
    try {
        loading.value = true;
        await store.getExperiences();        
    } catch (error) {
        console.log('Error en fichero WorkExperience.ve', error);
        errorOutput.error = true;
        errorOutput.message = error.message;

    } finally {
        loading.value = false;
    }
})()
</script>

<style scoped>
ol.list>li:nth-child(2) {
    background-color: rgb(234, 237, 237);
}

.container_spinner {
    text-align: center;
    font-size: 20vw;
    color: orange
}
</style>