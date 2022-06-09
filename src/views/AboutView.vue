<template>
  <div class="section columns is-centered">
    <div class="card column is-half">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="@/assets/programming.jpg" alt="Programación">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img 
                v-if="loadedImg"
                class="is-rounded" 
                :src="url" 
                style="object-fit:cover" 
                :alt="store.getFullName">
              <div v-else class="loader is-loading"></div>
            </figure>
          </div>
          <div class="media-content" v-if="loaded">
            <p class="title is-4">{{ store.getFullName }}
              <time class="title is-6" :datetime="store.getBirhDate">{{ store.getBirhDate }}</time>
            </p>
            <p class="subtitle is-6">{{ store.userProfile.emails[0] }}</p>
          </div>
        </div>
        <div class="content" v-if="loaded">
          {{ store.userProfile.whoami }}
          <div class="tags">
            <span v-for="(title, key) in store.getKnowledge('title')" :key="key" class="tag is-info m-1">{{ title }}</span>
          </div>
        </div>
        <div v-else class="content loader-wrapper">
          <div class="loader is-loading"></div>
        </div>
        <div v-if="error" class="notification is-danger">
          {{ error.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//Libraries
import { useStoreProfile } from '@/stores/profile';
import { ref } from 'vue';
//Obtenemos el store Pinia
const store = useStoreProfile();
const loaded = ref(false);//Carga de texto
const loadedImg = ref(false);//Carga de imagen del profile

const url = ref(null);
const error = ref(false);


(async () => {
  try {
    error.value = false;
    await store.getUserProfile();
    loaded.value = true;
    url.value = await store.getPhotoURL;
    loadedImg.value = true;
    
  } catch (myError) {
    error.value = myError;
  }
})();
</script>

<style lang="scss" scoped>
//LOADER STYLES
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