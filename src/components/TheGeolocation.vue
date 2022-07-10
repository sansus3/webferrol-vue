<template>

    <div class="field">
        <label for="latitud" class="form-label required">
            Latitude
            <span data-set="Campo obligatorio" class="text-danger">*</span>
        </label>
        <input id="latitud" required name="latitud" v-model.number="location.lat" type="number" step="any"
            placeholder="43.5060736" class="field__control form-control" />
        <strong v-if="!location.lat" class="alert alert-danger" role="alert">Debe escoller unha
            latitude</strong>
    </div>


    <div class="field">
        <label for="longitude" class="form-label required">
            Lonxitude
            <span data-set="Campo obligatorio" class="text-danger">*</span>
        </label>
        <input id="longitude" required name="longitude" v-model.number="location.lng" step="any" type="number"
            placeholder="-8.2051072" class="field__control form-control" />
        <strong v-if="!location.lng" class="alert alert-danger" role="alert">Debe escoller unha lonxitude
        </strong>
    </div>



    <input type="button"  
        class="btn btn-primary"
        @click="handleGetCoords"
        :value="loading ? 'Cargando...' : 'Geolocalización automática'" :disabled="loading" />
    
    <strong v-if="error.error" class="alert alert-danger" role="alert">
        ({{ error.code }}) {{ error.message }}
    </strong>
    <!-- Google maps -->
    <TheGeolocationGoogleMaps></TheGeolocationGoogleMaps>
</template>

<script setup>
//Deependencias
import { ref, inject, provide } from "vue";
import TheGeolocationGoogleMaps from "./TheGeolocationGoogleMaps.vue";
/**
 * Esta constante no la podemos utilizar en defineProps por el @error "error  Unexpected mutation of ..." debido a que las propiedades no son mutables o variables y en este caso la utilizamos con la directiva v-model. Por tanto nos decantamos por inject. Otra solución sería utilizar defineEmits o computed
 * @type {Object} location: { latitude: Number, longitude: Number }
 * @description Objeto con las propiedades de latitud y longitud para geolocalizar un elemento. Tiene que tener el formato descrito en el @type
 */
const location = inject('location');
provide('location',location);

//Mensajes para información de errores y tiempo de espera
const error = ref({
    error: false,
    code: null,
    message: '',
});
let loading = ref(false);
/**
 * Obtención de coordenadas a través del objeto navigator.geolocation
 * Utilizamos una promesa para garantizar la espera de los datos antes de una llamada que tenga que esperar los datos
 * @return {Object} { lat: Number, lng: Number} Coordenadas de latitud y longitud
 */
const getCoords = async () => {

    const pos = await new Promise((resolve, reject) => {
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
         * Syntax:
         * getCurrentPosition(success)
         * getCurrentPosition(success, error)
         * getCurrentPosition(success, error, options)
         */
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
                /**
                 * @type {Number} maximumAge - A positive long value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device must return a cached position regardless of its age. Default: 0.
                 * @type {Number} timeout - A positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position.
                 * @type {Boolean} enableHighAccuracy - A boolean value that indicates the application would like to receive the best possible results. If true and if the device is able to provide a more accurate position, it will do so.
                 * @url https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
                 */
                maximumAge: 60000,
                timeout: 10000,
                enableHighAccuracy: true
            }
        );
    });
    return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
    };
}
/**
 * Cargamos las coordenadas en el objeto reactivo pasado por el padre
 * location {latidude,longitude}
 */
const handleGetCoords = async () => {
    error.value.error = false;
    loading.value = true;
    try {
        if (!window.navigator.geolocation)
            throw new Error('La Geolocalización no está disponible');
        // Coordenadas actuales
        let { latitude, longitude } = await getCoords();
        //Cargamos los valores del formulario
        location.lat = latitude;
        location.lng = longitude;
    } catch (err) {
        error.value.error = true;
        error.value.code = err.code;
        error.value.message = err.message;
    } finally {
        loading.value = false;
    }
}
</script>