import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PlacesPage(){
    const {action}= useParams();

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
                <label className="text-2xl mt-4">Title</label>
                <p className="text-gray-500 text-sm">little description of your appartment, must be catchy as in ad'</p>
                <input type='text' placeholder='title, for instance: mu lovely appartment'/>
                <label className="text-xl mt-4">Address</label>
                <p className="text-gray-500 text-sm">address to the place you are renting</p>
                <input type='text' placeholder="address"/>
                <label className="text-xl mt-4">Photos</label>
                <p className="text-gray-500 text-sm">more pics you'll get the better</p>
                <div className="flex gap-2">
                    <input type="text" placeholder={'Add jpg using link'}/>
                    <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photos</button>
                </div>
              
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-col-6 mt-2">
                    <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />  
                    </svg>

                    Upload from your device</button>
                </div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm"> Describe your lovely place. Try to be as catchy as you can !</p>
                <textarea/>
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm"> Select all the perks of your place</p>
                <div>
                    <div className="grid  mt-2 gap-1 grid-cols-2 md:grid-col-3 lg:grid-col-4 ">
                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>

                            <span>wifi</span>
                        </label>

                         <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>

                            <span>Free Parking Spot</span>
                        </label>

                         <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>

                            
                            <span>TV</span>
                        </label>

                         <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>


                            <span>Pets allowed</span>
                        </label>

                         <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                            </svg>

                            <span>Private entrance</span>
                        </label>
                    </div>
                </div>

                <label className="text-xl mt-4">Extra infos</label>
                <p className="text-gray-500 text-sm">house rules...</p>
                <label className="text-xl mt-4">ECheck in & out times, size & max guests</label>
                <p className="text-gray-500 text-sm">add times, remember to have some time window for cleaning the room before leaving</p>
                <textarea/> 

            <div className="grid">
                <div>
                    <h3>Check in Time</h3>
                    <input type="text"/>
                </div>
                <div>
                    <input type="text"/>
                </div>
                <div>
                    <input type="text"/>
                </div>
            </div>
            </form>
        </div>
        )}

        my places
    </div>
    )
}