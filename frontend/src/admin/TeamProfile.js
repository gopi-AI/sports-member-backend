import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://YOUR-BACKEND.onrender.com/api';

function TeamProfile() {
  const { teamName } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadTeamMembers();
  }, [teamName]);

  const loadTeamMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/members/team/${teamName}`);
      setMembers(res.data);
    } catch (err) {
      console.error('Error loading team members:', err);
    }
  };

  return (
    <div>
      <h2>Team: {teamName}</h2>
      <Link className="btn btn-secondary mb-3" to="/admin">
        Back to Admin Dashboard
      </Link>

      {members.length === 0 && <p>No members found for this team.</p>}

      {members.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Sports</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.phone}</td>
                <td>{m.sports.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TeamProfile;
