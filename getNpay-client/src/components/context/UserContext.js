// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase.config";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const value = { user };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
