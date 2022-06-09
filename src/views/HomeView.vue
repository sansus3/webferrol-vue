<template>
  <div class="container">
    <ConceptosVueView></ConceptosVueView>
    <ConceptosFirebaseView></ConceptosFirebaseView>
    <!-- Trabajos -->
    <div class="home content is-medium p-5">
      <h1 class="title has-text-centered">Cloud Storage</h1>
      <div class="columns is-multiline">
        <!-- Contenidos -->
        <div v-if="files.length" class="column is-one-quarter" v-for="(src, index) in files" :key="index">
          <img style="object-fit:cover; width: 100%;min-height: 400px;" :src="src" :alt="`Proyecto ${index + 1}`">
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
import { listAllUrls } from '@/firebase.cloud.storage';
import { ref } from 'vue';
import ConceptosVueView from '@/views/public/ConceptosVueView.vue';
import ConceptosFirebaseView from '@/views/public/ConceptosFirebaseView.vue';
const files = ref([]);
(async () => {
  files.value = await listAllUrls('proyectos');
})();
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