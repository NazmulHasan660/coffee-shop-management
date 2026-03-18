import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/reports/dashboard/");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to Coffee Shop Management System ☕</p>

      {!summary ? (
        <p>Loading dashboard...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          <div style={{ padding: "20px", border: "1px solid #ccc", width: "220px" }}>
            <h3>Total Products</h3>
            <p>{summary.total_products}</p>
          </div>

          <div style={{ padding: "20px", border: "1px solid #ccc", width: "220px" }}>
            <h3>Available Products</h3>
            <p>{summary.available_products}</p>
          </div>

          <div style={{ padding: "20px", border: "1px solid #ccc", width: "220px" }}>
            <h3>Out of Stock</h3>
            <p>{summary.out_of_stock_products}</p>
          </div>

          <div style={{ padding: "20px", border: "1px solid #ccc", width: "220px" }}>
            <h3>Total Categories</h3>
            <p>{summary.total_categories}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;