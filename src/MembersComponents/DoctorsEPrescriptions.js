import React, { useEffect, useState } from "react";
import DoctorHeader from "./DoctorHeader";
import { Route, useNavigate } from "react-router-dom";
import Style from "./prescription.module.css";
import styles from "../Components/Forum.module.css";
const DoctorEprescriptions = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([
    { medication: "", dosage: "", frequency: "" },
  ]);
  const [patientSummary, setPatientSummary] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointmentId, setAppointmentId] = useState(
    localStorage.getItem("AppointmentId")
  );
  const [patientName, setPatientName] = useState(
    localStorage.getItem("patient")
  );
  const [frequency, setFrequency] = useState("");
  const [patients, setPatient] = useState();

  useEffect(() => {
    // Fetch prescriptions from API when component mounts
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    // Fetch prescriptions from API when component mounts
    fetchPatients();
  }, []);

  function fetchPatients() {}

  const addPrescription = () => {
    const newPrescription = {
      provider_id: localStorage.getItem("user_id"), // Replace with actual provider id
      user_id: localStorage.getItem("patientId"), // Replace with actual user id
      medicines: medicines,
      summary: patientSummary,
      appointment_id: localStorage.getItem("AppointmentId"),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPrescription),
    };

    fetch("http://localhost:8000/api/prescriptions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          alert(result.message);
          setMedicines([{ medication: "", dosage: "", frequency: "" }]);
          setPatientSummary("");
          fetchPrescriptions();
          navigate("/healthappointments"); // Fetch prescriptions again after adding a new one
        } else {
          console.error("Failed to add prescription:", result.error);
          // Optionally, you can show an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error adding prescription:", error);
        // Optionally, you can show an error message to the user
      });
  };

  const removePrescription = (prescriptionId) => {
    // Implement remove functionality as needed
  };

  const addMedicine = () => {
    setMedicines([...medicines, { medication: "", dosage: "", frequency: "" }]);
  };

  const handleMedicineChange = (index, key, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][key] = value;
    setMedicines(updatedMedicines);
  };

  const fetchPrescriptions = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "http://localhost:8000/api/prescriptions?provider_id=" +
        localStorage.getItem("user_id"),
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions);
        }
      })
      .catch((error) => console.error(error));
  };

  function route() {
    navigate("/healthappointments");
  }
  return (
    <>
      <DoctorHeader />
      <div className="container">
        <div className={Style.holder}>
          <button className={styles.button} onClick={route}>
            select appointment
          </button>
        </div>
        <h2 className={Style.h2} style={{ textAlign: "center" }}>
          E-Prescriptions
        </h2>
        <div className="contact-form" style={{ maxWidth: "800px" }}>
          <h4>
            Add E-Prescription for Appointment Id: <b>{appointmentId}</b>
          </h4>
          <p>Patient Name : {patientName}</p>
          <h3>Medicines</h3>
          {medicines.map((medicine, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Medication"
                value={medicine.medication}
                onChange={(e) =>
                  handleMedicineChange(index, "medication", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Dosage"
                value={medicine.dosage}
                onChange={(e) =>
                  handleMedicineChange(index, "dosage", e.target.value)
                }
              />
              <select
                value={medicine.frequency}
                onChange={(e) =>
                  handleMedicineChange(index, "frequency", e.target.value)
                }
              >
                <option value="once_a_week">Once a week</option>
                <option value="twice_a_week">Twice a week</option>
                <option value="once_a_day">Once a day</option>
                <option value="everyday">Everyday</option>
              </select>
            </div>
          ))}
          <button onClick={addMedicine}>Add Medicine</button>
          <h3>Patient Summary</h3>
          <textarea
            rows="4"
            placeholder="Patient Summary"
            value={patientSummary}
            onChange={(e) => setPatientSummary(e.target.value)}
          />
          <button onClick={addPrescription}>Add Prescription</button>
        </div>

        <div className="contact-form" style={{ maxWidth: "800px" }}></div>
      </div>
    </>
  );
};

export default DoctorEprescriptions;
