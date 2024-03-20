import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default function AccountNav() {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
     
    if(subpage === undefined ){
        subpage = 'profile';
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

    return (
                    <nav className="w-full flex gap-2 mt-8 justify-center mb-8">
                <Link className={LinkClasses('profile')} to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                    My profile
                </Link>

                <Link className={LinkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    My bookings
                </Link>

                <Link className={LinkClasses('places')} to={'/account/places'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m11.998.811l8.384 5.388L19.3 7.882l-.3-.193v3.417l3.375 2.062l-1.043 1.707l-.332-.203V22H3v-7.328l-.332.203l-1.043-1.707L5 11.106V7.689l-.3.193L3.617 6.2zM7 6.403v3.48l5-3.055l5 3.055v-3.48L11.998 3.19zM5 13.45V20h6v-4h2v4h6v-6.55l-7-4.278z"/></svg>
                    My accomodations
                </Link>

            </nav>
    )
}