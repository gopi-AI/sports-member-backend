import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MemberForm from './components/MemberForm';
import AdminDashboard from './admin/Dashboard';
import TeamProfile from './admin/TeamProfile';

function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
        <Link className="btn btn-primary me-2" to="/">Home</Link>
        
      </nav>
      <Routes>
        <Route path="/" element={<MemberForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/team/:teamName" element={<TeamProfile />} />
      </Routes>
    </div>
  );
}

export default App;
