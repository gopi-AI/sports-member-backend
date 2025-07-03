import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://sports-member-backend.onrender.com/api';

function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/members`);
      setMembers(res.data);
      const teamNames = Array.from(
        new Set(res.data.map(m => m.team).filter(t => t && t !== 'None'))
      );
      setTeams(teamNames);
    } catch (err) {
      console.error('Error loading members:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this member?')) {
      await axios.delete(`${API_URL}/members/${id}`);
      loadMembers();
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h4>Teams</h4>
      <div className="list-group mb-4">
        {teams.map(team => (
          <Link
            key={team}
            to={`/team/${team}`}
            className="list-group-item list-group-item-action"
          >
            {team}
          </Link>
        ))}
      </div>

      <h4>All Members</h4>
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
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
