const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const memberRoutes = require('./routes/members');

const app = express();


app.use(cors({
  origin: 'https://oxygenfitness.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api', memberRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body; // Should contain e.g., { team: "Bulls Team" }

  try {
    const updatedMember = await Member.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update member' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
