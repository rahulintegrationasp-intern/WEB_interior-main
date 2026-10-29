require("dotenv").config();
const express = require('express');
const app = express();
const connection = require("./db");
const cors = require('cors');
const bodyParser = require('body-parser');

const cloudinary = require('cloudinary').v2;

const projectRoutes = require('./routes/project')
const formRoutes = require('./routes/form');

connection();




cloudinary.config({
    
    cloud_name:  process.env.CN,
    api_key: process.env.AK,
    api_secret: process.env.AS
});


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/project", projectRoutes);
app.use("/api/form", formRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Server is running on port ${port}...`));