import connectDB from "./app/config/mongo";

require('dotenv').config();
import *  as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import merchandise from './app/routes/merchandise';
import users from './app/routes/users';
const app = express();
const PORT = 3000;
connectDB().then(r => console.log('connected with mongo db')); // Connect to MongoDB




app.use(morgan('common'));
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/merchandise', merchandise);
app.use('/users', users);

app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: false,
    parameterLimit: 20000,
  })
);


// Disable views cache
app.set('view cache', false);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});