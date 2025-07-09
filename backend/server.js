const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const memberRoutes = require('./routes/members');
const Member = require('./models/Member'); 

const app = express();

// ✅ Global CORS
app.use(cors({
  origin: 'https://oxygenfitness.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());
app.use('/api', memberRoutes);

// ✅ DB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Manual update route
app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// ✅ Listen on dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
