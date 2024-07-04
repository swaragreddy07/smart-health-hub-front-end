import React from "react";
import PatientHeader from "./PatientHeader";
import style from "./medical.module.css";
import { useState, useEffect } from "react";
import styles from "../Components/Forum.module.css";
import Style from "./Userp.module.css";
import { Route, useNavigate } from "react-router-dom";
function MedicalHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function alert() {
    navigate("/reminder");
  }
  function get_history() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    fetch(` http://localhost:8000/api/prescriptions/record`, {
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
        setHistory(result["prescription"]);
      });
  }

  useEffect(() => {
    get_history();
  }, []);
  return (
    <div>
      <div className={style.body}>
        <PatientHeader />
        <h1 className={style.h1}>Prescription history</h1>

        <div className={Style.div}>
          <button className={`${styles.button}`} onClick={alert}>
            Set medication alerts
          </button>
        </div>
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.tableCell}>Prescribing Doctor</th>
                <th className={style.tableCell}>Summary</th>
                <th className={style.tableCell}>Medicine name</th>
                <th className={style.tableCell}>dosage</th>
                <th className={style.tableCell}>frequency</th>
                <th className={style.tableCell}>Date of Prescribing</th>
              </tr>
            </thead>
            <tbody>
              {history.map((historyItem, index) => (
                <tr key={index} className={style.tableRow}>
                  <td className={style.tableCell}>
                    {historyItem.provider_name}
                  </td>
                  <td className={style.tableCell}>{historyItem.summary}</td>
                  {historyItem.medicines &&
                    JSON.parse(historyItem.medicines).map((medicine, index) => (
                      <React.Fragment key={index}>
                        <td>{medicine.medication}</td>
                        <td>{medicine.dosage}</td>
                        <td>{medicine.frequency}</td>
                      </React.Fragment>
                    ))}
                  <td className={style.tableCell}>
                    {formatDate(historyItem.created_at)}
                  </td>
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
