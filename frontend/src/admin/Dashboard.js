import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [members, setMembers] = useState([]);

  const teamOptions = [
    "Anonymous Avengers",
    "Bulls Team",
    "Royal Challengers Mysore",
    "Kasthuri Strikers",
    "Young Fighters",
    "Apex Titans",
    "None",
  ];

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        "https://sports-member-backend.onrender.com/api"
      );
      setMembers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await axios.delete(
        `https://YOUR-BACKEND-URL.onrender.com/api/members/${id}`
      );
      toast.success("Member deleted");
      fetchMembers();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting member");
    }
  };

  const handleAssignTeam = async (id, newTeam) => {
    if (!newTeam) return;

    try {
      await axios.put(
        `https://YOUR-BACKEND-URL.onrender.com/api/members/${id}`,
        { team: newTeam }
      );
      toast.success("Team updated");
      fetchMembers();
    } catch (error) {
      console.error(error);
      toast.error("Error updating team");
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Sports</th>
              <th>Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.age}</td>
                <td>{member.sex}</td>
                <td>{member.sports.join(", ")}</td>
                <td>
                  <select
                    className="form-select"
                    value={member.team}
                    onChange={(e) =>
                      handleAssignTeam(member._id, e.target.value)
                    }
                  >
                    {teamOptions.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
