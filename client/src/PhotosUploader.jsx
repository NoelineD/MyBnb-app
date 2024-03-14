import React, { useState } from "react";
import axios from "axios";

export function PhotosUploader({addedPhotos,onChange}){
const [photoLink, setPhotoLink]= useState('');

async function addPhotoByLink(ev){
     
        ev.preventDefault();
        const {data:filename}= await axios.post('/upload-by-link',{link:photoLink});
        onChange(prev=> {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        
        for(let i=0; i<files.length; i++){
            data.append('photos', files[i]);
        }
        // data.set('photos[]', [...files]); revoir pourquoi append et pas set

        // recuperer les data de la photo et nommer fichier photos 0 1...
     axios.post('/upload', data, {
    headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
    const {data:filenames} = response;
    onChange(prev=>{
        return [...prev, ...filenames];
    });
    }).catch(error => {
    console.error('Error uploading photo:', error);
    });
          
    // console.log({files});
    }

    return(
        <div>
            <div className="flex gap-2">
                    <input type="text" value={photoLink} onChange={ev =>setPhotoLink(ev.target.value)} placeholder={'Add jpg using link'}/>
                    <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photos</button>
                </div>
              

                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {/* Affichage des photos */}
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                    </div>
        ))}
          {/* Bouton d'upload */}
                <label className="h-32 flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer">
                <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                Upload from your device
                </label>
</div>
          
        </div>
    ); 
}

