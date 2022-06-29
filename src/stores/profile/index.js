import { defineStore } from "pinia";
import { getURL, listAllUrls,deleteFile } from '@/hooks/firebase.cloud.storage';
import { initPage,nextPage,previousPage,totalPages,seekItemPage,limitPage } from "@/hooks/pagination.firestore";
import { useDB,getDocsArray } from "@/hooks/firestore";

export const useStoreProfile = defineStore({
    /**
     * Propiedad que es un identificador solicitado por Pinia para la definción del store
     * @type {String} id - Identificador
     */
    id: 'profile',
    state: () => ({
        /**
         * Propiedad donde almacenamos los objetos de firestore que se correponde con cada una de las experiencias laborales
         * @type {Array} workExperiences - 
         */
        workExperiences: [],
        limit: 4, //Items por página
        total: 0,
        actualPage: 1, //contador 
        /**
         * Propiedad donde almacenamos información personal de usuario
         * @type {Object|null} userProfile - {name, firstSurname, secondSurname, birth, whoami}
         */
        userProfile: null,
        portfolio: [],
    }),
    actions: {
        /**
         * Cargamos en la propieda portfolio las urls de las imágenes que se encuentran en Cloud Store de la ruta "proyectos"
         */
        async setPortfolio() {
            if (this.portfolio.length === 0)
                this.portfolio = await await listAllUrls('proyectos');
        },
        async deletePortfolio(ref){
            await deleteFile(ref);
        },
        /**
         * Función para almacenar el total de páginas de las experiencias ordenadas por fecha de inicio
         */
        async setTotalExperiences(){
            this.total = await totalPages("workExperience");
        },
        /**
         * Cargamos un array de objetos (documents) de la collection "workExperience" en la propiedad "workExperiences". Comienza aquí la sección de paginación
         * @link https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=0
         * @link https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         */
        async setExperiences() {
            if (this.workExperiences.length)
                return;
            const querySnapshot = await initPage("workExperience","dateEnd",this.limit);
            this.lastWorkExperiences = querySnapshot.docs[querySnapshot.docs.length-1]; 
            this.workExperiences =  getDocsArray(querySnapshot);
        },
        /**
         * Paginar la página posteriores de las experiencias laborales
         */
        async setNextExperiences() {            
            if(!this.workExperiences.length)
                return;
            //Actualizamos índice de la página
            this.actualPage++;
            //Buscamos último documento del array                               
            const lastWorkExperiences = await seekItemPage("workExperience", this.workExperiences[this.workExperiences.length-1].ref);
            //console.log(lastWorkExperiences)   
            // Construct a new query starting at this document
            const querySnapshot = await nextPage("workExperience",'dateEnd',lastWorkExperiences,this.limit);
            this.workExperiences =  getDocsArray(querySnapshot);  
        },
        /**
         * Paginar la página previas de las experiencias laborales
         */
        async setPreviousExperiences() {
            this.actualPage--;
            //Obtenemos el primer elemento doc mostrado en la paginación
            const lastWorkExperiences = await seekItemPage("workExperience", this.workExperiences[0].ref);;           
            // Construct a new query starting at this document
            const querySnapshot = await previousPage("workExperience",'dateEnd',lastWorkExperiences,this.limit);
            this.workExperiences =  getDocsArray(querySnapshot);
        },
         /**
         * Paginar Una página concreta de las experiencias laborales
         */
        async setPaginationExperiences(page){
            const newLimit = page*this.limit;
            const index = (this.limit*page)-this.limit-1;
            if(index<0){
                this.workExperiences = [];
                this.actualPage = page;
                await this.setExperiences();
                return;
            }
           
            let querySnapshot = await limitPage("workExperience","dateEnd",newLimit);
            
            const last = querySnapshot.docs[index];
            const lastWorkExperiences = await seekItemPage("workExperience", last.id);
            //this.lastWorkExperiences = querySnapshot.docs[querySnapshot.docs.length-1];
            // Construct a new query starting at this document
            querySnapshot = await nextPage("workExperience",'dateEnd',lastWorkExperiences,this.limit);
            this.actualPage = page;
            //Cargamos el array a partir de una consulta querySnapshot
            this.workExperiences =  getDocsArray(querySnapshot);   
        },
        /**
         * Cargamos un objeto de la collection "userProfile" y del document cuyo id es "userProfile"
         * @link https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=0
         */
        async setUserProfile() {
            if (this.userProfile !== null)
                return;
            const {getDocument} = useDB('userProfile');
            //const {data,ref} =  await getDocument('userProfile');
            //this.userProfile = {...data,ref};
            const {data} =  await getDocument('userProfile');
            this.userProfile = data;
        },
        /**
         * Para borrar un documento
         * @param {String} ref Identificador del document de la colection wordExperience a eliminar
         */
        async deleteWorkExperience(ref){
            const {deleteDocument} = useDB('workExperience');
            await deleteDocument(ref);
            this.workExperiences = this.workExperiences.filter((item) => item.ref !== ref);
            this.workExperiences = [];            
            await this.setTotalExperiences();
            await this.setExperiences();
            this.actualPage = 1;
        },
        /**
         * Función en la que añadimos una nueva experiencia de usuario
         * @param {Object} payment - {code,title,place,province,dateEnd,dateStart}
         * @return {Object} Example: {ref: 'cMnPHAndMvAZhNgIckQ1', timeRef: 1656537319375, code: 'control', jobTitle: 'titulo profesional', title: 'Título', province: 'A Coruña', dateEnd: '', dateStart: ''}. El campo ref es el dato por firestore con la función addDoc
         */
        async insertWorkExperience(payment) {
            // Add a new document in collection "workExperience"
            const from = payment.dateEnd.split('-');
            payment.dateEnd = new Date(from[0], Number(from[1]) - 1, from[2]);
            if (payment.dateStart && payment.dateStart.length) {
                const from = payment.dateStart.split('-');
                payment.dateStart = new Date(from[0], Number(from[1]) - 1, from[2]);
            }
            const {addDocument} = useDB('workExperience');
            return await addDocument(payment);
        }
    },
    getters: {
        /**
         * 
         * @param {Object} state - Donde se encuentran las propiedades/variables de Pinia
         * @returns {String} - Nombre completo (nombre, primer apellio y segundo apellido) que son propiedades de state.userProfile
         */
        getFullName(state) {
            if (!state.userProfile || !state.userProfile.name) return '';
            return state.userProfile.name.concat(' ', state.userProfile.firstSurname, ' ', state.userProfile.secondSurname);
        },
        getBirhDate(state) {
            if (!state.userProfile || !state.userProfile.birth || typeof state.userProfile.birth.toDate !== 'function') return '';
            const date = new Date(state.userProfile.birth.toDate());
            return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
        },
        /**
         * El contenido de la propiedad knowledge es un array de Objetos con el siguiente:
         [ 
            { 
                 "languages": [ "JavaScript", "TypeScript" ], 
                 "nivel": 5, 
                 "title": "Vue" 
            },             
         ] 
         Con este getter obtenemos cada una de sus propiedades pues le pasamos uno de los argumentos (arg) languages, nivel, title
         * @param {Object} state - El state de Pinia
         * @returns {Array} Los values almacenados en un array de cada propiedades descritas anteriormente.
         */
        getKnowledge(state) {
            if (!state.userProfile || !state.userProfile.knowledge) return [];
            return (arg) => state.userProfile.knowledge.map((el) => el[arg]);
        },
        /**
         * 
         * @param {Object} state 
         * @returns {String} Retorna la url una imagen del Cloud Storage
         */
        async getPhotoURL(state){
            if(state.userProfile !== null && state.userProfile.folder && state.userProfile.photo)
             return await getURL(`${state.userProfile.folder}/${state.userProfile.photo}`);
            return "";
        }
    }
});