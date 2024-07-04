import React from "react";
import PatientHeader from "./PatientHeader";
import style from "../Components/Forum.module.css";
import Style from "./medical.module.css";
import styles from "./vital.module.css";
import { useState, useEffect } from "react";

import { Line, Bar, Radar, Doughnut } from "react-chartjs-2";
import { array } from "yup";
function VitalSigns() {
  const [signs, setSigns] = useState([]);
  const [date_heart, setHeart] = useState([]);
  const [date_blood, setBlood] = useState([]);
  const [date_glucose, setGlucose] = useState([]);
  const [date_weight, setWeight] = useState([]);
  const [heart_data, setheart] = useState([]);
  const [blood_data, setblood] = useState([]);
  const [glucose_data, setglucose] = useState([]);
  const [weight_data, setweight] = useState([]);
  const [add, setAdd] = useState(false);
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const [value, setValue] = useState();
  const [error, setError] = useState();
  function get_vitals() {
    const data = {
      user_id: localStorage.getItem("user_id"),
    };
    fetch("http://localhost:8000/api/sign/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setBlood([]);
        setblood([]);
        setHeart([]);
        setheart([]);
        setGlucose([]);
        setglucose([]);
        setWeight([]);
        setweight([]);
        setSigns(result["sign"]);
        result["sign"].map((sign) => {
          if (sign.category == "blood_pressure") {
            setBlood((prevHeartData) => [...prevHeartData, sign.date]);
            setblood((prevBloodData) => [...prevBloodData, sign.value]);
          } else if (sign.category == "heart_beat") {
            setHeart((prevHeartData) => [...prevHeartData, sign.date]);
            setheart((prevBloodData) => [...prevBloodData, sign.value]);
          } else if (sign.category == "glucose") {
            setGlucose((prevHeartData) => [...prevHeartData, sign.date]);
            setglucose((prevBloodData) => [...prevBloodData, sign.value]);
          } else {
            setWeight((prevHeartData) => [...prevHeartData, sign.date]);
            setweight((prevBloodData) => [...prevBloodData, sign.value]);
          }
        });
      });
  }

  useEffect(() => {
    get_vitals();
  }, []);

  function store_vital() {
    const currentDate = new Date().toISOString().split("T")[0];
    if (date == null || category == null || value == null) {
      setError("please enter all the details");
    } else if (date > currentDate) {
      setError("please select a past or current date");
    } else {
      const data = {
        user_id: localStorage.getItem("user_id"),
        date: date,
        category: category,
        value: value,
      };

      fetch("http://localhost:8000/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result["message"] == 1) {
            setError(
              "you have already added a value on the selected day for the selected category"
            );
          } else {
            setError(null);
            setDate(null);
            setValue(null);
            setCategory(null);
            setAdd(false);
            get_vitals();
          }
        });
    }
  }

  function update_vital() {
    const currentDate = new Date().toISOString().split("T")[0];
    if (date == null || category == null || value == null) {
      setError("please enter all the details");
    } else if (date > currentDate) {
      setError("please select a past or current date");
    } else {
      const data = {
        user_id: localStorage.getItem("user_id"),
        date: date,
        category: category,
        value: value,
      };

      fetch("http://localhost:8000/api/sign/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result["message"] == 1) {
            setError(
              "There is no record found for the selected category and date. please add a value to update it"
            );
          } else {
            setError(null);
            setDate(null);
            setValue(null);
            setCategory(null);
            setAdd(false);
            get_vitals();
          }
        });
    }
  }
  function update() {
    if (add == false) {
      setAdd("true");
    } else {
      setAdd(false);
    }
  }

  function display_add() {
    if (add == false) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }
  console.log(date_blood);
  console.log(blood_data);
  const data = {
    labels:
      date_blood.length === 0
        ? ["January", "February", "March", "April", "May", "June", "July"]
        : date_blood,
    datasets: [
      {
        label: "Blood Pressure",
        data:
          blood_data.length === 0
            ? [120, 110, 130, 125, 135, 128, 132]
            : blood_data,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const heart = {
    labels:
      date_heart.length === 0
        ? ["January", "February", "March", "April", "May", "June", "July"]
        : date_heart,
    datasets: [
      {
        label: "heart beat",
        data:
          heart_data.length === 0
            ? [120, 110, 130, 125, 135, 128, 132]
            : heart_data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const glucose = {
    labels:
      date_glucose.length === 0
        ? ["January", "February", "March", "April", "May", "June", "July"]
        : date_glucose,
    datasets: [
      {
        label: "Blood glucose level",
        data:
          glucose_data.length === 0
            ? [120, 110, 130, 125, 135, 128, 132]
            : glucose_data,
        fill: true,
        backgroundColor: "rgba(255, 159, 64, 0.2)", // Orange color with opacity
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const weight = {
    labels:
      date_weight.length === 0
        ? ["January", "February", "March", "April", "May", "June", "July"]
        : date_weight,
    datasets: [
      {
        label: "Body weight",
        data:
          weight_data.length === 0
            ? [120, 110, 130, 125, 135, 128, 132]
            : weight_data,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Shade of green
        borderColor: "rgb(75, 192, 192)", // Shade of green
        pointBackgroundColor: "rgb(75, 192, 192)", // Shade of green
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)", // Shade of green
      },
    ],
  };

  return (
    <div>
      <PatientHeader />
      {add && (
        <div className={styles.div}>
          <div className={styles.form}>
            {error && <p className={styles.p}>{error}</p>}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <select
              id="dataSelector"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option>Select a vital Sign</option>
              <option value="heart_beat">
                Average heart beat per minute on a day
              </option>
              <option value="blood_pressure">
                Average blood pressure for a day
              </option>
              <option value="glucose">
                Average blood glucose level on a day
              </option>
              <option value="weight">Body weight on a day</option>
            </select>
            <input
              type="number"
              placeholder="enter a numeric value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            ></input>
            {add !== "true" && <button onClick={store_vital}>Submit</button>}
            {add === "true" && <button onClick={update_vital}>Update</button>}
          </div>
        </div>
      )}
      <h1 className={Style.h1}>vital signs</h1>
      <div className={styles.container}>
        <button className={style.button} onClick={display_add}>
          Add a vital sign
        </button>
        <button className={style.button} onClick={update}>
          Update a vital sign
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Blood pressure</h3>
          {date_blood.length === 0 && (
            <p>
              this is a sample graph as you have not entered your blood pressure
              reading
            </p>
          )}
          <Line data={data} />
        </div>
        <div className={styles.chart}>
          <h3 className={styles.h3}>heart Beat</h3>
          {date_heart.length === 0 && (
            <p>
              this is a sample graph as you have not entered you Heart beat
              reading
            </p>
          )}
          <Doughnut data={heart} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Blood Glucose level</h3>
          {date_glucose.length === 0 && (
            <p>
              this is a sample graph as you have not entered you Blood sugar
              level
            </p>
          )}
          <Bar data={glucose} />
        </div>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Body weight</h3>
          {date_weight.length === 0 && (
            <p>
              this is a sample graph as you have not entered your body weight
            </p>
          )}
          <Radar data={weight} />
        </div>
      </div>
    </div>
  );
}

export default VitalSigns;
