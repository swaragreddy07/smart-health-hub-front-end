// This is the healthcare provider dashboard
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import DoctorHeader from "./DoctorHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.header`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const Doctors = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [
    appointmentsCountByDateAndProvider,
    setAppointmentsCountByDateAndProvider,
  ] = useState([]);

  const barChartRef = useRef(null);
  const barChartInstance = useRef(null);
  useEffect(() => {
    // Fetch appointment count data
    const fetchAppointmentCount = async () => {
      try {
        const response = await fetch(
          " http://localhost:8000/api/getcount?provider_id=" +
            localStorage.getItem("user_id")
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setAppointmentsCountByDateAndProvider(
          data.appointments_count_by_date_and_provider
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointmentCount();
  }, []);

  useEffect(() => {
    // Render the bar chart
    const ctx = barChartRef.current.getContext("2d");
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    barChartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: appointmentsCountByDateAndProvider.map((item) => item.date),
        datasets: [
          {
            label: "Appointments",
            data: appointmentsCountByDateAndProvider.map((item) => item.count),
            backgroundColor: "#82ca9d",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [appointmentsCountByDateAndProvider]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "UV",
            data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
            borderColor: "#8884d8",
            backgroundColor: "rgba(136, 132, 216, 0.2)",
          },
          {
            label: "PV",
            data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
            borderColor: "#82ca9d",
            backgroundColor: "rgba(130, 202, 157, 0.2)",
          },
        ],
      },
    });

    const barCtx = barChartRef.current.getContext("2d");

    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    barChartInstance.current = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "New Patients",
            data: [20, 25, 30, 35, 40, 45, 50],
            backgroundColor: "#8884d8",
          },
          {
            label: "Appointments",
            data: [50, 45, 40, 35, 30, 25, 20],
            backgroundColor: "#82ca9d",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, []);
  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      " http://localhost:8000/api/prescriptions?provider_id=" +
        localStorage.getItem("user_id"),
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setPrescriptions(data.prescriptions))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <DoctorHeader />
      <Header>Healthcare Provider Dashboard</Header>
      <div className="flex-container">
        <div className="card">
          <Link to="/eprescriptions">E-prescriptions</Link>
        </div>
        <div className="card">
          <Link to="/healthappointments">Appointment Management</Link>
        </div>
        <div className="card">
          <Link to="/accessphr">Patient Health Records</Link>
        </div>
        <div className="card">
          <Link to="/message">Message</Link>
        </div>
        <div className="card">
          <Link to="/professional-collab">Professional Collaboration</Link>
        </div>
        <div className="card">
          <Link to="/analytics ">Analytics Dashboard</Link>
        </div>
      </div>
      <div className="container">
        <Container>
          <div className="flex-container">
            <div className="item">
              <ChartContainer>
                <canvas ref={chartRef}></canvas>
              </ChartContainer>
            </div>
            <div className="item">
              <ChartContainer>
                <canvas ref={barChartRef}></canvas>
              </ChartContainer>
            </div>
          </div>
          <div className="">
            <div className="">
              <h3>e-Prescriptions</h3>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((prescription) => (
                    <React.Fragment key={prescription.prescription_id}>
                      <tr>
                        <td>{prescription.full_name}</td>
                        <td colSpan="3">
                          <table>
                            <tbody>
                              {prescription.medicines &&
                                JSON.parse(prescription.medicines).map(
                                  (medicine, index) => (
                                    <tr key={index}>
                                      <td>{medicine.name}</td>
                                      <td>{medicine.dosage}</td>
                                      <td>{medicine.frequency}</td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ImageContainer>
            <img
              src="https://img.freepik.com/free-vector/mother-child-visiting-doctor_1262-19839.jpg?w=900&t=st=1709825158~exp=1709825758~hmac=88eaaea3357cc3d31c6001d93a425ee0f581f20c2df63ad77695399af52a74c0"
              alt="Medical Image"
              style={{ width: "50%" }}
            />
          </ImageContainer>
        </Container>
      </div>
    </>
  );
};

export default Doctors;
