<template>
    <div class="container">
        <!-- Trabajos -->
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Portafolio</h1>
            
            <TheMessage :errorOutput="errores"></TheMessage>
            <div class="m-3">
                <TheUploader @file-emit="fileEmit">
                    <div v-if="isLoading" class="loader is-loading"></div>
                    <span v-else>Cargar imagen ...</span>
                </TheUploader>
            </div>
            <div class="columns is-multiline">
                <!-- Contenidos -->
                <div v-if="store.portfolio.length" class="column is-one-quarter" v-for="(src, index) in store.portfolio" :key="index">
                    <img style="object-fit:cover; width: 100%;min-height: 400px;" :src="src"
                        :alt="`Proyecto ${index + 1}`">
                </div>
                <div v-else class="column">
                    <div class="content loader-wrapper">
                        <div class="loader is-loading"></div>
                    </div>
                </div>
                <!-- Fin contenidos -->
            </div>
        </div><!-- End Trabajos -->
    </div>
</template>

<script setup>
import { useStoreProfile } from '../stores/profile';
import { ref } from 'vue';
import TheUploader from '@/components/TheUploader.vue';
import TheMessage from '@/components/TheMessage.vue';
import { uploadBlobFile } from '@/firebase.cloud.storage';

const store = useStoreProfile();


(async () => {
  await store.setPortfolio();
})();


const errores = ref({error:false});
const isLoading = ref(false);

const fileEmit = async file => {
    if(file){
        console.log(file)
        try {
            errores.value = {error:false};
            isLoading.value = true;
            const snapshot = await uploadBlobFile(file,`proyectos/${file.name}`);
            store.portfolio = [];//reseteo 
            store.setPortfolio();//recarga de fotos
            //console.log(snapshot)
        } catch (error) {
            console.log(error);
            errores.value = {
                error: true,
                message: error.message
            }
        } finally{
            isLoading.value = false;
        }   
    }
}
</script>

<style lang="scss" scoped>
.loader-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    height: 80px;
    width: 80px;
    border-width: 15px;
  }
}
</style>