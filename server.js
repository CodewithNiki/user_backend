const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const cors = require('cors');

connectDb();

const app = express();

const port = process.env.PORT || 5000;

// Define the origins that are allowed to access your server
const allowedOrigins = ['http://localhost:5173', 'https://your-frontend-domain.com'];

// CORS middleware configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))