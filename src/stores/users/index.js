import { defineStore } from 'pinia';
import { signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
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
         * Propiedad que nos indica si el usuario de la propiedad "user" tiene o no una sesión abierta
         * @type {Boolean} - isLogged
         */
        isLogged: false
    }),
    actions: {
        /**
         * Método que nos permite autentificar un usuario en la api 
Autenticación de Firebase
         * @param {Object}  - Se trata de un objeto desestructurado donde se nos pasa el usuario y la contraseña
         * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
         */
        async signIn({email, password}) {
            //console.log(email,password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            this.user = userCredential.user;
            this.isLogged = true;
        },
        /**
         * Método que nos permite cerrar sesión de un usuario. Ver autentificación en el enlace de abajo.
         * @link https://firebase.google.com/docs/auth/web/password-auth?hl=es&authuser=0
         */
        async loginOut(){
            await signOut(auth);
            this.user = null;
            this.isLogged = false;
        },
        /**
         * Método que nos permite recargar la propiedad "user" del state en caso de refrescar la página.
         * @returns {null} -Retornamos null, es decir salimos del método en caso de que la propiedad user se encuentre cargada
         */
        logged(){
            if(this.user!==null)
                return;
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                      // User is signed in, see docs for a list of available properties
                      // https://firebase.google.com/docs/reference/js/firebase.User
                      //const uid = user.uid;
                      //console.log("id",uid,"user",user)
                      // ...
                      this.user = user;
                      this.isLogged = true;
                    } else {
                      // User is signed out
                      // ...
                    }
                  });
        }
    },
    getters:{
        /**
         * Propiedad que retorna un String vacío si la propiedad "user" del state se encuentra vacía (no ha sesión abierta)
         * @param {Object} state - La propiedad "state" de Pinia
         * @returns {String|Object} - state.user - {uid,email,emailVerified,isAnonymous,providerData,stsTokenManager,createdAt,lastLoginAt,apiKey,appName}
         */
        getUser: (state) => state.user===null?'':state.user
    }
});