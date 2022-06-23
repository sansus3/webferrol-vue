<template>
  <div class="container">
    <ConceptosVueView></ConceptosVueView>
    <ConceptosFirebaseView></ConceptosFirebaseView>
    <ComponentsVueView></ComponentsVueView>
    <!-- Trabajos -->
    <div class="home content is-medium p-5">
      <h1 class="title has-text-centered">Cloud Storage</h1>
        <!-- Contenidos -->
        <viewer 
            :images="files" 
            @inited="inited" 
            class="viewer" 
            ref="viewer">
            <div class="columns is-multiline">            
              <div class="column is-one-quarter" v-for="src in files" :key="src.url">
                <img style="object-fit:cover; width: 100%;min-height: 400px;"  :src="src.url">
              </div>           
            </div>
        </viewer>       
        <!-- Fin contenidos -->      
    </div><!-- End Trabajos -->
  </div>
</template>

<script setup>
import { listAllUrls } from '@/firebase.cloud.storage';
import { ref } from 'vue';
import ConceptosVueView from '@/views/public/ConceptosVueView.vue';
import ConceptosFirebaseView from '@/views/public/ConceptosFirebaseView.vue';
import ComponentsVueView from '@/views/public/ComponentsVueView.vue';
import { component as Viewer } from "v-viewer"


const files = ref([]);


(async () => {
  files.value = await listAllUrls('proyectos');
})();

//Evento generado en viewer. Ver etiqueta del componente
//Inicializa Viewer
let v = null;
const inited = viewer => {
  v = viewer;
  //console.log(v)
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