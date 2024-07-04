// This is the incidence response page
import React, { useState, useEffect, useRef } from "react";
import HealthAdminHeader from "./HealthAdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Styles from "./compliance.module.css";
import Style from "./patient.module.css";

function HealthadminIncidentresponse() {
  const [get, setGet] = useState(null);
  const [display_add, setAdd] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [type, setType] = useState("healthcare regulation");
  const [status, setStatus] = useState(true);
  const [issue, setIssue] = useState(false);
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

  function change() {
    setName(null);
    setDescription(null);
    setType("healthcare regulation");
    setStatus(true);
    setIssue(false);
    setUpdate(null);
    setError(null);
    get_facilities();
  }

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function get_facilities() {
    fetch("http://localhost:8000/api/compliance", {
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
    fetch(` http://localhost:8000/api/compliance/${id}`, {
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
    if (name == null || description == null) {
      setError("please enter all the details");
    } else {
      let url = "";
      let method = "";
      if (update_id == null) {
        url = "http://localhost:8000/api/compliance";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/compliance/${update_id}`;
        method = "PUT";
      }
      const data = {
        name: name,
        description: description,
        type: type,
        status: status,
        issue: issue,
      };
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
          console.log(result["message"]);
          displayAdd();
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
        Compliance Oversight: Monitoring of Regulations, Standards, and Legal
        Requirements
      </h1>
      <div className={styles.Button}>
        <button
          className={`${style.button} ${styles.button1}`}
          onClick={displayAdd}
          ref={inputRef}
        >
          Add Compliance
        </button>
      </div>
      {display_add && (
        <div className={styles.input}>
          <h2>Enter Compliance Details</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Compliance name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <textarea
            placeholder="Enter the compliance description"
            rows={4} // Set the number of rows
            cols={20}
            value={description}
            className={styles.textarea}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p>Please select the type of compliance</p>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value={"healthcare regulation"}>Health Regulation</option>
            <option value={"standard"}>Standard</option>
            <option value={"legal requirement"}>Legal Requirement</option>
          </select>
          <p>Select compliance status</p>
          <select
            value={status}
            onChange={(e) => {
              e.target.value == "true" ? setStatus(true) : setStatus(false);
            }}
          >
            <option value={"true"}>Is Compliant</option>
            <option value={"false"}>Is Noncompliant</option>
          </select>
          <p>Please select the option to raise or not raise an issue</p>
          <select
            value={issue}
            onChange={(e) => {
              e.target.value == "true" ? setIssue(true) : setIssue(false);
            }}
          >
            <option value={"true"}>Raise Issue</option>
            <option value={"false"}>Do not raise Issue</option>
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
          <h1 className={`${styles.h1} ${Styles.h1}`}>ADDED COMPLIANCE</h1>
        </div>
        <div className={styles.table_body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Compliance Name</th>
                <th>Description</th>
                <th>Type of Compliance</th>
                <th>Compliance Status</th>
                <th>Issue Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {get &&
                get.map((item, index) => (
                  <tr key={index}>
                    <td className={Styles.name}>{item.name}</td>
                    <td className={Styles.description}>{item.description}</td>
                    <td>{item.type}</td>
                    {item.status === 1 && (
                      <td>
                        <span className={styles.green}>Is Compliant</span>
                      </td>
                    )}
                    {item.status !== 1 && (
                      <td>
                        <span className={styles.red}>Is NonCompliant</span>
                      </td>
                    )}
                    {item.issue !== 1 && (
                      <td>
                        <span className={styles.green}>Issue not raised</span>
                      </td>
                    )}
                    {item.issue === 1 && (
                      <td>
                        <span className={styles.red}>Issue Raised</span>
                      </td>
                    )}

                    <td>
                      <p
                        className={`${Style.update} ${Styles.update}`}
                        onClick={(e) => {
                          setUpdate(item.compliance_id);
                          setAdd(true);
                          setName(item.name);
                          setDescription(item.description);
                          setType(item.type);
                          item.status === 1
                            ? setStatus(true)
                            : setStatus(false);
                          item.issue === 1 ? setIssue(true) : setIssue(false);
                          scrollToInput();
                        }}
                      >
                        Update
                      </p>
                    </td>
                    <td>
                      <p
                        className={`${Style.delete} ${Styles.delete}`}
                        onClick={() => delete_facility(item.compliance_id)}
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
