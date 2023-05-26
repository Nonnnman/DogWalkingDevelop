const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');


const ProfileSchema = new Schema({
    username: {
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
        required: false,
    },
    
})

// static signup method
ProfileSchema.statics.signup = async function(username, password) {

    //validation
    if (!username || !password){
        throw Error('All fields must be filled');
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }
    

    const exists = await this.findOne({ username });

    if (exists) {
        throw Error('Username already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({ username, password: hash});

    return user;
}

ProfileSchema.statics.login = async function(username, password) {
    //validation
    if (!username || !password){
        throw Error('All fields must be filled');
    }
    
    const user = await this.findOne({ username });

    if (!user) {
        throw Error('User does not exist');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model("Profile",ProfileSchema);