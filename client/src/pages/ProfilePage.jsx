import {useContext, useState}from "react";
import UserContext from "../UserContext";
import { Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import PlacesPage from './PlacesPage';
import AccountNav from "../AccountNav";


export default function ProfilePage() {
    const [redirect, setRedirect]= useState(null);
    const {user, setUser, ready} = useContext(UserContext);
    // const { user } = useContext(UserContext);
    let {subpage} = useParams();
    // si indefini alors profile en couleur
    if (subpage === undefined) {
        subpage='profile';
    }

    async function Logout(){
        await axios.post('/logout');
        setRedirect('/');
         setUser(null);
    }

    // si ordi met un peu de temps a afficher l'info (3g) alord ca inscrira loading.. et sinon ça affichera la page
    if (!ready) {
        return 'Loading...';
    }
    if (ready && !user && !redirect) { 
        return <Navigate to ={'/login'}/>
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <AccountNav />
            {subpage=== 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={Logout} className="color max-w-sm mt-2">logout</button>
                </div>
            )}
       
        {subpage === 'places' && (
            <PlacesPage />
        )}
        </div>
    );
}