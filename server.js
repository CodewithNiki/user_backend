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
app.use(cors());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http//localhost:5173", "http//localhost:5173/contacts", "http//localhost:5173/contacts/contactForm", "https://users-crudapp.onrender.com/", "https://users-crudapp.onrender.com/contacts", "https://users-crudapp.onrender.com/register", "https://users-crudapp.onrender.com/login");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origins, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})
  
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))