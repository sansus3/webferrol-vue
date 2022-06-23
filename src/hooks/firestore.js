import { ref } from "vue";
import { db } from "@/firebase";
import {
    addDoc,
    getDoc,
    doc,
    deleteDoc,
    collection,
    onSnapshot
} from "firebase/firestore";
/**
 * 
 * @param {String} collectionName Colección de firestore. @returns — The CollectionReference instance.
 */
export const useDB = collectionName => {
    const collectionRef = collection(db, collectionName);
    const loading = ref(false);
    /**
     * 
     * @param {Object} documentObject Objeto con las columnas y valores a guardar como registro en un documento perteneciente a una determinada collección de firestore
     * @returns {Object} El Objeto y un campo adicional llamado id, o un objeto Error
     */
    const addDocument = async documentObject => {
        try {
            loading.value = true;
            // Add a new document with a generated id.
            return await addDoc(collectionRef, {
                id: Date.now(),
                ...documentObject
            });
        } catch (error) {
            return {
                error,
                response: true,
            }
        } finally {
            loading.value = false;
        }

    }
    /**
     * 
     * @param {String} reference Referencia de un documento a eliminar
     * @returns {Object} El objeto eliminado o Error
     */
    const deleteDocument = async reference => {
        try {
            loading.value = true;
            return await deleteDoc(doc(db, collectionName, reference));
        } catch (error) {
            return {
                error,
                response: true,
            }
        } finally {
            loading.value = false;
        }
    }
    /**
     * 
     * @param {String} reference Referencia del documento a recuperar
     * @returns {Object} Objeto con las columnas del documento y su referencia o Error
     */
    const getDocument = async reference => {
        try {
            loading.value = true;
            const docRef = doc(db, collectionName, reference);
            onSnapshot(docRef);//Podemos utilizar el ahora conocido onSnapShot() para recibir el stream de datos actualizado. 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return {
                    ref: docSnap.id,
                    data: {...docSnap.data()},
                }
            } else 
                throw new Error(`No existe el documento ${reference}`);
        } catch (error) {
            return {
                error,
                response: true,
            }
        } finally {
            loading.value = false;
        }
    }

    return {getDocument,addDocument,deleteDocument,loading}
}
