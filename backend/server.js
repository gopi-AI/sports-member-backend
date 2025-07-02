const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const memberRoutes = require('./routes/members');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', memberRoutes);

// Update this with your MongoDB connection string
mongoose.connect('mongodb://localhost:27017/sportsmembers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

