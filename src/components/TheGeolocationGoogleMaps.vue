<template>
    <div v-if="error.error" class="alert alert-danger m-3" role="alert">
    {{error.code}} ---> {{error.message}}
    </div>
    <div v-else data-set="data" ref="mapDiv" style="margin:.5em 0;width: 100%; height: 50vh; "></div>
</template>

<script setup>
//Dependencies
import { ref,inject } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
 //Props
const props = defineProps({
    google_maps_api_key: {
        type: String,
        default: "AIzaSyAIoIZPEpf-sWgO6z285Afba4FADowz5Xk",
    },
});
const location = inject('location');
//Lanzamiento asíncrona
/**
 * Función asíncrona que lanza el lodader 
 */
//let geolocationBool = ref(false);
const error = ref({
    error: false,
    code: null,
    message: '',
});
const mapDiv = ref(null);
let map, infoWindow, marker;

const loader = new Loader({ apiKey: props.google_maps_api_key });


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
        lng: pos.coords.longitude,
        lat: pos.coords.latitude,
    };
}


//Función callback anónima y lanzada automáticamente
(async () => {
    try {
        // Inciamos loader de Google
        if (!loader.loading)
            await loader.load();
        // Coordenadas actuales
        let { lat, lng } = await getCoords();
        //Cargamos los valores del formulario
        location.lat = lat;
        location.lng = lng;
        //cargamos mapa y colocamos valores
        map = new google.maps.Map(mapDiv.value, {
            center: {
                lat: lat, lng: lng
            },
            zoom: 12,
        });
        //Cargamos marcador
        marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: {
                lat: lat,
                lng: lng
            },
            icon: './googlemaps128x128.png',
        });
        // Agregamos el listener para capturar el click y movimiento del marcador
        marker.addListener("click", function () {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        });
        // Capturamos cuando la posición del marcador cambie y realizamos la acción que se requiera
        google.maps.event.addListener(marker, "position_changed", function () {
            var lat = marker.getPosition().lat();
            var lng = marker.getPosition().lng();

            // console.log('Latitude: ' + lat);
            // console.log('Longitude: ' + lng);

            //Pintamos en el formulario
            location.lat = lat;
            location.lng = lng;

        });
        infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition({ lat, lng });
        infoWindow.setContent(`Latitude: ${lat}|Lonxitude: ${lng}.<br> Despraze o marcador para un mellor axuste.`);
        infoWindow.open(map);
    } catch (err) {
        //console.log(error);
        error.value.error = true;
        error.value.code = err.code;
        error.value.message = err.message;
    }
})();  
</script>