import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
function MemberForm() {
  const navigate = useNavigate();

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
    "tug of war",
    "circuit challenges",
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

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone must be 10 digits.");
      return false;
    }
    if (formData.weight < 1) {
      toast.error("Weight must be positive.");
      return false;
    }
    if (formData.age < 1) {
      toast.error("Age must be positive.");
      return false;
    }
    if (!formData.sex) {
      toast.error("Please select sex.");
      return false;
    }
    if (formData.sports.length === 0) {
      toast.error("Select at least one sport.");
      return false;
    }
    if (!formData.team) {
      toast.error("Select a team.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(
        "https://sports-member-backend.onrender.com/api/members",
        formData
      );
      toast.success("Member saved successfully!");

      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Error saving member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
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
              maxLength="10"
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
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Sex</label>
              <select
                className="form-select"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
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
