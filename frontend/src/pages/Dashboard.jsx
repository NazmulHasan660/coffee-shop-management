import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, Pie, Doughnut, PolarArea } from "react-chartjs-2";

ChartJS.register(...registerables);

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!summary) return <div style={styles.loading}>Loading...</div>;

  const inventoryData = {
    labels: ["Total", "Available", "Low Stock", "Out of Stock"],
    datasets: [
      {
        label: "Inventory Status",
        data: [
          summary.total_products,
          summary.available_products,
          summary.low_stock_products,
          summary.out_of_stock_products,
        ],
        backgroundColor: ["#7a5439", "#2fb463", "#f1c40f", "#e74c3c"],
        borderRadius: 4,
      },
    ],
  };

  const distributionData = {
    labels: ["Available", "Out of Stock", "Low Stock"],
    datasets: [
      {
        data: [
          summary.available_products,
          summary.out_of_stock_products,
          summary.low_stock_products,
        ],
        backgroundColor: ["#2fb463", "#e74c3c", "#f1c40f"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ["Total", "Available", "Categories"],
    datasets: [
      {
        data: [
          summary.total_products,
          summary.available_products,
          summary.total_categories,
        ],
        backgroundColor: ["#3a281f", "#8b5e3c", "#d2b28d"],
        borderWidth: 1,
      },
    ],
  };

  const polarData = {
    labels: ["Products", "Available", "Low Stock", "Out of Stock"],
    datasets: [
      {
        data: [
          summary.total_products,
          summary.available_products,
          summary.low_stock_products,
          summary.out_of_stock_products,
        ],
        backgroundColor: [
          "rgba(122, 84, 57, 0.75)",
          "rgba(47, 180, 99, 0.75)",
          "rgba(241, 196, 15, 0.75)",
          "rgba(231, 76, 60, 0.75)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          padding: 10,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    elements: {
      line: {
        tension: 0.35,
        borderWidth: 2,
      },
      point: {
        radius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  const stats = [
    ["Total Products", summary.total_products],
    ["Available", summary.available_products],
    ["Out of Stock", summary.out_of_stock_products],
    ["Low Stock", summary.low_stock_products],
    ["Categories", summary.total_categories],
  ];

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome to your Coffee Shop Management overview.
        </p>

        <div
          style={{
            ...styles.cardGrid,
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          {stats.map((item, i) => (
            <div key={i} style={styles.card}>
              <h3 style={styles.cardTitle}>{item[0]}</h3>
              <p style={styles.cardValue}>{item[1]}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            ...styles.chartGrid,
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Stock Levels (Bar)</h3>
            <div style={styles.chartBox}>
        <Bar data={inventoryData} options={barOptions} />
             </div>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Product Ratio (Pie)</h3>
            <div style={styles.chartBox}>
          <Bar data={inventoryData} options={barOptions} />
          </div>
          
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Inventory Trend (Line)</h3>
            <div style={styles.chartBox}>
             <Bar data={inventoryData} options={barOptions} />
           </div>
          </div>

          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Quick Overview (Doughnut)</h3>
            <div style={styles.chartBox}>
              <Bar data={inventoryData} options={barOptions} />
           </div>
          </div>
        </div>

        <div style={styles.bottomWrapper}>
          <div
            style={{
              ...styles.bottomChartCard,
              width: isMobile ? "100%" : "520px",
            }}
          >
            <h3 style={{ ...styles.chartTitle, textAlign: "center" }}>
              Stock Distribution (Polar Area)
            </h3>
            <div style={styles.bottomChartBox}>
              <PolarArea data={polarData} options={commonOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f5efe8",
    minHeight: "100vh",
    padding: "18px 10px 30px",
  },

  wrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: "#efe7dd",
    borderRadius: "22px",
    padding: "26px 14px 24px",
  },

  loading: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5efe8",
    color: "#3a281f",
    fontSize: "20px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "800",
    color: "#20120c",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "22px",
    color: "#7a6a5d",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  cardGrid: {
    display: "grid",
    gap: "16px",
    marginBottom: "20px",
  },

  card: {
    background: "#fffaf5",
    border: "1px solid #eadfce",
    borderRadius: "18px",
    padding: "18px 18px 20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },

  cardTitle: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#6f6258",
  },

  cardValue: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
    color: "#1d120d",
  },

  chartGrid: {
    display: "grid",
    gap: "18px",
  },

  chartCard: {
  background: "#fffaf5",
  border: "1px solid #eadfce",
  borderRadius: "18px",
  padding: "14px",
  boxSizing: "border-box",
  width: "100%",
  overflow: "hidden"
},

  chartTitle: {
    margin: "0 0 14px 0",
    fontSize: "18px",
    fontWeight: "800",
    color: "#1f130d",
  },

 chartBox: {
  position: "relative",
  width: "100%",
  height: "220px",
  overflow: "hidden"
},

  bottomWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "18px",
  },

  bottomChartCard: {
    background: "#fffaf5",
    border: "1px solid #eadfce",
    borderRadius: "18px",
    padding: "18px 16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
  },

  bottomChartBox: {
    width: "100%",
    height: "280px",
  },
};

export default Dashboard;
