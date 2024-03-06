import { useState, useEffect, createContext } from "react";
import axios from 'axios';
// import {data} from 'autoprefixer';

// Création du contexte utilisateur
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready,setReady] = useState(false);
  
  // Utilisation de useEffect pour effectuer une action une seule fois après le premier rendu
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({data}) => {
        setUser(data);
        setReady(true);
      });
     
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;