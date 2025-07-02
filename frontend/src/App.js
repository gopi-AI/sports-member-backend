import React from 'react';
import MemberForm from './components/MemberForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Sports Member Management</h1>
      <MemberForm />
      <hr />
      <AdminDashboard />
    </div>
  );
}

export default App;

