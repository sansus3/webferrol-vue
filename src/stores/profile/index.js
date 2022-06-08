import { defineStore } from "pinia";

import { db } from "@/firebase";
import { collection, 
         getDocs,
         setDoc,
         doc,
         getDoc,
         onSnapshot,
         query, 
         orderBy,
         limit} from "firebase/firestore";


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
        /**
         * Propiedad donde almacenamos información personal de usuario
         * @type {Object|null} userProfile - {name, firstSurname, secondSurname, birth, whoami}
         */
        userProfile: null
    }),
    actions: {
        /**
         * Cargamos un array de objetos (documents) de la collection "workExperience"
         * @link https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=0
         * @link https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
         */
        async getExperiences() {
            if (this.workExperiences.length)
                return;
            const col = collection(db, "workExperience");
            onSnapshot(col);//Podemos utilizar el ahora conocido onSnapShot() para recibir el stream de datos actualizado. 
            const q = query(col, orderBy("dateStart"),limit(20));
            const querySnapshot = await getDocs(q);
            //console.log(querySnapshot.docs) //Retorna un array de documentos Firestore
            this.workExperiences = querySnapshot.docs.map(doc => doc.data());//Insertamos cada objeto de datos en el array 
        },
        /**
         * Cargamos un objeto de la collection "userProfile" y del document cuyo id es "userProfile"
         * @link https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=0
         */
        async getUserProfile() {
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
            await setDoc(doc(db, "workExperience", `${Date.now()}`), payment);
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
         * @returns {String} Retorna una imagen del Cloud Storage
         */
        getPhoto: (state) => state.userProfile!==null && state.userProfile.folder && state.userProfile.photo?`${state.userProfile.folder}/${state.userProfile.photo}`:''
    }
});