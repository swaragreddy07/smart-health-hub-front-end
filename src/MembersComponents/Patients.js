import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientHeader from "./PatientHeader";
import { Line } from "react-chartjs-2";
import come from "./patient.module.css";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Style from "./patient.module.css";

const Patients = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [doctor, setDoctor] = useState();
  const [error, setError] = useState();
  const [error_doctor, setErrorDoctor] = useState();
  const [providers, setProviders] = useState([]);
  const [dispaly, setDisplay] = useState(false);
  const [appointment_id, setAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  function displayupdate() {
    if (dispaly == false) setDisplay(true);
    else {
      setDisplay(false);
      setError(null);
      setDate(null);
      setDoctor(null);
      setTime(null);
      setAppointmentId(null);
      setErrorDoctor(false);
    }
  }
  const fetchProviders = () => {
    fetch(" http://localhost:8000/api/healthcare-providers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProviders(data.providers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  const fetchAppointments = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const user_id = localStorage.getItem("user_id");
    fetch(
      "http://localhost:8000/api/appointments?user_id=" + user_id,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data.appointments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Blood Pressure",
        data: [120, 110, 130, 125, 135, 128, 132],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  function delete_appointment(id) {
    fetch(` http://localhost:8000/api/appointments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setDisplay(false);
        setError(null);
        setDate(null);
        setDoctor(null);
        setTime(null);
        setAppointmentId(null);
        fetchAppointments();
      });
  }

  function update_appointment() {
    const appointmentDateTime = new Date(date + "T" + time);
    const currentDateTime = new Date(); // Current date and time

    const twoHoursLater = new Date(
      currentDateTime.getTime() + 2 * 60 * 60 * 1000
    );

    const thirtyDaysLater = new Date(currentDateTime);
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
    if (
      appointmentDateTime < twoHoursLater ||
      appointmentDateTime > thirtyDaysLater
    ) {
      setError(
        "please select an appointment atleast 2 hours from now and less than 30 days from now"
      );
    } else {
      update();
    }
  }
  function update() {
    const data = {
      appointment_date: date,
      provider_id: doctor,
      appointment_time: time,
    };
    console.log(data);
    fetch(` http://localhost:8000/api/appointments/${appointment_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result["message"] != "successfully updated") {
          setErrorDoctor(result["message"]);
        } else {
          setDisplay(false);
          setError(null);
          setDate(null);
          setDoctor(null);
          setTime(null);
          setAppointmentId(null);
        }
        fetchAppointments();
      });
  }

  return (
    <>
      <PatientHeader />
      {console.log(localStorage.getItem("user_id"))}
      <div className="container">
        <h2>Patient Dashboard</h2>
        <div className="card">
          <Link to="/symptom-checker">Symptom Checker</Link>
        </div>
        <div className="card">
          <Link to="/reminder">Prescription Management</Link>
        </div>
        <div className="card">
          <Link to="/phr">Personal Health Records</Link>
        </div>
        <div className="card">
          <Link to="/appointment-Management">Appointment Management</Link>
        </div>

        <div className="card">
          <Link to="/community-interaction">Community Interaction</Link>
        </div>
        <div className="card">
          <Link to="/message">Message</Link>
        </div>

        <div className="flex-container">
          <div className=" item">
            <div className="contact-form">
              <h3>Monthly Blood Pressure</h3>
              <Line data={data} />
            </div>
          </div>

          <div className={come.table}>
            {dispaly && (
              <div className="container">
                {error && <p className={come.p}>{error}</p>}
                {error_doctor && <p className={come.p}>{error_doctor}</p>}
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Provider</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="date"
                          className={come.date}
                          value={date}
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          className={come.time}
                          value={time}
                          onChange={(e) => {
                            setTime(e.target.value);
                          }}
                        />
                      </td>
                      <td>
                        <select
                          value={doctor}
                          onChange={(e) => {
                            setDoctor(e.target.value);
                          }}
                        >
                          <option value="">Select Provider</option>
                          {providers.map((provider) => (
                            <option
                              key={provider.user_id}
                              value={provider.user_id}
                            >
                              {provider.full_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className={come.save}
                          onClick={() => update_appointment()}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <h3 className={come.h3}>Upcoming Appointments</h3>
            {loading ? (
              <p>Loading appointments...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.appointment_date}</td>
                      <td>{appointment.appointment_time}</td>
                      <td>{`Dr. ${appointment.provider.full_name}`}</td>
                      <td>
                        <button
                          className={come.update}
                          onClick={() => {
                            fetchProviders();
                            displayupdate();
                            setDate(appointments.appointment_date);
                            setTime(appointment.appointment_time);
                            setDoctor(appointment.provider_id);
                            setAppointmentId(appointment.appointment_id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            delete_appointment(appointment.appointment_id)
                          }
                          className={come.delete}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Patients;
