import { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BookingWiddget from '../BookingWidget';

export default function DescriptionPage() {

    const {id} = useParams();
    const [place,setPlace]= useState(null);
    const [showAllPhotos, setShowAllPhotos]= useState (false);
    useEffect(()=> {
        if(!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response=>{
        setPlace(response.data);
        })
    },[id]);
    // everytime this id changes useEffect will run

    if (!place) return '';

    if(showAllPhotos){
        return (
            <div className="absolute inset-0 bg-black text-white min-w-full min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                <div>
                    {/* mr largeur titre */}
                    <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                    <button onCLick={()=> setShowAllPhotos(false)}className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        close photos
                    </button>
                </div>
                {place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo =>(
                    <div>
                        <img src={'http://localhost:4000/uploads/' +photo} alt=""/>
                    </div>
                ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 px-8 -mx-8 pt-8">

            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-3 font-semibold underline text-2xl" target="blank" href={'https://maps.google.com/?q='}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>

            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div> {place.addedPhotos?.[0] && (
                        <div>
                        <img onCLick={() => setShowAllPhotos(true)} className="w-full h-full object-cove cursor-pointer" src={"http://localhost:4000/uploads/" +place.addedPhotos[0]} alt=""/>
                        </div>
                    )}
                    </div>

                    <div className="grid">
                    {place.addedPhotos?.[1] && (
                        <img onCLick={() => setShowAllPhotos(true)} className="object-cover h-full cursor-pointer" src={"http://localhost:4000/uploads/" +place.addedPhotos[1]} alt=""/>
                        )}
                    <div className="overflow-hidden">
                    {place.addedPhotos?.[2] && (
                        <img onCLick={() => setShowAllPhotos(true)} className="object-cover h-full relative top-2 cursor-pointer " src={"http://localhost:4000/uploads/" +place.addedPhotos[2]} alt=""/>
                         )} 
                    </div>
                    </div>
                </div>
                <button onClick={()=> setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bh-white rounded-2xl shadow-md shadow-gray-500">show more</button>
            </div>

            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                 <div>
                    <div className="my-4">
                    <h2 className="font-semibold text-2xl">Description</h2>
                    {place.description}
                    </div>

                    Check in: {place.checkIn}<br/>
                    Check out: {place.checkOut}<br/>
                    Max number of guests: {place.maxGuests}
                    <div className="mt-2 text-sm text-gray-700 leading-4">{place.extraInfo}</div>
                </div>
                <div>
                        <BookingWiddget place={place} />
                </div>

                <div className="bg-white -mx-8 px-8 py-8 border-t">

                </div>

                <div>
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    );
}