import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../perks";
import axios from "axios";

export default function PlacesPage(){
    const {action}= useParams();
    const [title,setTitle]= useState('');
    const [address, setAddress]= useState('');
    const [addedPhotos, setAddedPhotos]= useState([]);
    const [photoLink, setPhotoLink]= useState('');
    const [description, setDescription]= useState('');
    const [extraInfo, setExtraInfo]= useState('');
    const [checkIn, setCheckIn]= useState('');
    const [checkOut, setCheckOut]= useState('');
    const [maxGuests, setMaxGuests]= useState('');
    const [perks, setPerks] = useState([]);

    function inputHeader(text) {
        return (
            <label className="text-2xl mt-4">{text}</label>
        );
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput (header,description){
        return (
        <>
          {inputHeader(header)}
           {inputDescription(description)}
        </>
        );
    }

    async function addPhotoByLink(){
     
        ev.preventDefault();
        const {data:filename}= await axios.post('/upload-by-link',{link:photoLink});
        setAddedPhotos(prev=> {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    return (
    <div>
        {action !== 'new' && (
            <div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                add new place</Link>
            </div>

        )}

        { action === 'new' && (
        <div>
            <form>
                {preInput('Title','little description of your appartment, must be catchy as in ad')}
                <input type='text' value={title} onChange={ev =>setTitle(ev.target.value)} placeholder='title, for instance: my lovely appartment'/>

                {preInput('Address','address to the place you are renting')}
                <input type='text' value={address} onChange={ev =>setAddress(ev.target.value)} placeholder="address"/>

                {preInput('Photos','more pics you get the better')}
                <div className="flex gap-2">
                    <input type="text" value={photoLink} onChange={ev =>setPhotoLink(ev.target.value)} placeholder={'Add jpg using link'}/>
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photos</button>
                </div>
              
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-col-6 mt-2">
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                        <div>
                            {link}
                        </div>
                    ))}

                    <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />  
                    </svg>

                    Upload from your device</button>
                </div>
                {preInput('Description','Describe your lovely place. Try to be as catchy as you can !')}
                <textarea value={description} onChange={ev =>setDescription(ev.target.value)}/>
                
                {preInput('Perks','Select all the perks of your place')}
                <div>
                    <div className="grid  mt-2 gap-1 grid-cols-2 md:grid-col-3 lg:grid-col-4 ">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                </div>

                <div className="text-xl mt-4">
                {preInput('Extra infos','house rules...')}
                <textarea value={extraInfo} onChange={ev =>setExtraInfo(ev.target.value)}/> 
                </div>
                
                {preInput('Check in & out times','add times, remember to have some time window for cleaning the room before leaving')}
                

            <div className="grid gap-2 sm:grid-cols-3">
                <div>
                    <h3 className="mt-2 -mb-1">Check in Time</h3>
                    <input type="text" value={checkIn} onChange={ev =>setCheckIn(ev.target.value)} placeholder="14"/>
                </div>
                <div>
                    <h3>Check out Time</h3>
                    <input type="text" value={checkOut} onChange={ev =>setCheckOut(ev.target.value)} placeholder="11"/>
                </div>
                <div>
                    <h3>Max Number of guests</h3>
                    <input type="number" value={maxGuests} onChange={ev =>setMaxGuests(ev.target.value)}/>
                </div>
            </div>
          
             <button className="color my-4">Save</button>
           
            </form>
        </div>
        )}

        my places
    </div>
    )
}