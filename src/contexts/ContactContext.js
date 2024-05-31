import React, { createContext, useState } from 'react';
import { getDocs, query, where } from "firebase/firestore";
import { getDatabaseCollection } from '../api/firbaseInitalization';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [contactsCount, setContactsCount] = useState(null);
  const contactCollection = getDatabaseCollection("contacts");

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(contactCollection);
    const contactsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContactsCount(contactsData.length)
    setContacts(contactsData);
  };

  const fetchContactsByIDs = async (contactIds) => {
    const contactQueries = [];
    for (let i = 0; i < contactIds.length; i += 10) {
      const batch = contactIds.slice(i, i + 10);
      contactQueries.push(query(contactCollection, where("__name__", "in", batch)));
    }
  
    try {
      const contactSnapshots = await Promise.all(contactQueries.map(q => getDocs(q)));
      const contactsData = contactSnapshots.flatMap(snapshot => 
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
      setContacts(contactsData);
      setContactsCount(contactsData.length)
    } catch (error) {
      console.error("Error fetching contacts: ", error);
      setContacts([]);
      setContactsCount(0)
    }
  };

  return (
    <ContactContext.Provider value={{ contacts, contactsCount, setContactsCount, fetchContacts, fetchContactsByIDs }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;

