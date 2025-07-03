import React, { useState } from "react";
import axios from "axios";

function MemberForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    weight: "",
    age: "",
    sex: "",
    sports: [],
    team: "",
  });

  const [loading, setLoading] = useState(false);

  const sportOptions = [
    "Cricket",
    "Badminton",
    "Barbell Bench Press",
    "Barbell Squats",
    "Dead Lift",
  ];

  const teamOptions = [
    "Anonymous Avengers",
    "Bulls Team",
    "Royal Challengers Mysore",
    "Kasthuri Strikers",
    "Young Fighters",
    "Apex Titans",
    "None",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSportsChange = (e) => {
    const { value, checked } = e.target;
    let updatedSports = [...formData.sports];

    if (checked) {
      updatedSports.push(value);
    } else {
      updatedSports = updatedSports.filter((s) => s !== value);
    }

    setFormData({ ...formData, sports: updatedSports });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://YOUR-BACKEND-URL.onrender.com/api/members",
        formData
      );
      alert("Member saved successfully!");
      setFormData({
        name: "",
        phone: "",
        weight: "",
        age: "",
        sex: "",
        sports: [],
        team: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error saving member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Member Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Weight</label>
              <input
                type="number"
                className="form-control"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Sex</label>
              <select
                className="form-select"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
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
            <label className="form-label">Team</label>
            <select
              className="form-select"
              name="team"
              value={formData.team}
              onChange={handleChange}
              required
            >
              <option value="">Select Team</option>
              {teamOptions.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberForm;
