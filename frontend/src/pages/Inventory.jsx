import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await api.get("/inventory/");
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getStatusClass = (status) => {
    if (status === "In Stock") return "status-pill status-in";
    if (status === "Low Stock") return "status-pill status-low";
    return "status-pill status-out";
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Inventory</h1>
      <p className="page-subtitle">Track stock levels and product availability.</p>

      <div className="table-card">
        <h2 className="section-title">Inventory Status</h2>

        {loading ? (
          <p>Loading inventory...</p>
        ) : inventoryItems.length === 0 ? (
          <p>No inventory data found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock Quantity</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.stock_quantity}</td>
                    <td>{item.is_available ? "Yes" : "No"}</td>
                    <td>
                      <span className={getStatusClass(item.stock_status)}>
                        {item.stock_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inventory;