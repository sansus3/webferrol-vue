<template>
    <div class="work-experience content is-medium p-5">
        <h1 class="title has-text-centered">
            Editar experiencia
        </h1>
        <FormWorkExperience 
        :form="form"
        :alerts="alerts"
        @handleSubmit="handleSubmit" button="Actualizar Experiencia"></FormWorkExperience>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { useDB } from '@/hooks/firestore';
import { getFullYearMonthDay } from '@/hooks/general.functions';
import FormWorkExperience from '@/components/forms/FormWorkExperience.vue';
import { useStoreProfile } from '@/stores/profile';
//Inicializamos Route
const route = useRoute();
const store = useStoreProfile();
//Obtención de los datos
const { getDocument,updateDocument } = useDB('workExperience');

//Valores del formulario
const form = reactive({
    code: '',
    jobTitle: '',
    title: '',
    place: '',
    timeRef:'',//Este campo no se encuentra en la inserción de datos es donde se crea
    province: 'Coruña',
    dateStart: '',
    dateEnd: '',
});
//Alertas o mensajes enviados al formulario
const alerts = reactive({
    isLoading: false,//Mientras se realiza una transacción
    error: false,//Mensajes de errores
});
getDocument(route.params.ref).then(
    response => {
         alerts.error = false;       
        //console.log(response);
        if(response?.response)
            throw new Error(response.error.message);
        form.code = response.data.code;
        form.timeRef = response.data?.timeRef??Date.now();
        form.jobTitle = response.data.jobTitle;
        form.title = response.data.title;
        form.place = response.data.place;
        form.province = response.data.province;
        form.dateStart = getFullYearMonthDay(response.data.dateStart,"-");
        form.dateEnd = getFullYearMonthDay(response.data.dateEnd,"-");
    }).catch(error=>{
        alerts.error = error.message;
    });

//Actualización
const handleSubmit = async () => {
    try {
        alerts.isLoading=true;
         alerts.error = false;
        const data = dateConfiguration(); 
        const response = await updateDocument(route.params.ref,data);
        if(response?.response)
            throw new Error(response.error.message);
        //Reiniciamos paginación
        store.workExperiences = [];
        store.total = 0;
        store.actualPage = 1;
    } catch (error) {
        alerts.error = error.message;
    }  finally {
         alerts.isLoading=false;  
    }  
}

const dateConfiguration = () => {
    const data = {...form};
    const from = data.dateEnd.split('-');
    data.dateEnd = new Date(from[0], Number(from[1]) - 1, from[2]);
    if (data.dateStart && form.dateStart.length) {
        const from = data.dateStart.split('-');
        data.dateStart = new Date(from[0], Number(from[1]) - 1, from[2]);
    }
    return data;
}

</script>
<style scoped>
.work-experience {
  margin: 0 auto;
  width: 80vw;
  max-width: 900px;
}
</style>