const mongoose= require('mongoose');
const PlaceSchema = new mongoose.Schema({
    //owner will be a user so the id is the object
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title: String,
    address: String,
    addedPhotos: [String], //addedPhotos au lieu de photo pour que ça corresponde a notre const
    description: String,
    perks:[String],
    extraInfo: String,
    checkIn: Number,
    checkOut:Number,
    maxGuests:Number
});

const PlaceModel = mongoose.model('Place', PlaceSchema);

module.exports = PlaceModel;