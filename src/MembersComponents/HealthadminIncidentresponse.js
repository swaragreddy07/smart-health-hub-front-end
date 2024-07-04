// This is the incidence response page
import React, { useState, useEffect, useRef } from "react";
import HealthAdminHeader from "./HealthAdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Styles from "./incident.module.css";
import Style from "./patient.module.css";

function HealthadminIncidentresponse() {
  const [get, setGet] = useState(null);
  const [incident_time, setTime] = useState(null);
  const [incident_date, setDate] = useState(null);
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState(false);
  const [display_add, setAdd] = useState(false);
  const [update_id, setUpdate] = useState(null);
  const [error, setError] = useState(null);
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

  function change() {
    setTime(null);
    setDate(null);
    setDescription(null);
    setEmail(null);
    setStatus(false);
    setUpdate(null);
    setError(null);
    setRole(null);
    get_facilities();
  }

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function get_facilities() {
    fetch("http://localhost:8000/api/incident", {
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
        setGet(result["message"]);
      });
  }

  function delete_facility(id) {
    fetch(`http://localhost:8000/api/incident/${id}`, {
      method: "DELETE",
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

  function add_facility() {
    const currentDate = new Date();
    const incidentDate = new Date(incident_date);
    if (
      incident_date == null ||
      description == null ||
      incident_time == null ||
      email == null
    ) {
      setError("please enter all the details");
    } else if (incidentDate > currentDate) {
      setError("please select a past or present date");
    } else {
      let url = "";
      let method = "";
      if (update_id == null) {
        url = "http://localhost:8000/api/incident";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/incident/${update_id}`;
        method = "PUT";
      }

      let time = incident_date + " " + incident_time;
      if (update_id == null) {
        time = time + ":00";
      }
      const data = {
        incident_time: time,
        description: description,
        email: email,
        status: status,
      };
      console.log(data);
      console.log(data);
      fetch(url, {
        method: method,
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
          if (result["message"] == 1) {
            setError(
              "The entered email is not registered. Please enter a registered email"
            );
          } else {
            displayAdd();
          }
        });
    }
  }

  useEffect(() => {
    get_facilities();
  }, []);

  return (
    <div className={styles.main}>
      <HealthAdminHeader />
      <h1 className={`${styles.heading} ${Styles.heading}`}>
        INCIDENTS OR EMERGENCY RESPONSE AND MANAGEMENT
      </h1>
      <div className={styles.Button}>
        <button
          className={`${style.button} ${styles.button1} ${Styles.button1}`}
          onClick={displayAdd}
          ref={inputRef}
        >
          Add Emergency / Incident
        </button>
      </div>
      {display_add && (
        <div className={styles.input}>
          <h2>Enter Incident / Emergency Details</h2>
          {error && <p className={styles.error}>{error}</p>}
          <p>Select the date on which the incident / emergency occured:</p>
          <input
            type="date"
            className={styles.date}
            value={incident_date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <p>Select the time on which the incident / emergency occured:</p>
          <input
            className={styles.time}
            type="time"
            value={incident_time}
            onChange={(e) => setTime(e.target.value)}
          ></input>
          <input
            type="text"
            value={email}
            placeholder="Enter the email of user who reported the incident"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <textarea
            placeholder="Enter the emergency/incident description"
            rows={4} // Set the number of rows
            cols={20}
            value={description}
            className={styles.textarea}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>Select Emergency status</p>
          <select
            value={status}
            onChange={(e) => {
              e.target.value == "true" ? setStatus(true) : setStatus(false);
            }}
          >
            <option value={"true"}>Emergency solved</option>
            <option value={"false"}>Emergency not solved</option>
          </select>

          <div className={styles.Button}>
            {update_id && (
              <button
                className={`${style.button} ${styles.button2}`}
                onClick={add_facility}
              >
                Update
              </button>
            )}
            {!update_id && (
              <button
                className={`${style.button} ${styles.button1}`}
                onClick={add_facility}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
      <div className={styles.main_table}>
        <div className={`${styles.table_header} ${Styles.table_header}`}>
          <h1 className={`${styles.h1} ${Styles.h1}`}>
            ADDED Incidents / Emergencies
          </h1>
        </div>
        <div className={styles.table_body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date and time of Incident/Emergency</th>
                <th>Description</th>
                <th>User who reported the incident/emergency</th>
                <th>Role of the user</th>
                <th>Status of the emergency</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {get &&
                get.map((item, index) => (
                  <tr key={index}>
                    <td>{item.incident_time}</td>
                    <td className={Styles.description}>{item.description}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    {item.status === 1 && (
                      <td>
                        <span className={styles.green}>Emergency solved</span>
                      </td>
                    )}
                    {item.status !== 1 && (
                      <td>
                        <span className={styles.red}>Emergency not solved</span>
                      </td>
                    )}

                    <td>
                      <p
                        className={`${Style.update} ${Styles.update}`}
                        onClick={(e) => {
                          const time = item.incident_time.split(" ");
                          setDate(time[0]);
                          setTime(time[1]);
                          setUpdate(item.incident_id);
                          setAdd(true);
                          setEmail(item.email);
                          setError(null);
                          setDescription(item.description);
                          item.status === 1
                            ? setStatus(true)
                            : setStatus(false);
                          scrollToInput();
                        }}
                      >
                        Update
                      </p>
                    </td>
                    <td>
                      <p
                        className={`${Style.delete} ${Styles.delete}`}
                        onClick={() => delete_facility(item.incident_id)}
                      >
                        Delete
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

export default HealthadminIncidentresponse;
