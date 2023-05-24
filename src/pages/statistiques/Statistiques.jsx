import { Pie ,Bar ,Line } from "react-chartjs-2";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "./statistiques.css"

const Statistiques = () => {
  const [accountData, setAccountData] = useState([]);
  const [error, setError] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Configure axios headers with token
  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/Api/V1/Alumni",
          config
        );
        setAccountData(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchData();

    // Destroy chart instance on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [config, chartInstance]);

  // Count accounts by country
  const paysCounts = {};
  for (const compte of accountData) {
    const pays = compte.pays;
    if (!paysCounts[pays]) {
      paysCounts[pays] = 1;
    } else {
      paysCounts[pays]++;
    }
  }

  // Create chart data object
  const accountChartData = {
    labels: Object.keys(paysCounts),
    datasets: [
      {
        label: "Accounts by Country",
        data: Object.values(paysCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Render country counts
  const countryCounts = Object.entries(paysCounts)
    .filter(([pays]) => !pays.includes("undefined"))
    .map(([pays, count]) => <div key={pays}>{`${pays}: ${count}`}</div>);










      // ste accounts by country
  const sociétéCounts = {};
  for (const compte of accountData) {
    const société = compte.société;
    if (!sociétéCounts[société]) {
        sociétéCounts[société] = 1;
    } else {
        sociétéCounts[société]++;
    }
  }

  // Create chart data object
  const accountChart2Data = {
    labels: Object.keys(sociétéCounts),
    datasets: [
      {
        label: "Accounts by company",
        data: Object.values(sociétéCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Render ste counts
  const steCounts = Object.entries(sociétéCounts)
    .filter(([société]) => !société.includes("undefined"))
    .map(([société, count]) => <div key={société}>{`${société}: ${count}`}</div>);



    







      // promotion accounts by country
  const promotionCounts = {};
  for (const compte of accountData) {
    const promotion = compte.promotion;
    if (!promotionCounts[promotion]) {
        promotionCounts[promotion] = 1;
    } else {
        promotionCounts[promotion]++;
    }
  }

  // Create chart data object
  const accountChart3Data = {
    labels: Object.keys(promotionCounts),
    datasets: [
      {
        label: "accounts by promotion",
        data: Object.values(promotionCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Render promotion counts
  const promoCounts = Object.entries(promotionCounts)
    .filter(([promotion]) => !promotion.includes("undefined"))
    .map(([promotion, count]) => <div key={promotion}>{`${promotion}: ${count}`}</div>);


    let totalDays = 0;
    let count = 0;
    for (const compte of accountData) {
      const diplome = compte.dateDiplome;
      const hire = compte.dateEmbouche;
      if (diplome && hire) {
        const diffTime = Math.abs(new Date(hire) - new Date(diplome));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        totalDays += diffDays;
        count++;
      } 
    }
    const avgChomage = totalDays / count;
    

  return (
    <div className="card1">
      <center><h1 className="h1">Chart Statistics Dashboard</h1></center>      
    <div className="charts">
      <h4 className="h4">Accounts by Country</h4>
      <Pie title="Accounts by Country" data={accountChartData}  className="canvas1"/>
      <h4 className="h4">Accounts by Company</h4>
      <Bar title="Accounts by Company" data={accountChart2Data} className="canvas" />
      <h4 className="h4">Accounts by promotion</h4>
      <Line title="accounts by promotion" data={accountChart3Data}  className="canvas"/>

    </div>
    <center><h3 className="h3">AVG UNEMOLOYMENT DAYS : {avgChomage} </h3></center>

    </div>
    
  );
};

export default Statistiques;
