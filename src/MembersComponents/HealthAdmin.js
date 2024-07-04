//This is the Health Admin dashboard  page
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import HealthAdminHeader from "./HealthAdminHeader";
import styled from "styled-components";
import BarChart from "./BarChart";

function HealthAdmin() {
  const DashboardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
  `;

  const Card = styled.div`
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  const Title = styled.h2`
    margin-bottom: 10px;
    font-size: 1.5rem;
  `;

  const Value = styled.p`
    font-size: 1.2rem;
  `;
  const totalUsers = 60;
  const totalHealthcareProviders = 50;
  const monthlyData = [
    { month: "Jan", totalUsers: 10 },
    { month: "Feb", totalUsers: 15 },
    { month: "Mar", totalUsers: 20},
    { month: "Apr", totalUsers: 18 },
    { month: "May", totalUsers: 22 },
    { month: "Jun", totalUsers: 25 },
    { month: "Jul", totalUsers: 30 },
    { month: "Aug", totalUsers: 28 },
    { month: "Sep", totalUsers: 30 },
    { month: "Oct", totalUsers: 35 },
    { month: "Nov", totalUsers: 38 },
    { month: "Dec", totalUsers: 40 },
  ];
  const departmentData = [
    { department: "Cardiology", count: 20 },
    { department: "Neurology", count: 15 },
    { department: "Oncology", count: 10 },
    { department: "Pediatrics", count: 5 },
  ];

  return (
    <>
      <HealthAdminHeader />
      <h1 style={{ textAlign: "center" }}>Health Administrator</h1>
      <div className="card">
        <Link to="/staff-coordination">Staff Coordination</Link>
      </div>
      <div className="card">
        <Link to="/compliance">Compliance Overight</Link>
      </div>
      <div className="card">
        <Link to="/incident-response">Incident Response</Link>
      </div>
      <div className="card">
        <Link to="/facility-management">Facility Mangement</Link>
      </div>

      <DashboardContainer>
        <Card>
          <Title>Total Pharmacists</Title>
          <Value>
            {monthlyData.reduce((acc, data) => acc + data.totalUsers, 0)}
          </Value>
          <BarChart
            data={{
              labels: monthlyData.map((data) => data.month),
              datasets: [
                {
                  label: "Total Pharmacists",
                  data: monthlyData.map((data) => data.totalUsers),
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Card>
        <Card>
          <Title>Total Healthcare Providers</Title>
          <Value>{totalHealthcareProviders}</Value>
          <BarChart
            data={{
              labels: departmentData.map((data) => data.department),
              datasets: [
                {
                  label: "Healthcare providers",
                  data: departmentData.map((data) => data.count),
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Card>
      </DashboardContainer>
    </>
  );
}

export default HealthAdmin;

