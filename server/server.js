const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://notenoughsnow:aminos11@cluster0.33rqo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Listing = require('./models/Listing');

app.get('/listings', async (req,res) => {
    const listings = await Listing.find();

    res.json(listings);
});


app.post('/dog_walker/new', (req, res) => {
    const dog_walker = new Listing({
        walker_name: req.body.text,
    });

    dog_walker.save();

    res.json(dog_walker);
});

app.delete('/listings/delete/:id', async (req, res) => {
    const result = await Listing.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/dog_walker/rating/:id', async (req, res) => {
    const dog_walker = await Listing.findById(req.params.id);

    dog_walker.rating = 4;

    dog_walker.save();

    res.json(dog_walker);
})

app.listen(3001, () => console.log("Server started on port 3001"));

