const express = require('express');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("./models/User.js");
const Place = require ('./models/place.js');
const imageDownloader= require('image-downloader');
const multer= require('multer');
const fs = require('fs');
require('dotenv').config();
const app = express();

const bunyan = require('bunyan'); // pour voir les logs

const bcryptSecret = bcrypt.genSaltSync(10);
// // on a rajouté Sync car cela empechait detre un string mais objet faisait crasher 1:08
const jwtSecret = 'heloddies894JF940rt';

app.use(express.json());
app.use(cookieParser());
//pour les chargement d'image dans l'ordi
app.use('/uploads', express.static(__dirname + '/uploads'));

// Configuration de Bunyan pour écrire les logs dans un fichier spécifique
const logger = bunyan.createLogger({
  name: 'myapp',
  streams: [
    { path: 'logs.log' } 
  ]
});

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
            jwt.sign({email:userDoc.email, id:userDoc._id, name:userDoc.name}, jwtSecret, {},(err,token)=>{
                if (err) throw err;
                res.cookie('token', token).json( userDoc );
                // res.cookie('token', token).json({ 'pass ok' });
        });
            
        } else { 
            res.status(422).json('pass not Ok');
        }
    } else {
        res.json('not found')
    }
})

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user)=> {
      if (err) throw err;
      res.json(user);
    })
  } else {
    res.json({});
  }
  // res.json({token});

});

app.post('/logout', async (req,res) =>{
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;

  // Vérifier si l'URL est fournie
  if (!link) {
    return res.status(400).json({ error: 'L\'URL de l\'image est requise' });
  }

  try {
    const newName = 'photo' + Date.now() + '.jpg';

    // Télécharger l'image depuis l'URL
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });

    res.json(newName);
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors du téléchargement de l\'image' });
  }
});


const path = require('path');
const photosMiddleware = multer({dest:'uploads/'})
app.post('/upload',photosMiddleware.array('photos',100), async (req,res) =>{
  const uploadedFiles= [];
  for (let i=0; i< req.files.length; i++){
    const { path: filePath, originalname } = req.files[i]; // Utilisation de "path" au lieu de "filePath"
    console.log('File path:', filePath);
    console.log('File path:', filePath);
    const parts = originalname.split('.');
    const ext= parts[parts.length - 1];
    const newPath= filePath + '.' + ext;
    fs.renameSync(filePath, newPath);
    //pour supprimer le chemin d'acces au repertoire initial upload
    uploadedFiles.push(path.basename(newPath));
    // uploadedFiles.push(newPath.replace('uploads/',''));
  }
  res.json(uploadedFiles);
  
});

//
app.post('/places', (req,res) =>{

  const {token} = req.cookies;
  const {title, address, addedPhotos, 
         description, perks, extraInfo, 
         checkIn, checkOut, maxGuests,price,
  }= req.body
  jwt.verify(token, jwtSecret, {}, async (err, user)=> {
    if (err) throw err;

    const placeDoc = await Place.create({
      owner: user.id,
      title, address, photos: addedPhotos, 
      description, perks, extraInfo, 
      checkIn, checkOut, maxGuests, price,
    });
      res.json(placeDoc);
  });
});

//affichage location pour un user
app.get('/user-places', (req,res) =>{
   const {token} = req.cookies;
jwt.verify(token, jwtSecret, {}, async (err, user)=> {
  const {id} = user;
  res.json(await Place.find({owner:id}) );
})
});

//affichage location correspondant a l'id
app.get('/places/:id', async (req,res) =>{
const {id}= req.params;
 res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
const {token} = req.cookies;
const {id,title, address, addedPhotos, 
      description, perks, extraInfo, 
      checkIn, checkOut, maxGuests,price,
  }= req.body;
//first on recupere les infos qu'on veut fetch puis on fetch
jwt.verify(token, jwtSecret, {}, async (err, user)=> {
  if (err) throw err;
  //user info then we fetch
  const placeDoc = await Place.findById(id);
  //place owner est il le meme que le user
  if (user.id === placeDoc.owner.toString()) {
    placeDoc.set({
      owner: user.id,
      title, address, addedPhotos, description, perks,
      extraInfo, checkIn, checkOut, maxGuests, price,
    })
    await placeDoc.save();
    res.json('ok');
  }
});
});

//affichage locations accueil
app.get('/places', async (req,res) =>{

 res.json( await Place.find());

});

app.listen(4000);

//question gpt : qu'est ce que les cors ici? yarn add cors. Qu'est ce que les credentials?
// qu'est ce que yarn package pourquoi utiliser ici?
// note erreur ecrire User et pas UserModel a empeche la connexion avec le serveur et donc la verification de l'erreur
// ce qui a entraîné un err connexion failed