const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require('./routes/movieRoutes');
const genreRoutes = require('./routes/genreRoutes');
const theaterRoutes = require('./routes/theaterRoutes');
const roomRoutes = require('./routes/roomRoutes');
const seatRoutes = require('./routes/seatRoutes');
const mongoose = require('mongoose');
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();
const createDefaultRoles = require('./controllers/roleController');

const app = express();

// Middleware
app.use(express.json());

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    createDefaultRoles();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/seats', seatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

