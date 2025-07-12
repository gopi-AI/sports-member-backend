import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://sports-member-backend.onrender.com/api/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sportsOptions = [
    "Cricket",
    "Badminton",
    "BenchPress Challenge",
    "DeadLift challenge",
    "Tug of War",
    "Circuit Challenges",
  ];

  const ageGroups = {
    "14-18": 0,
    "19-25": 0,
    "26-30": 0,
    "30-35": 0,
    "35-45": 0,
    "45-50": 0,
    "50-60": 0,
    Others: 0,
  };

  const teamCounts = {};
  const sportsCounts = {};

  members.forEach((member) => {
    // Count by sports
    member.sports.forEach((sport) => {
      sportsCounts[sport] = (sportsCounts[sport] || 0) + 1;
    });

    // Count by team
    teamCounts[member.team] = (teamCounts[member.team] || 0) + 1;

    // Count by age group
    const age = member.age;
    if (age >= 14 && age <= 18) ageGroups["14-18"]++;
    else if (age >= 19 && age <= 25) ageGroups["19-25"]++;
    else if (age >= 26 && age <= 30) ageGroups["26-30"]++;
    else if (age >= 31 && age <= 35) ageGroups["30-35"]++;
    else if (age >= 36 && age <= 45) ageGroups["35-45"]++;
    else if (age >= 46 && age <= 50) ageGroups["45-50"]++;
    else if (age >= 51 && age <= 60) ageGroups["50-60"]++;
    else ageGroups["Others"]++;
  });

  const makeBarChart = (labels, data, label) => ({
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="container my-5">
      <h2 className="mb-4">Statistics</h2>

      <div className="mb-5">
        <h4>Players Per Sport</h4>
        <Bar data={makeBarChart(Object.keys(sportsCounts), Object.values(sportsCounts), "Players")} />
      </div>

      <div className="mb-5">
        <h4>Members Per Team</h4>
        <Bar data={makeBarChart(Object.keys(teamCounts), Object.values(teamCounts), "Team Members")} />
      </div>

      <div className="mb-5">
        <h4>Age Group Distribution</h4>
        <Bar data={makeBarChart(Object.keys(ageGroups), Object.values(ageGroups), "Age Groups")} />
      </div>
    </div>
  );
};

export default Stats;

