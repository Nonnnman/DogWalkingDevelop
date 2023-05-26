const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const {getFilteredUsers } = require("./controllers/userController");
dotenv.config()

//route imports
const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const Profile = require('./models/Profile');
const Reviews = require('./models/Reviews');

const app = express();

app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


app.use('/api/user', userRoutes)
app.use('/api/listings',listingRoutes)
app.use('/api/bookings',bookingRoutes)


mongoose.connect("mongodb+srv://"+process.env.NAME+":"+process.env.PASS+"@cluster0.33rqo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);



app.listen(process.env.PORT, () => console.log("Server started on port 3001"));

app.post('/api/review', async(req,res)=>{
    const params = req.body
    console.log(params);
    const review = Reviews(params);
    try{
        const result = await review.save();
        res.json({data:result, message:"review created successfully"}); 
    }catch(error){
        res.status(400).json(error);
    } 
});