import { defineStore } from "pinia";
import { getURL, listAllUrls } from '@/firebase.cloud.storage';
import { nextPage,previousPage } from "@/hooks/pagination.firestore";
import { db } from "@/firebase";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    onSnapshot,
    deleteDoc,
    query,
    orderBy,
    limit
} from "firebase/firestore";


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
        limit: 2, //Items por página
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
        async setTotalExperiences(){
            const q = query(collection(db, "workExperience"), orderBy("dateStart"));
            const querySnapshot = await getDocs(q);
            this.total = querySnapshot.size;
        },
        /**
         * Cargamos un array de objetos (documents) de la collection "workExperience"
         * @link https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=0
         * @link https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         */
        async setExperiences() {
            if (this.workExperiences.length)
                return; 
            const q = query(collection(db, "workExperience"), orderBy("dateStart"), limit(this.limit));
            const querySnapshot = await getDocs(q);
            this.lastWorkExperiences = querySnapshot.docs[querySnapshot.docs.length-1];
            
            //console.log(querySnapshot.docs) //Retorna un array de documentos Firestore
            this.workExperiences = querySnapshot.docs.map(doc => {
                return {
                    ref: doc.id,
                    ...doc.data()
                }
            });//Insertamos cada objeto de datos en el array 
        },
        async setNextExperiences() {            
            if(!this.workExperiences.length)
                return;
            this.actualPage++;
            //Obtenemos el último documento del array                               
            const lastWorkExperiences = await getDoc(doc(collection(db, "workExperience"), this.workExperiences[this.workExperiences.length-1].ref));
            //console.log(lastWorkExperiences)
            
           
            // Construct a new query starting at this document
            const querySnapshot = await nextPage(collection(db, "workExperience"),'dateStart',lastWorkExperiences,this.limit);

            this.workExperiences = querySnapshot.docs.map(doc => {
                return {
                    ref: doc.id,
                    ...doc.data()
                }
            });//Insertamos cada objeto de datos en el array 

            
        },
        async setPaginationExperiences(page){
            const newLimit = page*this.limit;
            const q = query(collection(db, "workExperience"), orderBy("dateStart"), limit(newLimit));
            let querySnapshot = await getDocs(q);
            const index = this.limit*page;
            const last = querySnapshot.docs[index-1];
            const lastWorkExperiences = await getDoc(doc(collection(db, "workExperience"), last.id));
            //this.lastWorkExperiences = querySnapshot.docs[querySnapshot.docs.length-1];
            // Construct a new query starting at this document
            querySnapshot = await nextPage(collection(db, "workExperience"),'dateStart',lastWorkExperiences,this.limit);
            this.actualPage = page;
            this.workExperiences = querySnapshot.docs.map(doc => {
                return {
                    ref: doc.id,
                    ...doc.data()
                }
            });//Insertamos cada objeto de datos en el array 
            
        },
        async setPreviousExperiences() {
            this.actualPage--;
            //console.log(this.lastWorkExperiences.id);
            const lastWorkExperiences = await getDoc(doc(collection(db, "workExperience"), this.workExperiences[0].ref));
           
            // Construct a new query starting at this document
            const querySnapshot = await previousPage(collection(db, "workExperience"),'dateStart',lastWorkExperiences,this.limit);

            this.workExperiences = querySnapshot.docs.map(doc => {
                return {
                    ref: doc.id,
                    ...doc.data()
                }
            });//Insertamos cada objeto de datos en el array 
        },
        /**
         * Cargamos un objeto de la collection "userProfile" y del document cuyo id es "userProfile"
         * @link https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=0
         */
        async setUserProfile() {
            if (this.userProfile !== null)
                return;
            const docRef = doc(db, "userProfile", "userProfile");//docRef nos permite obtener un documento del que conocemos su dis
            onSnapshot(docRef);//Podemos utilizar el ahora conocido onSnapShot() para recibir el stream de datos actualizado. 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                this.userProfile = docSnap.data();
                //console.log(docSnap.id,docSnap.data());
            }
        },
        /**
         * Para borrar un documento
         * @param {String} ref Identificador del document de la colection wordExperience a eliminar
         */
        async deleteWorkExperience(ref){
            await deleteDoc(doc(db, "workExperience", ref));
            this.workExperiences = this.workExperiences.filter((item) => item.ref !== ref);
        },
        /**
         * Función en la que añadimos una nueva experiencia de usuario
         * @param {Object} payment - {code,title,place,province,dateStart,dateEnd}
         */
        async insertWorkExperience(payment) {
            // Add a new document in collection "workExperience"
            const from = payment.dateEnd.split('-');
            payment.dateEnd = new Date(from[0], Number(from[1]) - 1, from[2]);
            if (payment.dateStart && payment.dateStart.length) {
                const from = payment.dateStart.split('-');
                payment.dateStart = new Date(from[0], Number(from[1]) - 1, from[2]);
            }
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "workExperience"), {
                ...payment
            });
            //console.log("Document written with ID: ", docRef.id);
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
        getPhotoURL: async state => await getURL(state.userProfile !== null && state.userProfile.folder && state.userProfile.photo ? `${state.userProfile.folder}/${state.userProfile.photo}` : '')
    }
});