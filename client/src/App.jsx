import React, { useContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './Layout';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './placesFormPage';
import axios from "axios";
// ne jamais oublier import axios dans app.jsx sinon la page ne s'affichera pas si axios dans un autre fichier
import { UserContextProvider } from './UserContext';
import DescriptionPage from './pages/DescriptionPage';



// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
//  const { user } = useContext(UserContext); peut etre ajouter dans layout

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
           <Route path="/account/places/new" element={<PlacesFormPage />} />
           <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<DescriptionPage/>} /> 
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;