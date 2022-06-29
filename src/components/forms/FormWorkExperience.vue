<template>
    <form action="#" id="myForm" @submit.prevent="handleSubmit">
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
            <article class="message m-3 is-danger" v-if="alerts.error">
                <div class="message-header">
                    <p>Error</p>
                </div>
                <div class="message-body">
                    {{ alerts.error }}
                </div>
            </article>  
            <button :disabled="disabled" class="button is-link" :class="{'is-loading':alerts.isLoading}">{{button}}</button>
        </div>
    </form>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    button:{
        type:String,
        default: 'Nueva experiencia'
    },
    form:{
        type: Object
    },
    alerts:{
        type: Object,
        default: () => ({
            isLoading: false,
            error: false,
        })
    }
});


const emits = defineEmits(['handleSubmit']);


const disabled = computed(() => !props.form.code.length || !props.form.jobTitle.length || !props.form.title.length || !props.form.place.length || !props.form.dateEnd.length);

const handleSubmit = async () => {
   emits('handleSubmit');
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
</style>