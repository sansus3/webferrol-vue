import { defineStore } from 'pinia'
import { signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from '@/firebase'

export const useStoreUsers = defineStore({
    id: 'counter',
    state: () => ({
        user: null
    }),
    getters: {

    },
    actions: {
        async signIn({email, password}) {
            //console.log(email,password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            this.user = userCredential.user;
        },
        async loginOut(){
            await signOut(auth);
        },
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
                    } else {
                      // User is signed out
                      // ...
                    }
                  });
        }
    },
    getters:{
        getUser: (state) => state.user===null?'':state.user
    }
})
