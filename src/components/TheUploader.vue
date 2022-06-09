<template>
    <div class="file has-name is-fullwidth">
        <label class="file-label">
            <input 
                @change="fileChange($event)" 
                :accept="accept"
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
     * 
     * @type {String} accept - Tipo de ficheros que se admite subir
     */
    accept: {
        type: String,
        default: "image/gif, image/jpeg, image/png",
    },
});
const emits = defineEmits(['fileEmit']);
/**
* Esta función emite una función para comunicarse con su componente padre y le pasará un objeto con el identificador y el fichero seleccionado o null si no se selecciona nada
* @param {Object} event Evento onchange de seleccionar una imagen
*/
const fileChange = (event) => {
    //Campturamos el file
    const files = event.target.files;//Array FileList
    if (isEmpty(files) || files.length === 0) {
        fileName.value = '';
        return;
    } else {
        //console.log(files)
        const { name } = files[0];
        fileName.value = name;
        emits('fileEmit',files[0]);
    }
}

</script>