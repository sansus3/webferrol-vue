/**
 * @url https://parzibyte.me/blog/2022/01/22/reducir-tamano-imagen-javascript/
 * @url https://labs.madisoft.it/javascript-image-compression-and-resizing/
 * @param {File} imagenComoArchivo 
 * @param {Number} porcentajeCalidad - 10 para el 10%, 20 el 20% y así sucesivamente 
 * @param {Number} maxwidth - Tamaño máximo  en ancho del nuevo fichero
 * @param {Number} maxaheight - Tamaño máximo en alto del nuevo fichero
 * @returns {Blob|null}
 */
export const getBlobCompressedImage = async (imagenComoArchivo, porcentajeCalidad = 80, maxwidth = 800, maxheight = 600) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const imagen = new Image();
        imagen.onload = () => {
            const [w, h] = calculateSize(imagen, maxwidth, maxheight);
            //console.log(imagen.width,'->',w,'\n',imagen.height,'->',h);
            canvas.width = w;
            canvas.height = h;
            canvas.getContext("2d").drawImage(imagen, 0, 0, w, h);
            canvas.toBlob(
                (blob) => {
                    if (blob === null) {
                        return reject(blob);
                    } else {
                        resolve(blob);
                    }
                },
                "image/jpeg",
                porcentajeCalidad / 100
            );
        };
        imagen.src = URL.createObjectURL(imagenComoArchivo);
    });
};

/**
 * Función que calculará el nuevo tamaño de la imagen para evitar distorsiones
 * @param {Object File} image - Imagen de tipo File
 * @param {Number} maxWidth - Máximo tamaño permitido
 * @param {Number} maxHeight - Máximo tamaño permitido
 * @returns {Array} Los dos valores nuevo de ancho y alto aplicados a la imagen
 */
function calculateSize(image, maxWidth, maxHeight) {
    let width = image.width;
    let height = image.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}