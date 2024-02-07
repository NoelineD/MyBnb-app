const express = require('express');
const cors= require('cors');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("./models/User.js");
require('dotenv').config();
const app = express();

const bcryptSecret = bcrypt.genSaltSync(10);
// // on a rajouté Sync car cela empechait detre un string mais objet faisait crasher 1:08
const jwtSecret = 'heloddies894JF940rt';

app.use(express.json());

// Utilisation de CORS pour permettre toutes les origines
// app.use(cors());

// app.use(cors({
//     credentials:true,
//     origin:'http://localhost:5173',
// }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connexion à MongoDB établie');
})
.catch((error) => {
  console.error('Erreur de connexion à MongoDB:', error);
});

app.get('/test', (req, res) => {
    // console.log('Received test request');
    res.json({ message: 'test ok' });
});


app.post('/register', async (req,res) => {


    const {name,email,password} = req.body;

    try {
        const userDoc = await UserModel.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSecret),
        });
        res.json(userDoc);
    } catch (error) {
      res.status(422).json(error);
      // 422 status HTTP unprocessable entity
    }

});

app.post('/login', async (req,res) =>{
    const {email,password} = req.body;
    const userDoc = await UserModel.findOne({email});
// if not no then we find it
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            // on signe avec email et id et on verifie mdp correspond bien
            //fonction callback err, soit ca s'arrete a l'erreur soit ca repond en recup le cookie
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {},(err,token)=>{
                if (err) throw err;
                res.cookie('token', token).json({ token });
                // res.cookie('token', token).json({ 'pass ok' });
        });
            
        } else {
            res.status(422).json('pass not Ok');
        }
    } else {
        res.json('not found')
    }
})

// //password AdpB4WUtTXu4BOhG mise dans l'adresse de connection dans Connect puis dans l'api

// app.get('/profile',(req,res) =>{
//     res.json('user info');
// })
app.listen(4000);

//question gpt : qu'est ce que les cors ici? yarn add cors. Qu'est ce que les credentials?
// qu'est ce que yarn package pourquoi utiliser ici?
// note erreur ecrire User et pas UserModel a empeche la connexion avec le serveur et donc la verification de l'erreur
// ce qui a entraîné un err connexion failed