import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MemberForm from './components/MemberForm';
import AdminDashboard from './admin/Dashboard';
import TeamProfile from './admin/TeamProfile';
import Success from "./components/Success";

 

function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
       
        
      </nav>
      <Routes>
        <Route path="/" element={<MemberForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/team/:teamName" element={<TeamProfile />} />
        <Route path="/" element={<MemberForm />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      
       
  

    </div>
  );
}

export default App;
