const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const routes = require('./routes');

const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/employees', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.listen(port, () => {console.log(`App is listening to port ${port}`)});

