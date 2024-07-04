//This is the analytics dashboard
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DoctorHeader from './DoctorHeader';

function DoctorsAnalyticaldashboard() {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      // Dummy patient data (replace with actual API call)
      const data = [
        { date: '2024-01-01', weight: 70, bloodPressure: 120 },
        { date: '2024-01-02', weight: 69, bloodPressure: 118 },
        { date: '2024-01-03', weight: 68, bloodPressure: 115 },
        // Add more dummy data as needed
      ];
      setPatientData(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  // Prepare data for the Line chart
  const chartData = {
    labels: patientData.map((dataPoint) => dataPoint.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: patientData.map((dataPoint) => dataPoint.weight),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Blood Pressure',
        data: patientData.map((dataPoint) => dataPoint.bloodPressure),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <>
    <DoctorHeader/>
    <div>
      <h1>Analytics Dashboard</h1>
      {/* Display Line chart for patient health trends */}
      <div className="analytics-card">
        <h2>Patient Health Trends</h2>
        <Line data={chartData} />
      </div>
      {/* Additional analytics components can be added here */}
    </div>
    </>
  );
}

export default DoctorsAnalyticaldashboard;