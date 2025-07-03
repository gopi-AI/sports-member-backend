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
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_WxcS1J_6tayj3HFh9apGgn9j-U71LA09w&s" class="img=rounded" />
        
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
