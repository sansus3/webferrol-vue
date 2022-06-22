import { db } from "@/firebase";
import { 
    orderBy,
    collection,
    startAfter,
    limit,
    limitToLast, 
    query, 
    getDocs, 
    endBefore } from "firebase/firestore";
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {String|Object} lastDocSnap - Creates a QueryConstraint that modifies the result set to start after the provided fields relative to the order of the query. The order of the field values must match the order of the order by clauses of the query.
 * @param {Number} pageSize - Número de registros a montar 
 * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
 */
 export const initPage = async (collectionRef,field,pageSize) => 
 await getDocs(query(
     collection(db,collectionRef),
     orderBy(field),
     limit(pageSize)));
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {String|Object} lastDocSnap - Creates a QueryConstraint that modifies the result set to start after the provided fields relative to the order of the query. The order of the field values must match the order of the order by clauses of the query.
 * @param {Number} pageSize - Número de registros a montar 
 * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
 */
export const nextPage = async (collectionRef,field,lastDocSnap,pageSize) => 
    await getDocs(query(
        collection(db,collectionRef),
        orderBy(field),
        startAfter(lastDocSnap),
        limit(pageSize)));
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {String} field - Campo por el que se ordenará la consulta
 * @param {String|Object} lastDocSnap - Creates a QueryConstraint that modifies the result set to start after the provided fields relative to the order of the query. The order of the field values must match the order of the order by clauses of the query.
 * @param {Number} pageSize - Número de registros a montar 
 * @returns query - Creates a new immutable instance of Query that is extended to also include additional query constraints.
 */
 export const previousPage = async (collectionRef,field,lastDocSnap,pageSize) => 
 await getDocs(query(
     collection(db,collectionRef),
     orderBy(field),
     endBefore(lastDocSnap),
     limitToLast(pageSize)));
/**
 * 
 * @param {String} collectionRef - Referencia a un colleción de firestore collection()
 * @param {Number}  - Número de registros
 */
export const totalPages = async (collectionRef) => {
    const q = query(collection(db, collectionRef));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
}