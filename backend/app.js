const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/userRouter');

dotenv.config()
const app = express()

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())
app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('Server is working on port 5000')
    mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error))
})