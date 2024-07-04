import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import PharmacistHeader from "./PharmacistHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Styles from "./staff.module.css";
import styl from "./history.module.css";

function PharmacyMedicationHistory() {
  const [user, setUser] = useState();
  const [med, setMed] = useState();

  function get_medicine(id) {
    if (id != "") {
      const data = {
        user_id: id,
      };

      fetch("http://localhost:8000/api/history", {
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
          console.log(result["message"]);
          if (result["message"] == 0) {
            setMed(null);
          } else {
            setMed(result["message"]);
          }
        });
    }
  }
  function get_users() {
    fetch("http://localhost:8000/api/patients", {
      method: "GET",
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
        setUser(result["users"]);
      });
  }

  useEffect(() => {
    get_users();
  }, []);

  return (
    <>
      <PharmacistHeader />
      <h1 className={`${Styles.h1} ${styl.h1}`}>Medication History</h1>
      <div className={styl.container}>
        {user && (
          <select
            className={styl.select}
            onClick={(e) => {
              get_medicine(e.target.value);
            }}
          >
            {/* Default option */}
            <option value="">Select a user</option>

            {/* Options for each user */}
            {user.map((userData, index) => (
              <option key={index} value={userData.user_id}>
                {userData.full_name}
              </option>
            ))}
          </select>
        )}
      </div>
      {med && (
        <div className={`${styles.main_table} ${styl.table_header}`}>
          <div className={`${styles.table_header} ${Styles.table_header}`}>
            <h1 className={`${styles.h1} ${Styles.H1}`}>Medications</h1>
          </div>
          <div className={styles.table_body}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Side Effects</th>
                </tr>
              </thead>
              <tbody className={styles.body}>
                {med &&
                  med.map((item, index) =>
                    JSON.parse(item.medicines).map((medicine, index) => (
                      <tr>
                        <td>{medicine.medication}</td>
                        <td>{medicine.dosage}</td>
                        <td>{medicine.frequency}</td>
                        <td>{item.time}</td>
                        {item.side_effects && <td>{item.side_effects}</td>}
                        {!item.side_effects && <td>No Side Effects</td>}
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!med && <h2 className={Styles.h2}>There is no medication History</h2>}
    </>
  );
}

export default PharmacyMedicationHistory;
