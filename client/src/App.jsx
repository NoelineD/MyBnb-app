// import React, { useEffect, useContext } from 'react';
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import axios from "axios";
// ne jamais oublier import axios dans app.jsx sinon la page ne s'affichera pas si axios dans un autre fichier
// import { UserContextProvider } from './UserContext';

// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     if (!user) {
//       axios.get('/profile');
//     }
//   }, [user]);

  return (
    // <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    // </UserContextProvider>
  );
}

export default App;