import { getStorage, ref,getDownloadURL  } from "firebase/storage";

//Creamos referencia
export const storage = getStorage();




/**
 * Con esta función obtenemos una imagen de cloud storage de firebase
 * @link https://firebase.google.com/docs/storage/web/start?hl=es&authuser=0
 * @param {String} bucket - URL del bucket de Cloud Storage 
 * @returns {String} - URL de la imagen por http(s)
 */
export const getURL = async (bucket='profile/xurxo.jpg') => {
    const storageRef = ref(storage,bucket);
    return await getDownloadURL(storageRef)
}


  


