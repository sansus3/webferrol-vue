<template>
  <div class="work-experience content is-medium p-5">
    <h1 class="title has-text-centered">
      Crear experiencia
    </h1>
    <FormWorkExperience :alerts="alerts" :form="form" @handleSubmit="handleSubmit"></FormWorkExperience>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useStoreProfile } from '@/stores/profile';
import { useRouter } from 'vue-router';
import FormWorkExperience from '@/components/forms/FormWorkExperience.vue';

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

//Alertas o mensajes enviados al formulario
const alerts = reactive({
    isLoading: false,//Mientras se realiza una transacción
    error: false,//Mensajes de errores
});

//Recarga del formulario para limpiarlo
const reloadForm = () => {
  form.code = '',
  form.jobTitle = '',
  form.title = '',
  form.place = '',
  form.province = 'Coruña',
  form.dateStart = '',
  form.dateEnd = ''
}
//Cargamos el store y router
const store = useStoreProfile();
const router = useRouter();


const handleSubmit = async () => {
  try {
    alerts.isLoading = true;
    alerts.error = false;  
    const response = await store.insertWorkExperience({...form});
    if(response?.response)
      throw new Error(response.error.message);
    store.workExperiences = []; //Para cuando entremos en el array recargue el contenido
    store.total = 0;
    store.actualPage = 1;
    reloadForm();    
    router.push({name:'workexperiences'});
  } catch (error) {
    alerts.error = error.message;
  } finally {
    alerts.isLoading = false;
  }
}
</script>
<style scoped>
.work-experience {
  margin: 0 auto;
  width: 80vw;
  max-width: 900px;
}
</style>