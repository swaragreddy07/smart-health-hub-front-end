import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "./AdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Style from "./patient.module.css";
function AdminSystemConfiguration() {
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

  function get_facilities() {
    fetch("http://localhost:8000/api/configi", {
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
    fetch(`http://localhost:8000/api/configi/${id}`, {
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
    if (name == null || street == null || city == null || state == null) {
      setError("please enter all the details");
    } else {
      let url = "";
      let method = "";
      if (update_id == null) {
        url = "http://localhost:8000/api/configi";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/configi/${update_id}`;
        method = "PUT";
      }
      const data = {
        description: name,
        type: street,
        value: city,
        config: state,
        status: status,
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
      <AdminHeader />
      <h1 className={styles.heading}>System Configuration</h1>
      <div className={styles.Button}>
        <button
          className={`${style.button} ${styles.button1}`}
          onClick={displayAdd}
          ref={inputRef}
        >
          Add Configuration
        </button>
      </div>
      {display_add && (
        <div className={styles.input}>
          <h2>Enter Configuration Details</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Configuration Description"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Type"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></input>
          <p>Select Integration Status:</p>
          <select
            value={status}
            onChange={(e) => {
              e.target.value == "true" ? setStatus(true) : setStatus(false);
            }}
          >
            <option value={"true"}>Integrated</option>
            <option value={"false"}>Not Integrated</option>
          </select>
          <input
            type="text"
            placeholder="Value"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Enter Conguration"
            value={state}
            onChange={(e) => setState(e.target.value)}
          ></input>
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
        <div className={styles.table_header}>
          <h1 className={styles.h1}>Added Configurations</h1>
        </div>
        <div className={styles.table_body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Configuration Description</th>
                <th>Configuration Type</th>
                <th>Configuration</th>
                <th>Value</th>
                <th>Staus</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {get &&
                get.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td>{item.config}</td>
                    <td>{item.value}</td>
                    {item.status === 1 && (
                      <td>
                        <span className={styles.green}>Integrated</span>
                      </td>
                    )}
                    {item.status !== 1 && (
                      <td>
                        <span className={styles.red}>Not Integrated</span>
                      </td>
                    )}
                    <td>
                      <p
                        className={Style.update}
                        onClick={(e) => {
                          setUpdate(item.config_id);
                          setAdd(true);
                          setName(item.description);
                          setStreet(item.type);
                          setCity(item.value);
                          setState(item.config);

                          scrollToInput();
                        }}
                      >
                        Update
                      </p>
                    </td>
                    <td>
                      <p
                        className={Style.delete}
                        onClick={() => delete_facility(item.config_id)}
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

export default AdminSystemConfiguration;
