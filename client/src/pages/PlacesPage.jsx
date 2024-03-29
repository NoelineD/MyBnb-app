import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import AccountNav from "../AccountNav";
import axios from 'axios';

export default function PlacesPage(){

const [places, setPlaces] = useState([]);

    useEffect(() => {
    axios.get('/user-places').then(response => {
        console.log('Response:', response);
        setPlaces(response.data);
    }).catch(error => {
        console.error('Error fetching places:', error);
    });
}, []);

    return (
    <div>
        <AccountNav />
       
    <div className='text-center mb-8'>
        <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        add new place
        </Link>
    </div>
            
    <div className="grid grid-cols-1 gap-8">
     {places.length > 0 && places.map(place => (
        <Link to={`/account/places/${place._id}`} className="flex cursor-pointer bg-gray-200 p-2 rounded-2xl mb-4" key={place._id}>
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.addedPhotos.length > 0 && (
                    <img className='object-cover w-full h-full' src={'http://localhost:4000/uploads/' + place.addedPhotos[0]} alt=""/>
                )}
            </div>
            
            <div className="ml-4">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-4">{place.description}</p>
            </div>
        </Link>
            ))}
    </div>
            
            {/* <PlacesFormPage /> */}
        </div>
    );
}