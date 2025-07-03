import React from "react";
import { Link } from "react-router-dom";
 
function Success() {
  return (
    <div className="container py-5 text-center">
      <div className="alert alert-success">
        <h2 className="mb-4">✅ Member Registered Successfully!</h2>
        <Link className="btn btn-primary" to="/">
          Register Another
        </Link>
      </div>
    </div>
  );
}

export default Success;
