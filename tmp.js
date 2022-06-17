async setNextExperiences() {
    let col = collection(db, "workExperience");
    onSnapshot(col);//Podemos utilizar el ahora conocido onSnapShot() para recibir el stream de datos actualizado. 
    let q = query(col, orderBy("dateStart"), limit(2));
    let querySnapshot = await getDocs(q);
    let lastWorkExperiences = querySnapshot.docs[querySnapshot.docs.length-1];
    console.log(lastWorkExperiences,this.lastWorkExperiences)
    // Construct a new query starting at this document
    col = collection(db, "workExperience");
    onSnapshot(col);//Podemos utilizar el ahora conocido onSnapShot() para recibir el stream de datos actualizado.
    q = query(
        col,
        orderBy("dateStart"),
        startAfter(
            lastWorkExperiences),
        limit(2));
    querySnapshot = await getDocs(q);
    lastWorkExperiences = querySnapshot.docs[querySnapshot.docs.length-1];
    //console.log(querySnapshot.docs) //Retorna un array de documentos Firestore
    this.workExperiences = querySnapshot.docs.map(doc => {
        return {
            ref: doc.id,
            ...doc.data()
        }
    });//Insertamos cada objeto de datos en el array 
}