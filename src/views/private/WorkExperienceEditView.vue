<template>
    <div class="work-experience content is-medium p-5">
        <h1 class="title has-text-centered">
            Editar experiencia
        </h1>
        <FormWorkExperience @handleSubmit="handleSubmit" button="Actualizar Experiencia"></FormWorkExperience>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { reactive, provide } from 'vue';
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
    province: 'Coruña',
    dateStart: '',
    dateEnd: '',
});
provide('form', form);
//Manipulación de errores
const errorOutput = reactive({
    error: false,
    message: ''
});
provide('errorOutput', errorOutput);
//Spinner
const spinner = reactive({
    'is-loading': false
});
provide('spinner', spinner);




getDocument(route.params.ref).then(
    response => {
        //console.log(response);
        if(response?.response)
            throw new Error(response.error.message);
        form.code = response.data.code;
        form.jobTitle = response.data.jobTitle;
        form.title = response.data.title;
        form.place = response.data.place;
        form.province = response.data.province;
        form.dateStart = getFullYearMonthDay(response.data.dateStart,"-");
        form.dateEnd = getFullYearMonthDay(response.data.dateEnd,"-");
    }
).catch(error=>{
    errorOutput.error = true;
    errorOutput.message = error.message;
});

//Actualización
const handleSubmit = async () => {
    try {
        spinner['is-loading']=true;
        const data = dateConfiguration(); 
        const response = await updateDocument(route.params.ref,data);
        if(response?.response)
            throw new Error(response.error.message);
        //Reiniciamos paginación
        store.workExperiences = [];
        store.total = 0;
        store.actualPage = 1;
    } catch (error) {
        errorOutput.error = true;
        errorOutput.message = error.message;
    }  finally {
         spinner['is-loading']=false;  
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