const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');


const DogWalkerProfileSchema = new Schema({
    dogwalker: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    
})

// static signup method
DogWalkerProfileSchema.statics.signup = async function(dogwalker, password) {

    //validation
    if (!dogwalker || !password){
        throw Error('All fields must be filled');
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }
    

    const exists = await this.findOne({ dogwalker });

    if (exists) {
        throw Error('Username already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const dogWalker = await this.create({ dogwalker, password: hash});

    return dogwalker;
}

DogWalkerProfileSchema.statics.login = async function(dogwalker, password) {
    //validation
    if (!dogwalker || !password){
        throw Error('All fields must be filled');
    }
    
    const dogWalker = await this.findOne({ dogwalker });

    if (!user) {
        throw Error('User does not exist');
    }

    const match = await bcrypt.compare(password, dogWalker.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model("DogWalkerProfile",DogWalkerProfileSchema);