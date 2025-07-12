import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MemberForm from './components/MemberForm';
import Dashboard from './admin/Dashboard';
import TeamProfile from './admin/TeamProfile';
import Success from "./components/Success";
import Stats from './admin/Stats';

function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4 text-center">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_WxcS1J_6tayj3HFh9apGgn9j-U71LA09w&s"
          className="rounded-circle img-thumbnail"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
          alt="Profilepic"
        />
      </nav>
      <Routes>
        <Route path="/" element={<h2 className="text-center text-danger">Registration is Closed</h2>} />
        <Route path="/anonymous" element={<MemberForm />} />
        <Route path="/team/:teamName" element={<TeamProfile />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/stats" element={<Stats />} />    
      </Routes>
    </div>
  );
}

export default App;
