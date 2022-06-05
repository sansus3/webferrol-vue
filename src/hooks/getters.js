/**
 * @description toDate ( ) : Date Convert a Timestamp to a JavaScript Date object. This conversion causes a loss of precision since Date objects only support millisecond precision.
 * @param {Object} timestamp - new Timestamp ( seconds :  number ,  nanoseconds :  number ) : Timestamp. Este parámetro es de Firebase.
 * @returns {String} El método toDate de Firebase retorna "JavaScript Date object representing the same point in time as this Timestamp, with millisecond precision". Obtenemos el día, mes y año con cuatro dígitos.
 * @link https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp
 */
 export const getDayMonthFullYear = timestamp => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return '';
    const date = new Date(timestamp.toDate());
    return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
}