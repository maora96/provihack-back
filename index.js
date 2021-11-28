const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv/config')

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
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true}, () => {
    console.log("connected to database")
})