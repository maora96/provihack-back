const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();
require('dotenv/config');

app.use(cors());
app.use(express.json());

// routes
const patientRoutes = require('./src/routes/patient')
const professionalRoutes = require('./src/routes/professional')
const recordRoutes = require('./src/routes/record')

// consuming routes
app.use("/patient", patientRoutes)
app.use("/professional", professionalRoutes)
app.use("/record", recordRoutes)

app.listen(8080);

// mongodb connection
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser:true}, () => {
    console.log("connected to database")
})