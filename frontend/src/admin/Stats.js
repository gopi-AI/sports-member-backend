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
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Stats = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://sports-member-backend.onrender.com/api/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sportsCounts = {};
  const teamCounts = {};
  const ageGroups = {
    "14-18 Years": 0,
    "19-25 Years": 0,
    "26-30 Years": 0,
    "30-35 Years": 0,
    "35-45 Years": 0,
    "45-50 Years": 0,
    "50-60 Years": 0,
    Above 60 Years: 0
  };

  members.forEach((member) => {
    // Count sports
    member.sports.forEach((sport) => {
      sportsCounts[sport] = (sportsCounts[sport] || 0) + 1;
    });

    // Count teams
    teamCounts[member.team] = (teamCounts[member.team] || 0) + 1;

    // Count age groups
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

  // Utility: generate distinct colors
  const getBarColors = (count) =>
    Array.from({ length: count }, () =>
      `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
    );

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: {
        anchor: "end",
        align: "top",
        color: "#000",
        font: { weight: "bold" },
        formatter: Math.round
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        ticks: { stepSize: 1 }
      }
    }
  };

  const makeBarData = (labels, data, label) => ({
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: getBarColors(labels.length),
        borderColor: "#333",
        borderWidth: 1
      }
    ]
  });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📊 Statistics Dashboard</h2>

      <div className="mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h4>Total Players Per Sport</h4>
        <Bar
          data={makeBarData(
            Object.keys(sportsCounts),
            Object.values(sportsCounts),
            "Number of Players"
          )}
          options={barOptions}
        />
      </div>

      <div className="mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h4>Total Members Per Team</h4>
        <Bar
          data={makeBarData(
            Object.keys(teamCounts),
            Object.values(teamCounts),
            "Team Members"
          )}
          options={barOptions}
        />
      </div>

      <div className="mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h4>Age Group Distribution</h4>
        <Bar
          data={makeBarData(
            Object.keys(ageGroups),
            Object.values(ageGroups),
            "Age Group Count"
          )}
          options={barOptions}
        />
      </div>
    </div>
  );
};

export default Stats;
