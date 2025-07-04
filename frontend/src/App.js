import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MemberForm from './components/MemberForm';
import Dashboard from './admin/Dashboard';
import TeamProfile from './admin/TeamProfile';
import Success from "./components/Success";

   
  
function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
       <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_WxcS1J_6tayj3HFh9apGgn9j-U71LA09w&s"
    class="rounded-circle img-thumbnail"
    style="width:120px; height:120px; object-fit:cover;"
    alt="Profile"
  />
        
      </nav>
      <Routes>
        <Route path="/" element={<MemberForm />} />
        
        <Route path="/team/:teamName" element={<TeamProfile />} />
        <Route path="/" element={<MemberForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      
       
  

    </div>
  );
}

export default App;
