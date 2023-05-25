const User = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findById(id)
  
    if (!booking) {
      return res.status(404).json({error: 'No such user'})
    }
    
    res.status(200).json(user)
  }


//login user
const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.login(username, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
        
    }
}

//signup user
const signUpUser = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.signup(username, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
        
    }

}

//signup user
const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
      }
    
    const user = await User.findById(id)

    res.status(200).json(user);

    if (!user) {
        return res.status(404).json({error: 'No such user'})
        }

    res.status(200).json(user)
        
    }



module.exports = {getUser, getUsers, signUpUser, loginUser, updateUser,  }