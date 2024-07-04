// This is the data over sight page
import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import Sstyles from "../Components/Signup.module.css";
import styles from "./oversight.module.css";
function AdminDataoversight() {
  const [dataIntegrity, setDataIntegrity] = useState([]);

  const handleDataIntegrityCheck = () => {
    // Simulated data integrity check
    alert("Data integrity check completed.");
  };

  const handleDataBreachResponse = () => {
    // Simulated data breach response
    alert("Data breach response initiated.");
  };

  return (
    <>
      <AdminHeader />
      <div className={styles.container}>
        <h1>Data Oversight</h1>
        <div>
          <button
            class={`${Sstyles.button} ${styles.button}`}
            onClick={handleDataIntegrityCheck}
          >
            Check Data Integrity
          </button>
          <button
            class={`${Sstyles.button} ${styles.button2}`}
            onClick={handleDataBreachResponse}
          >
            Respond to Data Breach
          </button>
          <h3 className={styles.h3}>Security Breach History:</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Affected Data</th>
                <th>Timestamp</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User Information</td>
                <td>2023-03-15 10:30 AM</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Payment Details</td>
                <td>2023-03-17 02:45 PM</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Contact Information</td>
                <td>2023-03-20 11:15 AM</td>
                <td>Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDataoversight;
