const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const cors = require('cors');

connectDb();

const app = express();

const port = process.env.PORT || 5000;

// Define the origins that are allowed to access your server

// CORS middleware configuration
app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include credentials, if needed (e.g., cookies)
    optionsSuccessStatus: 204, // An HTTP status to respond with for preflight requests
  }));
  
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))