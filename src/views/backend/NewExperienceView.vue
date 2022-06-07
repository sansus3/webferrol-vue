<template>
  <div class="work-experience content is-medium p-5">
    <h1 class="title has-text-centered">
      Crear experiencia
    </h1>
    <form action="#" id="myForm" @submit.prevent="insertExperience">
      <ul>
        <li class="field">
          <label for="code" class="label">Control*</label>
          <div class="control">
            <input required v-model.trim="form.code" id="code" class="input"
              :class="form.code.length ? 'is-success' : ''" type="text" placeholder="daw-123">
          </div>
        </li>
        <li class="field">
          <label for="title" class="label">Título*</label>
          <div class="control">
            <input required v-model.trim="form.title" id="title" class="input"
              :class="form.title.length ? 'is-success' : ''" type="text"
              placeholder="Diseñador de páginas WEB">
          </div>
        </li>
        <li class="field">
          <label for="jobTitle" class="label">Título profesional*</label>
          <div class="control">
            <input required v-model.trim="form.jobTitle" id="jobTitle" class="input"
              :class="form.jobTitle.length ? 'is-success' : ''" type="text"
              placeholder="Profesor, programador ...">
          </div>
        </li>
        <li class="field">
          <label for="place" class="label">Lugar*</label>
          <div class="control">
            <input required v-model.trim="form.place" id="place" class="input"
              :class="form.place.length ? 'is-success' : ''" type="text" placeholder="Rue del Percebe 13">
          </div>
        </li>
        <li class="field">
          <label for="province" class="label">Provincia</label>
          <div class="control">
            <div class="select">
              <input list="provinces" v-model.trim="form.province" id="province" class="input"
                :class="form.province.length ? 'is-success' : ''" type="text" placeholder="Coruña">
              <datalist id="provinces">
                <option value="Coruña"></option>
                <option value="Lugo"></option>
                <option value="Ourense"></option>
                <option value="Pontevedra"></option>
              </datalist>
            </div>
          </div>
        </li>
        <li class="columns">
          <div class="column field">
            <label for="dateStart" class="label">Fecha de inicio</label>
            <div class="control">
              <input v-model="form.dateStart" id="dateStart" class="input" type="date">
            </div>
          </div>

          <div class="column field">
            <label for="dateEnd" class="label">Fecha de fin*</label>
            <div class="control">
              <input required v-model="form.dateEnd" id="dateEnd" class="input" type="date">
            </div>
          </div>
        </li>
      </ul>
      <div class="has-text-centered">
        <message-danger :errorOutput="errorOutput"></message-danger>
        <button :disabled="disabled" class="button is-link" :class="isLoading">Nueva experiencia</button>       
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useStoreProfile } from '@/stores/profile';
import MessageDanger from '@/components/MessageDanger.vue';
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
const reloadForm = () => {
  form.code = '',
  form.jobTitle = '',
  form.title = '',
  form.place = '',
  form.province = 'Coruña',
  form.dateStart = '',
  form.dateEnd = ''
}
const errorOutput = reactive({
  error: false,
  message: ''
});
const isLoading = reactive({
  'is-loading': false
});
const disabled = computed(() => !form.code.length || !form.jobTitle.length || !form.title.length || !form.place.length || !form.dateEnd.length);



//Cargamos el store
const store = useStoreProfile();


const insertExperience = async () => {
  //Limpiamos los mensajes de error
  errorOutput.error = false;
  errorOutput.message = '';
  try {
    isLoading['is-loading']=true;    
    await store.insertWorkExperience({...form});
    reloadForm();
  } catch (error) {
    errorOutput.error = true;
    errorOutput.message = error.message;
  } finally {
    isLoading['is-loading']=false;
  }
}
</script>
<style scoped>
.work-experience {
  margin: 0 auto;
  width: 80vw;
  max-width: 900px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}
</style>