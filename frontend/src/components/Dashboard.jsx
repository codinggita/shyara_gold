import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
      navigate("/login"); // Redirect to login if role is not found
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  return (
    <div>
      {role === "user" && <UserPanel />}
      {role === "admin" && <AdminPanel />}
      {role === "owner" && <OwnerPanel />}
    </div>
  );
};

export default Dashboard;
