//This is patient health records page
import React, { useState, useEffect } from "react";
import PatientHeader from "./PatientHeader";
import style from "./prescription.module.css";
const PatientPhr = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [comments, setComment] = useState();
  const [mediation, setMedication] = useState();
  const [new_record, setNewRecord] = useState();

  function addRecord() {
    const data = {
      user_id: localStorage.getItem("user_id"),
      prescription_id: mediation,
      preference: new_record,
    };
    fetch("http://localhost:8000/api/alert", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response) {
          throw new Error("There was a problem fetching the data");
        }
        return response.json();
      })
      .then((result) => {
        alert("record added successfully");
        setMedication(null);
        setNewRecord(null);
      });
  }

  function get_prescriptions() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    fetch("http://localhost:8000/api/prescriptions/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response) {
          throw new Error("There was a problem fetching the data");
        }
        return response.json();
      })
      .then((result) => {
        setComment(result["prescription"]);
        console.log(result["prescription"]);
      });
  }

  useEffect(() => {
    get_prescriptions();
  }, []);

  return (
    <>
      <PatientHeader />
      <div className="health-records-container contact-form">
        <h2 className={style.h2}>Prescriptions</h2>
        <label htmlFor="prescriptions">select your medication</label>
        {comments && comments.length > 0 ? (
          <select
            id="prescriptions"
            onChange={(e) => {
              setMedication(e.target.value);
              console.log(e.target.value);
            }}
          >
            {comments.map((comment) => (
              <option
                key={comment.prescription_id}
                value={comment.prescription_id}
              >
                {!comment.medication_name && "medicine"}
                {comment.medication_name && comment.medication_name}
              </option>
            ))}
          </select>
        ) : (
          <div>No prescriptions available</div>
        )}

        <label htmlFor="medicalHistory">Get alerts:</label>
        <select
          id="medicalHistory"
          value={new_record}
          onChange={(e) => setNewRecord(e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button onClick={addRecord}>Add Record</button>
      </div>
    </>
  );
};

export default PatientPhr;
