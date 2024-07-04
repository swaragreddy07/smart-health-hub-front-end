//This is the admin dashborad page
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  useNavigate,
} from "react-router-dom";
import AdminHeader from "./AdminHeader";
import styled from "styled-components";
import BarChart from "./BarChart";

function Admin() {
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
  const totalUsers = 1000;
  const totalHealthcareProviders = 50;
  const monthlyData = [
    { month: "Jan", totalUsers: 100 },
    { month: "Feb", totalUsers: 150 },
    { month: "Mar", totalUsers: 200 },
    { month: "Apr", totalUsers: 180 },
    { month: "May", totalUsers: 220 },
    { month: "Jun", totalUsers: 250 },
    { month: "Jul", totalUsers: 300 },
    { month: "Aug", totalUsers: 280 },
    { month: "Sep", totalUsers: 320 },
    { month: "Oct", totalUsers: 350 },
    { month: "Nov", totalUsers: 380 },
    { month: "Dec", totalUsers: 400 },
  ];
  const departmentData = [
    { department: "Cardiology", count: 20 },
    { department: "Neurology", count: 15 },
    { department: "Oncology", count: 10 },
    { department: "Pediatrics", count: 5 },
  ];
  return (
    <>
      <AdminHeader />
      <DashboardContainer>
        <Card>
          <Title>Total Users</Title>
          <Value>
            {monthlyData.reduce((acc, data) => acc + data.totalUsers, 0)}
          </Value>
          <BarChart
            data={{
              labels: monthlyData.map((data) => data.month),
              datasets: [
                {
                  label: "Total Users",
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
      {/* <div>Administrator</div> */}
      <div className="card">
        <Link to="/healthcareprovider-management">
          User Management
        </Link>
      </div>
      <div className="card">
        <Link to="/system-configuration">System Configuration</Link>
      </div>
      <div className="card">
        <Link to="/data-oversight">Data Oversight</Link>
      </div>
      <div className="card">
        <Link to="/report-generation">Report Generation</Link>
      </div>
    
    </>
  );
}

export default Admin;
