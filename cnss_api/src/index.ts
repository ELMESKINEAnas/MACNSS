import express from 'express';
import router from './api/routes/cnam.routes';
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from "mongoose";
import Prouter from "./api/routes/patient.routes";
import Arouter from "./api/routes/agent.routes";
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



mongoose.connect('mongodb+srv://redroot:pwd12331@cnam.hwnew.mongodb.net/cnam?retryWrites=true&w=majority', () => {
    console.log('connected to mongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Error in DB connection: ' + err);
    process.exit(1);
});


// ** routes //
app.use('/cnam', router);
app.use('/patient', Prouter);
app.use('/agent', Arouter);


app.listen(4000, () => {
    console.log('server is running on port', 4000);
});