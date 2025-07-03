import React, { useState } from 'react';
import axios from 'axios';

function MemberForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    weight: '',
    age: '',
    sex: '',
    sports: [],
    team: 'None'
  });

  const sportOptions = [
  'Cricket',
  'Badminton',
  'Barbell Bench Press',
  'Barbell Squats',
  'Dead Lift'
];

  const teams = ['Team A', 'Team B', 'Team C', 'None'];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const handleSportsChange = e => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setFormData({...formData, sports: options });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://sports-member-backend.onrender.com/api/members', formData);
    alert('Member saved!');
    setFormData({
      name: '',
      phone: '',
      weight: '',
      age: '',
      sex: '',
      sports: [],
      team: 'None'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-4">
      <h4>Add New Member</h4>
      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Phone</label>
        <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Weight (kg)</label>
        <input type="number" className="form-control" name="weight" value={formData.weight} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Age</label>
        <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Sex</label>
        <select className="form-select" name="sex" value={formData.sex} onChange={handleChange}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
     <div className="mb-3">
  <label className="form-label">Sports</label>
  <div className="row">
    {sportOptions.map((sport) => (
      <div className="col-md-4" key={sport}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="sports"
            value={sport}
            checked={formData.sports.includes(sport)}
            onChange={handleSportsChange}
          />
          <label className="form-check-label">{sport}</label>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="mb-3">
        <label>Team</label>
    <select className="form-select" name="team" value={formData.team} onChange={handleChange}>
  <option value="">Select Team</option>
  <option value="Anonymous Avengers">Anonymous Avengers</option>
  <option value="Bulls Team">Bulls Team</option>
  <option value="Royal Challengers Mysore">Royal Challengers Mysore</option>
  <option value="Kasthuri Strikers">Kasthuri Strikers</option>
  <option value="Young Fighters">Young Fighters</option>
  <option value="Apex Titans">Apex Titans</option>
  <option value="None">None</option>
</select>

      </div>
      <button className="btn btn-primary">Save Member</button>
    </form>
  );
}

export default MemberForm;

