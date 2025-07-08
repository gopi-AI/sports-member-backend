import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [searchQuery, setSearchQuery] = useState("");

  const teamOptions = [
    "Anonymous Avengers",
    "Bulls Team",
    "Royal Challengers Mysore",
    "Kasthuri Strikers",
    "Young Fighters",
    "Apex Titans",
    "None",
  ];

  const sportOptions = [
    "Cricket",
    "Badminton",
    "BenchPress Challenge",
    "DeadLift challenge",
    "Tug of War",
    "Circuit Challenges",
  ];

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        "https://sports-member-backend.onrender.com/api/members"
      );
      setMembers(res.data);
      setFilteredMembers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    let data = [...members];

    if (selectedTeam !== "All Teams") {
      data = data.filter((m) => m.team === selectedTeam);
    }

    if (searchQuery.trim() !== "") {
      data = data.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSport !== "All Sports") {
      data = data.filter((m) => m.sports.includes(selectedSport));
    }

    setFilteredMembers(data);
  }, [selectedTeam, selectedSport, searchQuery, members]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await axios.delete(
        `https://sports-member-backend.onrender.com/api/members/${id}`
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
        `https://sports-member-backend.onrender.com/api/members/${id}`,
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

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="All Teams">Sort By Teams</option>
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="All Sports">Sort By Sports</option>
            {sportOptions.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>No</th>
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
            {filteredMembers.map((member, index) => (
              <tr key={member._id}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>{member.age}</td>
                <td>{member.sex}</td>
                <td>
                  {member.sports.map((s, idx) => (
                    <span key={idx} className="badge bg-primary me-1">
                      {s}
                    </span>
                  ))}
                </td>
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
            {filteredMembers.length === 0 && (
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
