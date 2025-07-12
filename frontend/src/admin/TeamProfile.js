import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://sports-member-backend.onrender.com/api';

function TeamProfile() {
  const { teamName } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    document.title = `${teamName} | Team Profile`;
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
    <div className="container my-5">
      <h2 className="mb-4 text-center">👥 Team: {teamName}</h2>

      <div className="mb-3">
        <Link className="btn btn-secondary" to="/admin">
          ← Back to Admin Dashboard
        </Link>
      </div>

      {members.length === 0 ? (
        <p>No members found for this team.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Sports</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, index) => (
                <tr key={m._id}>
                  <td>{index + 1}</td>
                  <td>{m.name}</td>
                  <td>{m.phone}</td>
                  <td>{m.sports && m.sports.length ? m.sports.join(', ') : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamProfile;
