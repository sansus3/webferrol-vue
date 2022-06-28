<template>
    <div class="container">
        <!-- Trabajos -->
        <div class="home content is-medium p-5">
            <h1 class="title has-text-centered">Portafolio</h1>
            <TheMessage :errorOutput="errores"></TheMessage>
            <div class="m-3" v-if="storeUsers.user">
                <TheUploader @file-emit="fileEmit">
                    <div v-if="isLoading" class="loader is-loading"></div>
                    <span v-else>Cargar imagen ...</span>
                </TheUploader>
            </div>
            <div v-if="store.portfolio.length" class="columns is-multiline">
                <!-- Contenidos -->
                <div class="column is-one-quarter" v-for="(item, index) in store.portfolio" :key="index">
                    <img class="imgPortfolio" :src="item.url" alt=""
                        @click="showModal({ ref: item.ref, url: item.url })">
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
                    <div class="column has-text-right">
                        <button class="button is-rounded is-small is-default" @click="show = false">X</button>
                    </div>
                </div>
            </template>
            <template #body>
                <img style="width: 100%;height: 60vh;object-fit: contain;" :src="image.src" alt="">
                <div v-if="storeUsers.user">
                    <div class="control m-1">
                        <div class="tags has-addons">
                        <span class="tag is-medium is-dark">Referencia</span>
                        <span class="tag is-medium is-success">{{image.ref}}</span>
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
                </div>
            </template>
            <template #footer>
                <div></div>
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
import { uploadBlobFile } from '@/hooks/firebase.cloud.storage';

const store = useStoreProfile();
const storeUsers = useStoreUsers();





const errores = ref({ error: false });
const isLoading = ref(false);
const iskeyDown = ref(false);
const show = ref(false); //Booleano que abre o cierra una ventana modal
const image = ref({src:'',ref:''});
const reference = ref('');



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
    image.value.src = url;
    image.value.ref = ref;
}

const handleDelete = async () => {
    //console.log(item);
    if (!image.value.ref.length)
        return;
    try {
        errores.value = { error: false };
        isLoading.value = true;
        if(image.value.ref!==reference.value)
            throw new Error(`"${reference.value}" no coincide con "${image.value.ref}"`);
        await store.deletePortfolio(image.value.ref);
        store.portfolio = [];
        await store.setPortfolio();
        image.value.src = '';
        image.value.ref = '';
        reference.value = '';
    } catch (error) {
        errores.value = {
            error: true,
            message: error.message
        }
    } finally {
        isLoading.value = false;
        show.value = false;
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