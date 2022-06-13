<template>
    <div class="file has-name is-fullwidth">
        <label class="file-label">
            <input 
                @change="fileChange($event)" 
                :accept="accept"
                :multiple="multiple"
                class="file-input" type="file" name="resume">
            <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    <slot>Choose a file…</slot>
                </span>
            </span>
            <span class="file-name">
                {{ fileName }}
            </span>
        </label>
    </div>
</template>
<script setup>
import { isEmpty } from "@firebase/util";
import { ref } from 'vue';
const fileName = ref('');

defineProps({
    /**
     * @type {String} accept - Tipo de ficheros que se admite subir
     * @type {Boolean} multiple - Si se permite subir múltiples ficheros
     */
    accept: {
        type: String,
        default: "image/gif, image/jpeg, image/png",
    },
    multiple: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(['fileEmit']);
/**
* Esta función emite/envía a su componente padre un array de objetos de tipo File
* @param {Object} event Evento onchange de seleccionar una imagen
*/
const fileChange = (event) => {
    //Campturamos el file
    const files = event.target.files;//Array FileList
    if (isEmpty(files) || files.length === 0) {
        fileName.value = '';
        return;
    } else {
        const names = [...files].map(element => element.name);
        fileName.value = names.join();
        emits('fileEmit',[...files]);
    }
}

</script>