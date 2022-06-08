<template>
  <div class="container">
    <!-- Conceptos vue -->
    <div class="home content is-medium p-5">
      <h1 class="title has-text-centered">Conceptos Vue</h1>
      <div class="columns is-multiline">
        <!-- Contenido 1 -->
        <div class="column is-one-third">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-info">
                <div class="content">
                  <p class="title">provide/inject</p>
                  <a class="subtitle" href="https://vuejs.org/guide/components/provide-inject.html" target="_blank">
                    Permite comunicación entre componentes padres e hijos</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Contenido 2 -->
        <div class="column is-one-third">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <div class="content">
                  <p class="title">Firebase: Storage</p>
                  <a class="subtitle" href="https://firebase.google.com/docs/storage/web/start?hl=es&authuser=0"
                    target="_blank">
                    Gestiona ficheros, imágenes en el Cloud Storage ...</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Contenido 3 -->
        <div class="column is-one-third">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-danger">
                <div class="content">
                  <p class="title">defineProps/defineEmits</p>
                  <a class="subtitle" href="https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits" target="_blank">
                    Comunicación entre componentes.</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Contenido 4 -->
        <div class="column is-half">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <div class="content">
                  <p class="title">Vue Router</p>
                  <a class="subtitle" href="https://router.vuejs.org/guide/advanced/meta.html" target="_blank">
                    Route Meta Fields: Autentificación de usuario/s para acceso a contenidos</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Contenido 5 -->
        <div class="column is-half">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-link">
                <div class="content">
                  <p class="title">vue-fontawesome</p>
                  <a class="subtitle" href="https://github.com/FortAwesome/vue-fontawesome" target="_blank">
                    Font Awesome 5 Vue component using SVG with JS</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div><!-- End Conceptos vue -->



    <!-- Firebase -->
    <div class="home content is-medium p-5">
      <h1 class="title has-text-centered">Conceptos Firebase</h1>
      <div class="columns is-multiline">
        <!-- Contenido 1 -->
        <div class="column is-one-third">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-warning">
                <div class="content">
                  <p class="title">Firebase: usuarios</p>
                  <a class="subtitle" href="https://firebase.google.com/docs/auth/web/manage-users" target="_blank">
                    Administra usuarios en Firebase: creación, gestión, eliminación...</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Fin contenido 1 -->
        <!-- Contenido 2 -->
        <div class="column is-one-third">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <div class="content">
                  <p class="title">Firebase: Storage</p>
                  <a class="subtitle" href="https://firebase.google.com/docs/storage/web/start?hl=es&authuser=0"
                    target="_blank">
                    Gestiona ficheros, imágenes en el Cloud Storage ...</a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Fin contenido 2 -->
        <!-- Contenido 3 -->
        <div class="column is-one-third">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-info">
                <div class="content">
                  <p class="title">Cloud Firestore</p>
                  <a class="subtitle" href="https://firebase.google.com/docs/firestore"
                    target="_blank">
                    Base de datos NoSQL flexible, escalable y en la nube </a>
                  <div class="content">
                    <!-- Content -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <!-- Fin contenido 3 -->
      </div>
    </div><!-- End Firebase -->

    <!-- Trabajos -->
    <div class="home content is-medium p-5">
      <h1 class="title has-text-centered">Cloud Storage</h1>
      <div class="columns is-multiline">
        <!-- Contenido 1 -->
        <div v-if="files.length" class="column is-one-quarter" v-for="(src, index) in files" :key="index">
          <img style="object-fit:cover; width: 100%;min-height: 400px;" :src="src" :alt="`Proyecto ${index + 1}`">
        </div>
        <div v-else class="column">
          <div class="content loader-wrapper">
            <div class="loader is-loading"></div>
          </div>
        </div>
        <!-- Fin contenido 1 -->
      </div>
    </div><!-- End Trabajos -->
  </div>
</template>

<script setup>
import { listAllUrls } from '@/firebase.cloud.storage';
import { ref } from 'vue';
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