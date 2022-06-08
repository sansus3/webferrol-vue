import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

//Creamos referencia
export const storage = getStorage();




/**
 * Con esta función obtenemos una imagen de cloud storage de firebase
 * @link https://firebase.google.com/docs/storage/web/start?hl=es&authuser=0
 * @param {String} bucket - URL del bucket de Cloud Storage 
 * @returns {String} - URL de la imagen por http(s)
 */
export const getURL = async (bucket = 'profile/xurxo.jpg') => {
    const storageRef = ref(storage, bucket);
    return await getDownloadURL(storageRef)
}

/**
 * Con esta función obtenemos las urls de un conjunto de imágenes de cloud storage de firebase
 * @link https://firebase.google.com/docs/storage/web/list-files
 * @link https://firebase.google.com/docs/storage/web/download-files
 * @param {String} url -  URL. If empty, returns root reference. 
 * @returns {Array} - Array de String con la ruta de descarga HTML de cada imagen
 */
export const listAllUrls = async (url = 'gs://curriculum-vitae-xurxo.appspot.com/animales') => {
    // Create a reference under which you want to list
    const listRef = ref(storage, url);
    // Find all the prefixes and items.
    const results = await listAll(listRef);
    const { items } = results;
    return await Promise.all(
        items.map((item) => getDownloadURL(item))
    );
}





