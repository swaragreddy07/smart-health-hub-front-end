// This is the incidence response page
import React, { useState, useEffect, useRef } from "react";
import HealthAdminHeader from "./HealthAdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Styles from "./staff.module.css";
import Style from "./patient.module.css";
import { Bar } from "react-chartjs-2";

function HealthAdminStaffcoordination() {
  const [doctors, setDoctors] = useState();
  const [pharmas, setPharma] = useState();
  const [selectedRole, setSelectedRole] = useState("healthcareProvider");
  const [get, setGet] = useState();

  function handleRadioChange(event) {
    setSelectedRole(event);
    let role = 2;
    if (event != "healthcareProvider") {
      role = 4;
    }
    get_users(role);
  }

  function get_count() {
    fetch("http://localhost:8000/api/change", {
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
        let list = [];
        list.push(result["message"][0]);
        list.push(result["message"][1]);
        setDoctors(list);
        let list1 = [];
        list1.push(result["message"][2]);
        list1.push(result["message"][3]);
        setPharma(list1);
      });
  }

  function get_users(role) {
    const data = {
      role_id: role,
    };
    fetch("http://localhost:8000/api/get", {
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
        setGet(result["message"]);
      });
  }

  function update(id) {
    const data = {
      user_id: id,
    };
    fetch("http://localhost:8000/api/access", {
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
        let role = 2;
        if (selectedRole !== "healthcareProvider") {
          role = 4;
        }
        get_users(role);
        get_count();
      });
  }

  const data = {
    labels: ["Acess Granted", "Acess Denied"],
    datasets: [
      {
        label: "Health care providers",
        data: doctors,

        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Red color with alpha value for fill
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const pharma = {
    labels: ["Acess Granted", "Acess Denied"],
    datasets: [
      {
        label: "Pharmacists",
        data: pharmas,

        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  useEffect(() => {
    get_count();
    get_users(2);
  }, []);

  return (
    <div>
      <HealthAdminHeader />
      <h1 className={Styles.h1}>STAFF COORDINATION</h1>
      <div className={Styles.container}>
        <div className={Styles.chart}>
          <h3 className={Styles.h3}>HealthCare Providers Access level</h3>
          <Bar data={data} />
        </div>
        <div className={Styles.chart}>
          <h3 className={Styles.h4}>Pharmacists Access level </h3>
          <Bar data={pharma} />
        </div>
      </div>
      <h2 className={Styles.h2}>Staff Information</h2>
      <div className={Styles.Container}>
        <input
          type="radio"
          id="health"
          name="role"
          value="healthcareProvider"
          className={Styles.radio}
          checked={selectedRole === "healthcareProvider"}
        />
        <label
          for="healthcareProvider"
          className={Styles.label}
          onClick={() => handleRadioChange("healthcareProvider")}
        >
          Doctor
        </label>

        <input
          type="radio"
          id="pharma"
          name="role"
          value="pharmacist"
          className={Styles.radio}
          checked={selectedRole === "pharmacist"}
        />
        <label
          for="pharmacist"
          className={Styles.label}
          onClick={() => handleRadioChange("pharmacist")}
        >
          Pharmacist
        </label>
      </div>

      <div className={styles.main_table}>
        <div className={`${styles.table_header} ${Styles.table_header}`}>
          {selectedRole === "healthcareProvider" ? (
            <h1 className={`${styles.h1} ${Styles.H1}`}>
              Health Care Providers
            </h1>
          ) : (
            <h1 className={`${styles.h1} ${Styles.H1}`}>Pharmacists</h1>
          )}
        </div>
        <div className={styles.table_body}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of birth</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Qualifilcation</th>
                {selectedRole === "healthcareProvider" ? (
                  <th>Specialization</th>
                ) : (
                  <th>City</th>
                )}
                <th>License Number</th>
                <th>Access Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {get &&
                get.map((item, index) => (
                  <tr key={index}>
                    <td>{item.full_name}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td>{item.gender}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.qualification}</td>
                    {selectedRole === "healthcareProvider" ? (
                      <td>{item.speciality}</td>
                    ) : (
                      <td>{item.city}</td>
                    )}
                    <td>{item.license_number}</td>
                    {item.access_level === 1 && (
                      <td>
                        <span className={styles.green}>Access Allowed</span>
                      </td>
                    )}
                    {item.access_level !== 1 && (
                      <td>
                        <span className={styles.red}>Access not Allowed</span>
                      </td>
                    )}

                    {item.access_level !== 1 && (
                      <td>
                        <p
                          className={`${Style.update} ${Styles.update}`}
                          onClick={() => update(item.user_id)}
                        >
                          Allow Acess
                        </p>
                      </td>
                    )}
                    {item.access_level === 1 && (
                      <td>
                        <p
                          className={`${Style.delete} ${Styles.delete}`}
                          onClick={() => update(item.user_id)}
                        >
                          Deny Access
                        </p>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HealthAdminStaffcoordination;
