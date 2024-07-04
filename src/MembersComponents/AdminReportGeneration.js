// This is the admin report generation page
import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "./AdminHeader";
import Styles from "./staff.module.css";
import style from "./dispense.module.css";
import styles from "./facility.module.css";
import styl from "../Components/Forum.module.css";
import make from "./report.module.css";
import Sty from "./patient.module.css";
import St from "../Components/Forum.module.css";
function AdminReportGeneration() {
  const [report, setReport] = useState();
  const inputRef = useRef(null);
  const [display_add, setAdd] = useState(null);
  const [title, setTitle] = useState(null);
  const [des, setDes] = useState(null);
  const [type, setType] = useState(null);
  const [error, setError] = useState(null);
  const [update_id, setUpdate] = useState(null);

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
    setTitle(null);
    setDes(null);
    setType(null);
    setUpdate(null);
    setError(null);
    get_report();
  }
  function delete_report(id) {
    fetch(`http://localhost:8000/api/report/${id}`, {
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
        get_report();
      });
  }
  function add_report() {
    if (title == null || des == null || title == "" || des == "") {
      setError("please enter all the details");
    } else {
      let url = "";
      let method = "";
      if (update_id == null) {
        url = "http://localhost:8000/api/report";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/report/${update_id}`;
        method = "PUT";
      }
      const data = {
        title: title,
        description: des,
        type: type,
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

  function get_report() {
    fetch("http://localhost:8000/api/report")
      .then((response) => response.json())
      .then((data) => {
        // Set the prescriptions from the API response
        console.log(data.message);
        setReport(data.message);
      })
      .catch((error) => console.error(error));
  }

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    get_report();
  }, []);

  return (
    <>
      <AdminHeader />
      <div>
        <h1 className={`${Styles.h1} ${make.h1}`}>Report Generation</h1>
        <div className="prescriptions">
          <div className={make.center}>
            <button
              className={`${St.button} ${styles.button1}`}
              ref={inputRef}
              onClick={displayAdd}
            >
              Add Report
            </button>
          </div>
          {display_add && (
            <div className={styles.input}>
              <h2>Enter Report Details</h2>
              {error && <p className={styles.error}>{error}</p>}
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>

              <textarea
                type="text"
                placeholder="Description"
                className={styles.textarea}
                value={des}
                onChange={(e) => setDes(e.target.value)}
              ></textarea>
              <p>Select Report Type:</p>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value={"user activity"}>user activity</option>
                <option value={"system performance"}>system performance</option>
                <option value={"health trends"}>health trends</option>
              </select>
              <div className={styles.Button}>
                {update_id && (
                  <button className={`${St.button}`} onClick={add_report}>
                    Update
                  </button>
                )}
                {!update_id && (
                  <button className={`${St.button}`} onClick={add_report}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          )}

          <div className={style.container}>
            {report &&
              report.map((item, index) => (
                <div key={index} className={style.card}>
                  <p className={make.p}>Type: {item.type}</p>
                  <div className={style.heading}>
                    <h3>{item.title}</h3>
                  </div>
                  <div className={make.body}>
                    <h1 className={make.H1}>{item.description}</h1>
                  </div>
                  <div className={make.Button}>
                    <p
                      className={`${Sty.update} ${Styles.update}`}
                      onClick={(e) => {
                        setTitle(item.title);
                        setAdd(true);
                        setDes(item.description);
                        setType(item.type);
                        setUpdate(item.report_id);
                        scrollToInput();
                      }}
                    >
                      Update
                    </p>

                    <p
                      className={`${Sty.delete} ${Styles.delete}`}
                      onClick={() => {
                        delete_report(item.report_id);
                      }}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReportGeneration;
