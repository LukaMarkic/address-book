import React, { createContext, useEffect, useState } from "react";
import { getDatabaseCollection } from "../api/firbaseInitalization";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { logOut } from "../api/authHandle";
import { trimStringsInArray } from "../help/valueFormatter";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const userCollection = getDatabaseCollection("users");
    
    useEffect(() => {
      if (userId) {
        fetchUserData(userId);
      }
    }, [userId]);

    const fetchUserData = async (id=userId) => {
      const documentRef = doc(userCollection, id);
      getDoc(documentRef).then((querySnapshot) => {
        const userData = querySnapshot.data();
        if(userData && userData.contactsIDs) userData["contactsIDs"] = trimStringsInArray(userData["contactsIDs"])
        setUserData(userData);
      });
    };

    const handleSetUserId = (id) => {
      setUserId(id);
      if (!id) {
        setUserData(null);
      }
    };

      // Function to update user's contactIDs
    const updateUserContactIDs = async (userID=userId, contactId) => {
      const userDocRef = doc(userCollection, userID);
      updateDoc(userDocRef, {
        contactsIDs: arrayUnion(contactId)
      }).then(() => fetchUserData())
    };

    const removeIdFromContactsIDs = async (userID=userId, contactId) => {
      const userDocRef = doc(userCollection, userID);
      updateDoc(userDocRef, {
        contactsIDs: arrayRemove(contactId)
      }).then(() => fetchUserData())
    }


    const logOutUser = () => {
      handleSetUserId(null);
      logOut().then(() => navigate("/LoginPage"));
    };

    return (
      <UserContext.Provider
        value={{
          userId,
          setUserId: handleSetUserId,
          logOutUser,
          userData,
          fetchUserData,
          updateUserContactIDs,
          removeIdFromContactsIDs
        }}
      >
        {children}
      </UserContext.Provider>
    );
};

export default UserContext;
