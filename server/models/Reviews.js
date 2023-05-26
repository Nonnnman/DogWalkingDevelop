const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Profile = require('./Profile');


const ReviewSchema = new Schema({
    comment: {
        type: String,
    },
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    dogWalkerId: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
});
ReviewSchema.post('save', async function (doc, next) {
    try{
        const userReviews = await Reviews.find({dogWalkerId: doc.dogWalkerId});
        console.log('user revires', userReviews);
        const user =await Profile.findById(doc.dogWalkerId);
        console.log('user ', user.rate);
        
        if (user){
            if (userReviews.length>0){
                if (!user.rate){
                    user.rate = 0;
                }
                let sum = user.rate * (userReviews.length-1);
                sum += doc.rate;
                user.rate = sum / userReviews.length;
            }
            await user.save();
        }
        
        next();
    }catch(error){
        next(error);
    }
    
})

const Reviews = mongoose.model("Review", ReviewSchema);

module.exports = Reviews;