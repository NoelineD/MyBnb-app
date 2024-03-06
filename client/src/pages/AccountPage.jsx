import {useContext, useState}from "react";
import UserContext from "../UserContext";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import PlacesPage from './PlacesPage';


export default function AccountPage() {
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

 
    function LinkClasses(type=null) {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';

    if ( type === subpage) {
        classes += ' bg-primary text-white'; // Appliquer les styles si le type correspond à la sous-page actuelle ou si le type est 'profile' et subpage est undefined
    } else {
        classes += 'bg-gray-200'
    }

    return classes;
}

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <nav className="w-full flex gap-2 mt-8 justify-center mb-8">
                <Link className={LinkClasses('profile')} to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                    My profile
                </Link>

                <Link className={LinkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    My bookings
                </Link>

                <Link className={LinkClasses('places')} to={'/account/places'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                    My accomodations
                </Link>

            </nav>
            {subpage=== 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={Logout} className="color max-w-sm mt-2">logout</button>
                </div>
            )}
       
        {subpage === 'places' && (
            <PlacesPage/>
        )}
        </div>
    );
}