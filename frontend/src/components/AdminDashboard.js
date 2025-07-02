import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [filterTeam, setFilterTeam] = useState('');

  const loadMembers = async () => {
    const res = await axios.get('http://localhost:5000/api/members');
    setMembers(res.data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Delete this member?')) {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      loadMembers();
    }
  };

  const handleFilter = async () => {
    if(filterTeam === '') {
      loadMembers();
    } else {
      const res = await axios.get(`http://localhost:5000/api/members/team/${filterTeam}`);
      setMembers(res.data);
    }
  };

  return (
    <div>
      <h4>Admin Dashboard</h4>
      <div className="mb-3 d-flex">
        <input
          className="form-control me-2"
          placeholder="Filter by Team (e.g., Team A)"
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleFilter}>Filter</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Team</th>
            <th>Sports</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.team}</td>
              <td>{m.sports.join(', ')}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;

