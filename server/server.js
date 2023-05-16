const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://notenoughsnow:aminos11@cluster0.33rqo.mongodb.net/?retryWrites=true&w=majority", {

})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

app.listen(3001, () => console.log("Server started on port 3001"));