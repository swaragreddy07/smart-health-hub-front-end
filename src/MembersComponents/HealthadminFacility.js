import React, { useState, useEffect, useRef } from "react";
import HealthAdminHeader from "./HealthAdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Style from "./patient.module.css";
function HealthadminFacility() {
  const [get, setGet] = useState(null);
  const [display_add, setAdd] = useState(null);
  const [name, setName] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [zipcode, setZip] = useState(null);
  const [state, setState] = useState(null);
  const [primary_care, setPrimary] = useState(false);
  const [special_care, setSpecial] = useState(false);
  const [emergency_care, setEmergency] = useState(false);
  const [diagnostic_service, setCare] = useState(false);
  const [operational_status, setStatus] = useState(true);
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
    fetch("http://localhost:8000/api/facility", {
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
    fetch(`http://localhost:8000/api/facility/${id}`, {
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
    if (
      name == null ||
      street == null ||
      city == null ||
      state == null ||
      zipcode == null
    ) {
      setError("please enter all the details");
    } else {
      let url = "";
      let method = "";
      if (update_id == null) {
        url = "http://localhost:8000/api/facility";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/facility/${update_id}`;
        method = "PUT";
      }
      const data = {
        name: name,
        street: street,
        city: city,
        zipcode: zipcode,
        state: state,
        primary_care: primary_care,
        special_care: special_care,
        emergency_care: emergency_care,
        diagnostic_service: diagnostic_service,
        operational_status: operational_status,
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
      <h1 className={styles.heading}>Healthcare Facilities Management</h1>
      <div className={styles.Button}>
        <button
          className={`${style.button} ${styles.button1}`}
          onClick={displayAdd}
          ref={inputRef}
        >
          Add Facility
        </button>
      </div>
      {display_add && (
        <div className={styles.input}>
          <h2>Enter Facility Details</h2>
          {error && <p className={styles.error}>{error}</p>}
          <input
            type="text"
            placeholder="Facility name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <p>Enter Facility Location:</p>
          <input
            type="text"
            placeholder="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="zipcode"
            value={zipcode}
            onChange={(e) => setZip(e.target.value)}
          ></input>
          <p>Select Operational Status:</p>
          <select
            value={operational_status}
            onChange={(e) => {
              e.target.value == "true" ? setStatus(true) : setStatus(false);
            }}
          >
            <option value={"true"}>Operational</option>
            <option value={"false"}>Not Operational</option>
          </select>

          <p>Select services provided:</p>
          <div className={styles.container}>
            <input
              type="checkbox"
              id="primaryCare"
              checked={primary_care}
              onChange={(e) => setPrimary(e.target.checked)}
            ></input>
            <label for="primaryCare">Primary Care</label>
          </div>
          <div className={styles.container}>
            <input
              type="checkbox"
              id="specialCare"
              checked={special_care}
              onChange={(e) => setSpecial(e.target.checked)}
            ></input>
            <label for="specialCare">Special Care</label>
          </div>
          <div className={styles.container}>
            <input
              type="checkbox"
              id="emergencyService"
              checked={emergency_care}
              onChange={(e) => setEmergency(e.target.checked)}
            ></input>
            <label for="emergencyService">Emergency Service</label>
          </div>
          <div className={styles.container}>
            <input
              type="checkbox"
              id="diagnosticServices"
              checked={diagnostic_service}
              onChange={(e) => setCare(e.target.checked)}
            ></input>
            <label for="diagnosticServices">Diagnostic Services</label>
          </div>
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
          <h1 className={styles.h1}>AVAILABLE FACILITIES</h1>
        </div>
        <div className={styles.table_body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Facility Name</th>
                <th>Location</th>
                <th>Operational Status</th>
                <th>Services Offered</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {get &&
                get.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      {item.street +
                        " " +
                        item.city +
                        " " +
                        item.state +
                        " " +
                        item.zipcode}
                    </td>
                    {item.operational_status === 1 && (
                      <td>
                        <span className={styles.green}>Operational</span>
                      </td>
                    )}
                    {item.operational_status !== 1 && (
                      <td>
                        <span className={styles.red}>Not Operational</span>
                      </td>
                    )}
                    <td>
                      {item.primary_care === 1 ? "Primary Care, " : ""}
                      {item.special_care === 1 ? "Special Care, " : ""}
                      {item.emergency_care === 1 ? "Emergency Care, " : ""}
                      {item.diagnostic_service === 1
                        ? "Diagnostic Service "
                        : ""}
                    </td>
                    <td>
                      <p
                        className={Style.update}
                        onClick={(e) => {
                          setUpdate(item.facility_id);
                          setAdd(true);
                          setName(item.name);
                          setStreet(item.street);
                          setCity(item.city);
                          setZip(item.zipcode);
                          setState(item.state);
                          item.primary_care === 1
                            ? setPrimary(true)
                            : setPrimary(false);
                          item.special_care === 1
                            ? setSpecial(true)
                            : setSpecial(false);
                          item.emergency_care !== 1
                            ? setEmergency(false)
                            : setEmergency(true);
                          item.diagnostic_service !== 1
                            ? setCare(false)
                            : setCare(true);
                          item.operational_status === 1
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
                        className={Style.delete}
                        onClick={() => delete_facility(item.facility_id)}
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

export default HealthadminFacility;
