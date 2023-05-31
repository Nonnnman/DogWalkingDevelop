const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

//route imports
const userRoutes = require("./routes/user");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");

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

// GET dog walker details by ID
app.get('/api/dogwalkers/:id', (req, res) => {
    const { id } = req.params;
  
    // Retrieve dog walker details based on the provided id
    // You can use a database query or any other data retrieval method
  
    // Example code for retrieving dog walker details from a MongoDB database using Mongoose
    DogWalker.findById(id)
      .then(dogWalker => {
        if (!dogWalker) {
          return res.status(404).json({ message: 'Dog walker not found' });
        }
  
        // Send the dog walker details as a JSON response
        res.json(dogWalker);
      })
      .catch(error => {
        console.error('Error retrieving dog walker details', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  