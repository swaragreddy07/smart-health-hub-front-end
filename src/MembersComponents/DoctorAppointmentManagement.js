import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import { Line } from "react-chartjs-2";
import { Navigate, useNavigate } from "react-router-dom";

function DoctorAppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsPerDay, setAppointmentsPerDay] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const user_id = localStorage.getItem("user_id");
  const fetchAppointments = () => {
    fetch(
      "http://localhost:8000/api/gethealcareproviderappointments?provider_id=" +
        user_id
    )
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.appointments);
        countAppointmentsPerDay(data.appointments);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  const countAppointmentsPerDay = (appointments) => {
    const counts = {};
    appointments.forEach((appointment) => {
      const day = appointment.appointment_date.split(" ")[0]; // Extract date part
      counts[day] = counts[day] ? counts[day] + 1 : 1;
    });
    setAppointmentsPerDay(counts);
  };

  const removeAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.appointment_id !== appointmentId
    );
    setAppointments(updatedAppointments);
    fetch(`http://localhost:8000/api/appointments/${appointmentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        fetchAppointments();
      });
  };

  const handleRowClick = (appointmentId, patientId, name) => {
    localStorage.setItem("AppointmentId", appointmentId);
    localStorage.setItem("patientId", patientId);
    localStorage.setItem("patient", name);

    navigate("/eprescriptions");
    // Navigate to e-prescriptions page
    // You need to define your navigation logic here, such as using React Router or any other navigation library
  };

  const chartData = {
    labels: Object.keys(appointmentsPerDay),
    datasets: [
      {
        label: "Appointments per Day",
        data: Object.values(appointmentsPerDay),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <DoctorHeader />
      <div className="container">
        <h2>Appointments</h2>
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {console.log(appointments)}
            {appointments.map((appointment) => (
              <tr
                key={appointment.appointment_id}
                onClick={() =>
                  handleRowClick(
                    appointment.appointment_id,
                    appointment.user_id
                  )
                }
              >
                <td>{appointment.provider.full_name}</td>
                <td>{appointment.appointment_date}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(
                        appointment.appointment_id,
                        appointment.user_id,
                        appointment.provider.full_name
                      );
                    }}
                  >
                    Add Prescription
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAppointment(appointment.appointment_id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
        <h2>Appointment Trends</h2>

        <Line data={chartData} />
      </div>
    </div>
  );
}

export default DoctorAppointmentManagement;
