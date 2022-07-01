import { reactive } from "vue";
import { db } from "@/firebase";
import {
    addDoc,
    updateDoc,
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
    /**
     * 
     * @param {Object} documentObject Objeto con las columnas y valores a guardar como registro en un documento perteneciente a una determinada collección de firestore
     * @returns {Object} El Objeto con la referencia dada por firebase, la fecha de creación y campos creados y si no objet de error
     */
    const addDocument = async documentObject => {
        try {
            //Objeto a insertar en la base de datos
            const data = {timeRef: Date.now(),...documentObject}
            // Add a new document with a generated id.
            const docRef = await addDoc(collectionRef, data);
            return reactive({ref:docRef.id,...data});
        } catch (error) {
            return reactive({
                error,
                response: true,
            })
        } 
    }
    /**
     * 
     * @param {String}  id - Identificador para guardar el documento
     * @param {Object} documentObject - Documento que se desea guardar
     */
    const updateDocument = async (id,documentObject) => {
        try {
            const data = {timeRef: Date.now(),...documentObject}
            const docRef = await updateDoc(doc(db, collectionName,id),data);
            return reactive({ref:id,...data});
        } catch (error) {
            return reactive({
                error,
                response: true,
            })
        }
    }
    /**
     * 
     * @param {String} reference Referencia de un documento a eliminar
     * @returns {Object} El objeto con la referencia del objeto eliminado o Error
     */
    const deleteDocument = async reference => {
        try {
            deleteDoc(doc(db, collectionName, reference));
            return reactive({
                ref: reference
            });
        } catch (error) {
            return reactive({
                error,
                response: true,
            })
        } 
    }
    /**
     * 
     * @param {String} reference Referencia del documento a recuperar
     * @returns {Object} Objeto con las columnas del documento y su referencia o Error
     */
    const getDocument = async reference => {
        try {
            const docRef = doc(db, collectionName, reference);
            onSnapshot(docRef);//Podemos utilizar el ahora conocido onSnapShot() para recibir el stream de datos actualizado. 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return reactive({
                    ref: docSnap.id,
                    data: {...docSnap.data()},
                })
            } else 
                throw new Error(`No existe el documento ${reference}`);
        } catch (error) {
            return reactive({
                error,
                response: true,
            })
        }
    }
    return {getDocument,addDocument,deleteDocument,updateDocument}
}

/**
 * Se pretende mapear el resultado de una consulta (query) y almacenarlos en un Array
 * @param {Object} querySnapshot Los resultados de una Promise ¡ya resuelta!!! de tipo QuerySnapshot.
 * @return {Array} Retorna un array con la propiedad id y el método data de un objeto doc de Firestore
 */
export const getDocsArray = querySnapshot => 
querySnapshot.docs.map(doc => {
    return reactive({
        ref: doc.id,
        ...doc.data()
    })
});