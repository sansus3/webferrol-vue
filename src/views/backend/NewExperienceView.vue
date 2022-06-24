<template>
  <div class="work-experience content is-medium p-5">
    <h1 class="title has-text-centered">
      Crear experiencia
    </h1>
    <FormWorkExperience @handleSubmit="handleSubmit"></FormWorkExperience>
  </div>
</template>
<script setup>
import { reactive, provide } from 'vue';
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
provide('form',form);
//Manipulación de errores
const errorOutput = reactive({
  error: false,
  message: ''
});
provide('errorOutput',errorOutput);
//Spinner
const spinner = reactive({
  'is-loading': false
});
provide('spinner',spinner);

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
  //Limpiamos los mensajes de error
  errorOutput.error = false;
  errorOutput.message = '';
  try {
    spinner['is-loading']=true;    
    const response = await store.insertWorkExperience({...form});
    if(response?.response)
      throw new Error(response.error.message);
    store.workExperiences = []; //Para cuando entremos en el array recargue el contenido
    reloadForm();    
    router.push({name:'workexperiences'});
  } catch (error) {
    errorOutput.error = true;
    errorOutput.message = error.message;
  } finally {
    spinner['is-loading']=false;
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