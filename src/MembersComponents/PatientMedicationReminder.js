import React, { useState, useEffect, useRef } from "react";
import HealthAdminHeader from "./HealthAdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Style from "./patient.module.css";
import PatientHeader from "./PatientHeader";
function PatientMedicationReminder() {
  const [get, setGet] = useState(null);
  const [display_add, setAdd] = useState(null);
  const [name, setName] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [status, setStatus] = useState(true);
  const [zipcode, setZip] = useState(null);
  const [state, setState] = useState(null);
  const [primary_care, setPrimary] = useState(false);
  const [special_care, setSpecial] = useState(false);
  const [emergency_care, setEmergency] = useState(false);
  const [diagnostic_service, setCare] = useState(false);

  const [error, setError] = useState(true);
  const [update_id, setUpdate] = useState(null);
  const inputRef = useRef(null);

  function displayAdd() {
    if (display_add == null) {
      setAdd(true);
      change();
    } else {
      setAdd(null);
      change();
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function change() {
    setName(null);
    setStreet(null);
    setCity(null);
    setZip(null);
    setState(null);
    setPrimary(false);
    setSpecial(false);
    setEmergency(false);
    setCare(false);
    setStatus(true);
    setUpdate(null);
    setError(null);
    get_facilities();
  }

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function remainder(id) {
    fetch(`http://localhost:8000/api/remainder/${id}`, {
      method: "PUT",
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
        get_facilities();
      });
  }

  function get_facilities() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    fetch(`http://localhost:8000/api/prescriptions/record`, {
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
        console.log(result["prescription"]);
        setGet(result["prescription"]);
      });
  }

  useEffect(() => {
    get_facilities();
  }, []);

  return (
    <div className={styles.main}>
      <PatientHeader />
      <h1 className={styles.heading}>Prescription Management</h1>

      <div className={styles.main_table}>
        <div className={styles.table_header}>
          <h1 className={styles.h1}>Medication Information</h1>
        </div>
        <div className={styles.table_body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prescribing Doctor</th>
                <th>Summary</th>
                <th>Medicine name</th>
                <th>dosage</th>
                <th>frequency</th>
                <th>Date of Prescribing</th>
                <th>Time Period</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {get &&
                get.map((historyItem, index) => (
                  <tr key={index}>
                    <td>{historyItem.provider_name}</td>
                    <td>{historyItem.summary}</td>
                    {historyItem.medicines &&
                      JSON.parse(historyItem.medicines).map(
                        (medicine, index) => (
                          <React.Fragment key={index}>
                            <td>{medicine.medication}</td>
                            <td>{medicine.dosage}</td>
                            <td>{medicine.frequency}</td>
                          </React.Fragment>
                        )
                      )}
                    <td>{formatDate(historyItem.created_at)}</td>
                    <td>{historyItem.time}</td>
                    <td>
                      {historyItem.remainder != 1 && (
                        <p
                          className={Style.update}
                          onClick={(e) => {
                            remainder(historyItem.prescription_id);
                            scrollToInput();
                          }}
                        >
                          Add Remainder
                        </p>
                      )}

                      {historyItem.remainder == 1 && (
                        <p
                          className={Style.delete}
                          onClick={(e) => {
                            remainder(historyItem.prescription_id);
                            scrollToInput();
                          }}
                        >
                          Remove Remainder
                        </p>
                      )}
                    </td>
                    <td>
                      <p
                        className={Style.update}
                        onClick={(e) => {
                          scrollToInput();
                        }}
                      >
                        Ask Refill
                      </p>
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

export default PatientMedicationReminder;
