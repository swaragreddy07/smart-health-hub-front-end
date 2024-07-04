//This is the symptom checker page
import React, { useState } from "react";
import styles from "./Symptoms.module.css";
import image from "../assets/body.jpg";
import close from "../assets/close.png";
import PatientHeader from "./PatientHeader";
import buttonStyle from "../Components/Signup.module.css";

const PatientSymptomchecker = () => {
  const [symptoms, setSymptom] = useState([]);
  const [message, setMessage] = useState("");

  function setNewSymptom(value) {
    if (!symptoms.includes(value)) {
      setSymptom([...symptoms, value]);
      setMessage(null);
    }
  }

  function deleteSymptom(value) {
    let updatedSymtoms = [];
    symptoms.forEach((symptom) => {
      if (symptom != value["symptom"]) {
        updatedSymtoms.push(symptom);
      }
    });
    setSymptom(updatedSymtoms);
    setMessage(null);
  }

  function handleSubmit() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ symptoms }),
      redirect: "follow",
    };

    fetch("http://localhost:8000/api/symptom-checker", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const guidance = result.symptom_guidance;
        // Construct message from guidance
        const message = Object.keys(guidance)
          .map((symptom) => {
            return `${symptom}: ${guidance[symptom].join(", ")}`;
          })
          .join("\n");
        setMessage(message);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div>
        <PatientHeader></PatientHeader>
        <h1 className={styles.title}>Add your symptoms</h1>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.start}>
          <img className={styles.img} src={image}></img>
          <div className={styles.symptoms}>
            {symptoms.length !== 0 && (
              <>
                <p className={styles.p}>Added Symptoms:</p>
                {symptoms.map((symptom) => (
                  <div className={styles.delete}>
                    <button className={styles.Button}>{symptom}</button>
                    <img
                      alt="delete"
                      className={styles.close}
                      src={close}
                      onClick={(e) => deleteSymptom({ symptom })}
                    ></img>
                  </div>
                ))}
              </>
            )}
            <p className={styles.p}>Commom Symptoms:</p>
            <button
              value="Cough"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Cough
            </button>
            <button
              value="Sneezing"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Sneezing
            </button>
            <button
              value="Sore throat"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Sore throat
            </button>
            <button
              value="Fatigue"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Fatigue
            </button>
            <button
              value="Headache"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Headache
            </button>
            <button
              value="Low-grade fever"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Low-grade fever
            </button>
            <button
              value="Watery eyes"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Watery eyes
            </button>
            <button
              value="Difficulty breathing"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Difficulty breathing
            </button>
            <button
              value="Chest pain"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Chest pain
            </button>
            <button
              value="Nausea"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Nausea
            </button>
            <button
              value="Confusion"
              onClick={(e) => setNewSymptom(e.target.value)}
              className={styles.button}
            >
              Confusion
            </button>
            <p className={styles.submitP}>
              <button
                onClick={handleSubmit}
                className={`${buttonStyle.button} ${styles.submit}`}
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientSymptomchecker;
