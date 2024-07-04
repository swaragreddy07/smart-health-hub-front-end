import React from "react";
import PatientHeader from "./PatientHeader";
import history from "../assets/history.jpg";
import style from "./medical.module.css";
import { useState, useEffect } from "react";
function MedicalHistory() {
  const [history, setHistory] = useState([]);

  function get_history() {
    fetch(
      ` http://localhost:8000/api/medical/${localStorage.getItem("user_id")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response) {
          throw new Error("There was a problem fetching the data");
        }
        return response.json();
      })
      .then((result) => {
        setHistory(result["message"]);
      });
  }

  useEffect(() => {
    get_history();
  }, []);
  return (
    <div>
      <div className={style.body}>
        <PatientHeader />
        <h1 className={style.h1}>Medical history</h1>
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.tableCell}>Diagnosing Doctor</th>
                <th className={style.tableCell}>Diagnosed Medical Condition</th>
                <th className={style.tableCell}>Summary</th>
                <th className={style.tableCell}>Date of Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {history.map((historyItem, index) => (
                <tr key={index} className={style.tableRow}>
                  <td className={style.tableCell}>
                    {historyItem.provider_name}
                  </td>
                  <td className={style.tableCell}>
                    {historyItem.medical_condition}
                  </td>
                  <td className={style.tableCell}>{historyItem.summary}</td>
                  <td className={style.tableCell}>{historyItem.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MedicalHistory;
