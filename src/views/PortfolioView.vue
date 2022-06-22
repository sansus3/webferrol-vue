<template>
    <div class="container">
        <!-- Trabajos -->
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Portafolio</h1>
            <TheMessage :errorOutput="errores"></TheMessage>
            <div class="m-3" v-if="storeUsers.isLogged">
                <TheUploader @file-emit="fileEmit">
                    <div v-if="isLoading" class="loader is-loading"></div>
                    <span v-else>Cargar imagen ...</span>
                </TheUploader>
            </div>
            <div v-if="store.portfolio.length" class="columns is-multiline">
                <!-- Contenidos -->
                <div class="column is-one-quarter" v-for="(item, index) in store.portfolio" :key="index">
                    <img class="imgPortfolio" :src="item.url" alt="" @click="showModal({ ref: item.ref, url: item.url })">
                </div>
                <!-- Fin contenidos -->
            </div>
            <div v-else class="columns">
                <div class="column is-full">
                    <div class="content loader-wrapper">
                        <div class="loader is-loading"></div>
                    </div>
                </div>
            </div>
        </div><!-- End Trabajos -->
    </div>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <TheModal :show="show" @close="show = false">
            <template #header>
                <div class="columns">
                    <h3 class="column">Portafolio</h3>
                    <div class="column has-text-right" v-if="storeUsers.isLogged">
                        <button class="button is-small is-danger" @click="handleDelete">Eliminar</button>
                    </div>
                </div>
            </template>
            <template #body>
                <img style="width: 100%;height: 60vh;object-fit: contain;" :src="source" alt="">
            </template>
        </TheModal>
    </Teleport>
</template>

<script setup>
import { useStoreProfile } from '../stores/profile';
import { useStoreUsers } from '../stores/users';
import { ref } from 'vue';
import TheUploader from '@/components/TheUploader.vue';
import TheMessage from '@/components/TheMessage.vue';
import TheModal from '@/components/TheModal.vue';
import { uploadBlobFile } from '@/firebase.cloud.storage';

const store = useStoreProfile();
const storeUsers = useStoreUsers();





const errores = ref({ error: false });
const isLoading = ref(false);
const show = ref(false); //Booleano que abre o cierra una ventana modal
const source = ref("");
let item = null;



try {
    errores.value = { error: false };
    store.setPortfolio();
} catch (error) {
    errores.value = {
        error: true,
        message: error.message
    }
}
/**
 * Función que carga una ventana modal
 * @param {String} src - Ruta de la imagen que cargar en el modal
 */
const showModal = ({ ref, url }) => {
    show.value = true;
    source.value = url;
    item = { ref, url }
}

const handleDelete = async () => {
    //console.log(item);
    if (!item)
        return;
    try {
        errores.value = { error: false };
        isLoading.value = true;
        await store.deletePortfolio(item.ref);
        store.portfolio = [];
        await store.setPortfolio();
        item = null;
    } catch (error) {
        errores.value = {
            error: true,
            message: error.message
        }
    } finally {
        isLoading.value = false;
        show.value = false;
        source.value = '';
    }

}

const fileEmit = async ([file]) => {//destructuring
    if (file) {
        //console.log(file)
        try {
            errores.value = { error: false };
            isLoading.value = true;
            const snapshot = await uploadBlobFile(file, `proyectos/${file.name}`);
            store.portfolio = [];//reseteo 
            store.setPortfolio();//recarga de fotos
            //console.log(snapshot)
        } catch (error) {
            //console.log(error);
            errores.value = {
                error: true,
                message: error.message
            }
        } finally {
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
        height: 10vw;
        width: 10vw;
        border-width: .8em;
    }
}

.imgPortfolio {
    object-fit: cover;
    width: 100%;
    min-height: 400px;
    cursor: pointer;
}
</style>