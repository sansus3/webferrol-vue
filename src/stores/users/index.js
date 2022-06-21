import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '@/firebase';

export const useStoreUsers = defineStore({
    id: 'users',
    state: () => ({
        /**
         * Propiedad donde se almacena el objeto persona que viene de firebase
         * @type {Object|null} user - The user object has basic properties such as display name, email, etc. 
         * user:{uid,email,emailVerified,isAnonymous,providerData,stsTokenManager,createdAt,lastLoginAt,apiKey,appName}. La propiedad "providerData" contiene a su vez un array con la siguiente información  [ { "providerId", "uid", "displayName", "email", "phoneNumber", "photoURL" } ]
         * @link https://firebase.google.com/docs/auth/web/manage-users?hl=es&authuser=0
         */
        user: null,
        /**
         * Variable que se carga y descarga en el intervalo en que se carga la sesión del usuario para realizar acciones por ejemplo en TheMenu.vue
         * @type {Boolean} loadingSession
         */
        loadingSession: false
    }),
    actions: {
        /**
         * Método que nos permite autentificar un usuario en la api 
Autenticación de Firebase
         * @param {Object}  - Se trata de un objeto desestructurado donde se nos pasa el usuario y la contraseña
         * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
         */
        async signIn({ email, password }) {
            //console.log(email,password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            this.user = userCredential.user;
            window.localStorage.setItem("user",JSON.stringify(this.user));
        },
        /**
         * Método que nos permite cerrar sesión de un usuario. Ver autentificación en el enlace de abajo.
         * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
         */
        async loginOut() {
            await signOut(auth);
            this.user = null;
            window.localStorage.removeItem("user");
        },
        /**
         * Método que nos permite recargar la propiedad "user" del state en caso de refrescar la página.
         * @returns {null} -Retornamos null, es decir salimos del método en caso de que la propiedad user se encuentre cargada
         */
        async onAuthState() {
            if (this.user !== null)
                return;
            return new Promise(
                (resolve, reject) => {
                    const subscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            // User is signed in, see docs for a list of available properties
                            // https://firebase.google.com/docs/reference/js/firebase.User
                            //const uid = user.uid;
                            //console.log("id",uid,"user",user)
                            // ...
                            this.user = user;
                            resolve(user)
                        } else {
                            // User is signed out
                            // ...
                            resolve(null);
                        }
                    },
                    error=>reject(error));
                    subscribe();                   
                }
            );
        }
    },
    getters: {
        /**
         * Propiedad que retorna un String vacío si la propiedad "user" del state se encuentra vacía (no ha sesión abierta)
         * @param {Object} state - La propiedad "state" de Pinia
         * @returns {String|Object} - state.user - {uid,email,emailVerified,isAnonymous,providerData,stsTokenManager,createdAt,lastLoginAt,apiKey,appName}
         */
        getUser: (state) => state.user === null ? '' : state.user,
        /**
         * 
         * @param {Object} state 
         * @returns {String} - Retorna el email si existe la propiedad o vacío
         */
        getUserEmail: (state) => state.user !== null && state.user.email ? state.user.email : '',
        isLogged: (state) => state.user!==null && state.user.uid.length?true:false
    }
});