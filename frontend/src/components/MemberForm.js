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

  const sportsOptions = ['Football', 'Tennis', 'Basketball', 'Cricket'];
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
        <label>Sports</label>
        <select multiple className="form-select" onChange={handleSportsChange}>
          {sportsOptions.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label>Team</label>
        <select className="form-select" name="team" value={formData.team} onChange={handleChange}>
          {teams.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <button className="btn btn-primary">Save Member</button>
    </form>
  );
}

export default MemberForm;

