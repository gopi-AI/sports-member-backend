const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Create
router.post('/members', async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json(member);
});

// Get all
router.get('/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// Get by ID
router.get('/members/:id', async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
});

// Update
router.put('/members/:id', async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(member);
});

// Delete
router.delete('/members/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Get by team
router.get('/members/team/:team', async (req, res) => {
  const members = await Member.find({ team: req.params.team });
  res.json(members);
});

module.exports = router;

