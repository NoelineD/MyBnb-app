import {Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//chat gpt pourquoi axios, plus facile d'envoyer la requete pourquoi les evenement event? 
// axios.post on recupere les infos
export default function RegisterPage(){
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    async function registerUser(ev){
        ev.preventDefault(); 
        // prevent default pour ne pas que ça reload la page
        //on a mis en url par default localhost 4000 dans app.JSX
        // axios.get('/test');
        try {
        await axios.post('/register', {
            name,
            email,
            password,
        }
        );
        alert('Registration successfull. Now you can log in');
        } catch (e) {
        alert('Registration failed.Please try again');
        }

        
    }
    
    return(
    <div className="mt-4 grow flex items-center justify-around">
       <div className="mb-32">
            <h1 className="text-3xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto border" onSubmit={registerUser}>
                <input type="text" placeholder="John Doe" 
                value={name} 
                onChange= {ev=> setName(ev.target.value)}/>
                <input type="email" placeholder="your@email.com" 
                value={email} 
                onChange= {ev=> setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" 
                value={password} 
                onChange= {ev=> setPassword(ev.target.value)}/>
                <button className="color">validate</button>
                <div className="text-center py-2 text-gray-500">Already a member?  
                <Link to={"/login"} className="underline text-black">Login</Link>
                </div>

            </form>
        </div>
    </div>
    )
}