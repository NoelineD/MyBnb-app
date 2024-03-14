import React, { useState, useEffect } from "react";
import axios from "axios";
import Perks from "./perks";
import { PhotosUploader } from './photosUploader';
import AccountNav from "./AccountNav";
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage(){
const{id} = useParams();
const [title,setTitle]= useState('');
const [address, setAddress]= useState('');
const [addedPhotos, setAddedPhotos]= useState([]);
const [description, setDescription]= useState('');
const [extraInfo, setExtraInfo]= useState('');
const [checkIn, setCheckIn]= useState('');
const [checkOut, setCheckOut]= useState('');
const [maxGuests, setMaxGuests]= useState('');
const [perks, setPerks] = useState([]);
const [redirect, setRedirect] = useState(false);
useEffect(() => {
    if(!id){
        return;
    }
    axios.get('/places/'+id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.info);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
    })
},[id])

function preInput (header,description){
    return (
<>
    {inputHeader(header)}
    {inputDescription(description)}
</>
     );
}

    
async function savePlace(ev){
ev.preventDefault();
const placeData ={
    title, address, addedPhotos, 
    description, perks, extraInfo, 
    checkIn, checkOut,maxGuests
};
    if(id) {
       await axios.put('/places', {
       id, ...placeData

    });
        setRedirect(true);
    } else {
    //save a new place
       await axios.post('/places', placeData);
        setRedirect(true);
    }
  
    }

    if (redirect) {
        return <Navigate to="/account/places"/>;
    }

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

    return(
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title','little description of your appartment, must be catchy as in ad')}
                <input type='text' value={title} onChange={ev =>setTitle(ev.target.value)} placeholder='title, for instance: my lovely appartment'/>

                {preInput('Address','address to the place you are renting')}
                <input type='text' value={address} onChange={ev =>setAddress(ev.target.value)} placeholder="address"/>

                {preInput('Photos','more pics you get the better')}

                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                
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
        )
}

