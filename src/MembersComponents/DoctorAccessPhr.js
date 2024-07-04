import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";

import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Style from "./patient.module.css";

function DoctorAccessPhr() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientData, setPatientData] = useState(null);

  // Fetch list of patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/patients");
        const data = await response.json();
        setPatients(data.users);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch patient data when selectedPatient changes
  useEffect(() => {
    const fetchPatientData = async () => {
      if (selectedPatient) {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ "user_id": selectedPatient }),
        };

        try {
          const response = await fetch(
            "http://localhost:8000/api/patient?user_id=" + selectedPatient,
            requestOptions
          );
          const data = await response.json();
          setPatientData(data);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      }
    };

    fetchPatientData();
  }, [selectedPatient]);

  // Handler for selecting a patient
  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  return (
    <>
      <DoctorHeader />
      <div>
        <h1 style={{ textAlign: "center" }}>Health Records</h1>
        <div>
          <div className={styles.input}>
            <select value={selectedPatient} onChange={handlePatientChange}>
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.user_id} value={patient.user_id}>
                  {patient.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {patientData && (
          <div>
            <h2>Appointment History for Patient {selectedPatient}</h2>
            <ul>
              {patientData.appointments.map((appointment) => (
                <li key={appointment.appointment_id}>
                  Appointment ID: {appointment.appointment_id}, Date:{" "}
                  {appointment.appointment_date}
                </li>
              ))}
            </ul>
            <h2>Prescription History for Patient {selectedPatient}</h2>
            <ul>
              {patientData.prescriptions.map((prescription) => (
                <li key={prescription.prescription_id}>
                  <strong>Prescription ID:</strong>{" "}
                  {prescription.prescription_id},<strong>Summary:</strong>{" "}
                  {prescription.summary}
                  <ul>
                    {prescription.medicines &&
                      JSON.parse(prescription.medicines).map(
                        (medicine, index) => (
                          <li key={index}>
                            <strong>Medicine:</strong> {medicine.name},
                            <strong>Dosage:</strong> {medicine.dosage},
                            <strong>Frequency:</strong> {medicine.frequency}
                          </li>
                        )
                      )}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default DoctorAccessPhr;
