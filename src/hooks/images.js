function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

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

/**
 * @url https://parzibyte.me/blog/2022/01/22/reducir-tamano-imagen-javascript/
 * @url https://labs.madisoft.it/javascript-image-compression-and-resizing/
 * @param {File} imagenComoArchivo 
 * @param {Number} porcentajeCalidad - 10 para el 10%, 20 el 20% y así sucesivamente 
 * @returns {File|null}
 */
export const getCompressedImage = async (imagenComoArchivo, porcentajeCalidad = 80) => {
    return new Promise((resolve, reject) => {
        const $canvas = document.createElement("canvas");
        const imagen = new Image();
        imagen.onload = () => {
            console.log(imagen.width, imagen.height)
            const [w, h] = calculateSize(imagen, 800, 600);
            console.log(w, h);
            $canvas.width = w;
            $canvas.height = h;
            $canvas.getContext("2d").drawImage(imagen, 0, 0, w, h);
            $canvas.toBlob(
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