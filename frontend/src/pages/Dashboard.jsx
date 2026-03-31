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
    <div className="page-container">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Welcome to your Coffee Shop Management overview.
      </p>

      {!summary ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="card-grid">
          <div className="summary-card">
            <h3>Total Products</h3>
            <p>{summary.total_products}</p>
          </div>

          <div className="summary-card">
            <h3>Available Products</h3>
            <p>{summary.available_products}</p>
          </div>

          <div className="summary-card">
            <h3>Out of Stock</h3>
            <p>{summary.out_of_stock_products}</p>
          </div>

          <div className="summary-card">
            <h3>Low Stock</h3>
            <p>{summary.low_stock_products}</p>
          </div>

          <div className="summary-card">
            <h3>Total Categories</h3>
            <p>{summary.total_categories}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;