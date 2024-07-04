import React from "react";
import PatientHeader from "./PatientHeader";
import style from "../Components/Forum.module.css";
import Style from "./medical.module.css";
import styles from "./vital.module.css";
import { useState, useEffect } from "react";

import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

function ExcerciseData() {
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
    fetch("http://localhost:8000/api/exercise/index", {
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
          if (sign.category == "running") {
            setBlood((prevHeartData) => [...prevHeartData, sign.date]);
            setblood((prevBloodData) => [...prevBloodData, sign.calories]);
          } else if (sign.category == "walking") {
            setHeart((prevHeartData) => [...prevHeartData, sign.date]);
            setheart((prevBloodData) => [...prevBloodData, sign.calories]);
          } else if (sign.category == "cycling") {
            setGlucose((prevHeartData) => [...prevHeartData, sign.date]);
            setglucose((prevBloodData) => [...prevBloodData, sign.calories]);
          } else {
            setWeight((prevHeartData) => [...prevHeartData, sign.date]);
            setweight((prevBloodData) => [...prevBloodData, sign.calories]);
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
        calories: value,
      };
      console.log(data);
      fetch("http://localhost:8000/api/exercise", {
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
          console.log(result["message"]);
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
        calories: value,
      };
      console.log(data);
      fetch("http://localhost:8000/api/exercise/update", {
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
          console.log(result["message"]);
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
  const data = {
    labels:
      date_blood.length === 0
        ? ["January", "February", "March", "April", "May", "June", "July"]
        : date_blood,
    datasets: [
      {
        label: "Running - calories burnt",
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
        label: "Walking - calories burnt",
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
        label: "Cycling- calories burnt",
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
        label: "Gym - calories burnt",
        data:
          weight_data.length === 0
            ? [120, 110, 130, 125, 135, 128, 132]
            : weight_data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Green
          "rgba(153, 102, 255, 0.6)", // Purple
          "rgba(255, 159, 64, 0.6)", // Orange
          "rgba(255, 205, 86, 0.6)", // Light Yellow
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Green
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)", // Orange
          "rgba(255, 205, 86, 1)", // Light Yellow
        ],
        borderWidth: 1,
      },
    ],
  };

  // This data structure is suitable for a pie chart

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
              <option>Select an Excercise</option>
              <option value="running">Running</option>
              <option value="walking">Walking</option>
              <option value="cycling">Cycling</option>
              <option value="Gym">Gym Excercises</option>
            </select>
            <input
              type="number"
              placeholder="enter the number of calories burnt"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            ></input>
            {add !== "true" && <button onClick={store_vital}>Submit</button>}
            {add === "true" && <button onClick={update_vital}>Update</button>}
          </div>
        </div>
      )}
      <h1 className={Style.h1}>Excercise Data</h1>
      <div className={styles.container}>
        <button className={style.button} onClick={display_add}>
          Add an Excercise data
        </button>
        <button className={style.button} onClick={update}>
          Update an Excercise Data
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Running</h3>
          {date_blood.length === 0 && (
            <p>
              this is a sample graph as you have not entered your Running Data
            </p>
          )}
          <Line data={data} />
        </div>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Walking</h3>
          {date_heart.length === 0 && (
            <p>
              this is a sample graph as you have not entered your step count
            </p>
          )}
          <Doughnut data={heart} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Cycling</h3>
          {date_glucose.length === 0 && (
            <p>
              this is a sample graph as you have not entered your Cycling data
            </p>
          )}
          <Bar data={glucose} />
        </div>
        <div className={styles.chart}>
          <h3 className={styles.h3}>Gym</h3>
          {date_weight.length === 0 && (
            <p>this is a sample graph as you have not entered your Gym data</p>
          )}
          <Pie data={weight} />
        </div>
      </div>
    </div>
  );
}

export default ExcerciseData;
