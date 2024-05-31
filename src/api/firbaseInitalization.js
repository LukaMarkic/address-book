import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKMVN8EXnGv2l2TLjnCYGOEm-4Pj1Bnes",
  authDomain: "address-book-api-lm.firebaseapp.com",
  projectId: "address-book-api-lm",
  storageBucket: "address-book-api-lm.appspot.com",
  messagingSenderId: "548515633006",
  appId: "1:548515633006:web:4fd1361e0f56c0c959537f"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore();

const getDatabaseCollection = (collectionName) => {
    const userCollection = collection(database, collectionName);
    return userCollection;
}

const deleteDocumentById = async (_collection, id) => {
  try{
    const documentRef = doc(_collection, id);
    await deleteDoc(documentRef);
  }catch(error){
    throw "Greska pri brisanju"
  }
}

const updateDocumentById = async (_collection, id, newData) => {
  try{
    const documentRef = doc(_collection, id);
    await updateDoc(documentRef, newData);
  }catch(error){
    throw "Greska pri izmjeni"
  }
}

const fetchDocumnetsByIds = async (collection, IDs) => {

  const contactsQuery = query(collection, where("id", "in", IDs));

  try {
    const querySnapshot = await getDocs(contactsQuery);
    const contactsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return contactsData;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    return [];
  }
};


const fetchDocumentAttributeValueByDocumentID = async (collection, documentID, keyName) => {
  const userDocRef = doc(collection, documentID);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    return userData[keyName] || [];
  } else {
    console.log("No such user document!");
    return [];
  }
};

export {firebaseApp, database, getDatabaseCollection, deleteDocumentById, updateDocumentById, fetchDocumnetsByIds, fetchDocumentAttributeValueByDocumentID }