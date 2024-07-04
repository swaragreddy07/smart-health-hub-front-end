import React, { useState, useEffect } from "react";
import PharmacistHeader from "./PharmacistHeader";
import Styles from "./staff.module.css";
import style from "./dispense.module.css";
import styles from "./facility.module.css";
import styl from "../Components/Forum.module.css";
function PharmacyMedicationDispensation() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [dispensedMedications, setDispensedMedications] = useState([]);

  function get_medication() {
    fetch("http://localhost:8000/api/notdispense-medication")
      .then((response) => response.json())
      .then((data) => {
        // Set the prescriptions from the API response
        console.log(data.prescriptions);
        setPrescriptions(data.prescriptions);
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:8000/api/dispensed-medications")
      .then((response) => response.json())
      .then((data) => {
        setDispensedMedications(data.dispensedPrescriptions);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    get_medication();
  }, []);

  const dispenseMedication = (prescriptionId, user_id) => {
    // Update status to 'Dispensed' and move the prescription to dispensedMedications state
    const updatedPrescriptions = prescriptions.map((prescription) => {
      if (prescription.prescription_id === prescriptionId) {
        return { ...prescription, status: "Dispensed" };
      }
      return prescription;
    });
    const dispensedPrescription = updatedPrescriptions.find(
      (prescription) => prescription.prescription_id === prescriptionId
    );
    setPrescriptions(updatedPrescriptions);
    setDispensedMedications([...dispensedMedications, dispensedPrescription]);
    setPrescriptions(updatedPrescriptions);
    setDispensedMedications([...dispensedMedications, dispensedPrescription]);

    // API call to mark prescription as dispensed
    const data = {
      prescription_id: prescriptionId,
      user_id: user_id,
      pharmacist_id: parseInt(localStorage.getItem("user_id")),
    };
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8000/api/dispense-medication", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        get_medication();
        alert("medication dispensed successfully");
        console.log(result);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <PharmacistHeader />
      <div>
        <h1 className={Styles.h1}>Medication Dispensation</h1>
        <div className="prescriptions">
          {prescriptions.length !== 0 && (
            <h2 className={style.h2}>Prescribed Medications</h2>
          )}
          {prescriptions.length === 0 && (
            <p className={style.h2}>
              No prescriptions available for dispensation.
            </p>
          )}
          <div className={style.container}>
            {prescriptions.map((prescription, index) => (
              <div className={style.card}>
                <div className={style.heading}>
                  <h3>Prescribed By: Dr {prescription.provider.full_name}</h3>
                </div>
                <p className={style.p}>
                  Patient Name: {prescription.user.full_name}
                </p>

                <div className={`${styles.main_table} ${style.main_table}`}>
                  <div
                    className={`${styles.table_header} ${style.table_header}`}
                  >
                    <h1 className={`${styles.h1} ${style.H1}`}>MEDICATIONS</h1>
                  </div>
                  <div className={styles.table_body}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Medication</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                        </tr>
                      </thead>
                      <tbody className={styles.body}>
                        {JSON.parse(prescription.medicines).map(
                          (medicine, index) => (
                            <tr>
                              <td>{medicine.medication}</td>
                              <td>{medicine.dosage}</td>
                              <td>{medicine.frequency}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={style.cont}>
                  <button
                    className={`${styl.button} ${style.button}`}
                    onClick={() =>
                      dispenseMedication(
                        prescription.prescription_id,
                        prescription.user_id
                      )
                    }
                  >
                    Dispense Medication
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PharmacyMedicationDispensation;
