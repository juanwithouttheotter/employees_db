const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/employees', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.listen(PORT, () => {console.log(`App is listening to port ${PORT}`)});

