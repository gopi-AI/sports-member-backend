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
    document.title = "Some Stats | Oxygen Fitness";
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
    "31-35 Years": 0,
    "36-45 Years": 0,
    "46-50 Years": 0,
    "51-60 Years": 0,
    "Above 60 Years": 0
  };

  members.forEach((member) => {
    // Sports count
    member.sports.forEach((sport) => {
      sportsCounts[sport] = (sportsCounts[sport] || 0) + 1;
    });

    // Team count
    teamCounts[member.team] = (teamCounts[member.team] || 0) + 1;

    // Age group distribution
    const age = member.age;
    if (age >= 14 && age <= 18) ageGroups["14-18 Years"]++;
    else if (age >= 19 && age <= 25) ageGroups["19-25 Years"]++;
    else if (age >= 26 && age <= 30) ageGroups["26-30 Years"]++;
    else if (age >= 31 && age <= 35) ageGroups["31-35 Years"]++;
    else if (age >= 36 && age <= 45) ageGroups["36-45 Years"]++;
    else if (age >= 46 && age <= 50) ageGroups["46-50 Years"]++;
    else if (age >= 51 && age <= 60) ageGroups["51-60 Years"]++;
    else ageGroups["Above 60 Years"]++;
  });

  const getBarColors = (count) =>
    Array.from({ length: count }, () =>
      hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)
    );

  const sharedOptions = (maxY) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
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
        suggestedMax: maxY,
        ticks: { stepSize: 5 }
      },
      x: {
        ticks: { color: "#000", autoSkip: false }
      }
    }
  });

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
        <h4>Players Per Sport</h4>
        <Bar
          data={makeBarData(
            Object.keys(sportsCounts),
            Object.values(sportsCounts),
            "Number of Players"
          )}
          options={sharedOptions(80)}
        />
      </div>

      <div className="mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h4>Members Per Team</h4>
        <Bar
          data={makeBarData(
            Object.keys(teamCounts),
            Object.values(teamCounts),
            "Team Members"
          )}
          options={sharedOptions(30)}
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
          options={sharedOptions(70)}
        />
      </div>
    </div>
  );
};

export default Stats;
