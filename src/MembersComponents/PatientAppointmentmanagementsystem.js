import React, { useState, useEffect } from "react";
import PatientHeader from "./PatientHeader";
import DatePicker from "react-datepicker";

const PatientAppointmentmanagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [error_doctor, setErrorDoctor] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = () => {
    fetch("http://localhost:8000/api/healthcare-providers")
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

  const handleAddAppointment = () => {
    const newAppointment = { date: "", time: "", provider: "" };
    setAppointments([...appointments, newAppointment]);
  };

  const handleRemoveAppointment = (index) => {
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    setAppointments(newAppointments);
  };

  const handleSaveAppointment = async (index) => {
    setError(null);
    setErrorDoctor(null);
    const appointmentToUpdate = appointments[index];
    const appointmentDateTime = new Date(
      appointmentToUpdate.date + "T" + appointmentToUpdate.time
    ); // Provided appointment date and time
    const currentDateTime = new Date(); // Current date and time

    const twoHoursLater = new Date(
      currentDateTime.getTime() + 2 * 60 * 60 * 1000
    );

    const thirtyDaysLater = new Date(currentDateTime);
    thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);

    if (
      appointmentToUpdate.provider == "" ||
      appointmentToUpdate.date == "" ||
      appointmentToUpdate.time == ""
    ) {
      setError("please fill all details");
    }
    const data = {
      provider_id: appointmentToUpdate.provider,
      date: appointmentToUpdate.date,
      time: appointmentToUpdate.time,
      user_id: localStorage.getItem("user_id"),
    };
    try {
      fetch("http://localhost:8000/api/appointments/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response) {
            setError("please enter all details");
            throw new Error("There was a problem fetching the data");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          if (
            result["message"] == "no appointments found" &&
            appointmentDateTime > twoHoursLater &&
            appointmentDateTime < thirtyDaysLater
          ) {
            save_appointment(index);
          }
          if (result["message"] != "no appointments found") {
            setErrorDoctor(result["message"]);
          }
          if (
            appointmentDateTime < twoHoursLater ||
            appointmentDateTime > thirtyDaysLater
          ) {
            setError(
              "please select an appointment atleast 2 hours from now and less than 30 days from now"
            );
          }
        });
    } catch {}
  };

  function save_appointment(index) {
    // Create a new appointment on the backend
    const appointmentToUpdate = appointments[index];
    const appointmentData = {
      user_id: localStorage.getItem("user_id"), // Get from localStorage or wherever user ID is stored
      provider_id: appointmentToUpdate.provider,
      status: "scheduled", // Default status
      appointment_date: appointmentToUpdate.date,
      appointment_time: appointmentToUpdate.time,
    };

    try {
      fetch("http://localhost:8000/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
        redirect: "follow",
      })
        .then((response) => {
          if (!response) {
            throw new Error("There was a problem fetching the data");
          }
          return response.json();
        })
        .then((result) => {
          const updatedAppointments = [...appointments];
          updatedAppointments[index].saved = true; // Add a property to indicate it's saved
          setAppointments(updatedAppointments);
        });
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }

  return (
    <>
      <PatientHeader />
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Appointment Management</h2>
        <div
          className="contact-form"
          style={{ maxWidth: "100%", marginTop: "25px" }}
        >
          <button onClick={handleAddAppointment}>Add Appointment</button>
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
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              {error_doctor && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {error_doctor}
                </p>
              )}

              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="date"
                      value={appointment.date}
                      onChange={(e) => {
                        const newAppointments = [...appointments];
                        newAppointments[index].date = e.target.value;
                        setAppointments(newAppointments);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={appointment.time}
                      onChange={(e) => {
                        const newAppointments = [...appointments];
                        newAppointments[index].time = e.target.value;
                        setAppointments(newAppointments);
                      }}
                    />
                  </td>
                  <td>
                    <select
                      value={appointment.provider}
                      onChange={(e) => {
                        const newAppointments = [...appointments];
                        newAppointments[index].provider = e.target.value;
                        setAppointments(newAppointments);
                      }}
                    >
                      <option value="">Select Provider</option>
                      {providers.map((provider) => (
                        <option key={provider.user_id} value={provider.user_id}>
                          {provider.full_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {appointment.saved ? (
                      <span>Saved</span>
                    ) : (
                      <button onClick={() => handleSaveAppointment(index)}>
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientAppointmentmanagement;
