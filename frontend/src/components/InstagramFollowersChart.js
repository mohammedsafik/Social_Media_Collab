import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getFollowersData } from '../services/instagramService';
import '../styles/InstagramChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InstagramFollowersChart = () => {
  const [followersData, setFollowersData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFollowersData();
  }, []);

  const fetchFollowersData = async () => {
    try {
      const data = await getFollowersData();
      
      const transformedData = {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'Instagram Followers',
          data: data.map(item => item.followers),
          fill: false,
          borderColor: '#E1306C', // Instagram brand color
          backgroundColor: '#E1306C',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      };
      
      setFollowersData(transformedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Instagram Followers Growth',
        font: {
          size: 20,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 14
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Followers Count',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  if (loading) {
    return (
      <div className="chart-loading">
        <div className="loading-spinner"></div>
        <p>Loading followers data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="chart-error">
        <p>Error: {error}</p>
        <button onClick={fetchFollowersData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="instagram-chart-container">
      <div className="chart-wrapper">
        <Line data={followersData} options={options} />
      </div>
    </div>
  );
};

export default InstagramFollowersChart;
