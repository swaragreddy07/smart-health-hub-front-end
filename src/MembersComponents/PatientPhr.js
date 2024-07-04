import React from "react";
import PatientHeader from "./PatientHeader";
import styles from "../Components/service.module.css";
import style from "./health.module.css";
import medical from "../assets/medical.jpg";
import pres from "../assets/pres.jpg";
import run from "../assets/run.jpg";
import vital from "../assets/vital.jpg";
import { Route, useNavigate } from "react-router-dom";

function Phr() {
  const navigate = useNavigate();

  function Medical(){
    navigate('/medical')
  }
  function Pres(){
    navigate('/reminder')
  }
  function Vital(){
    navigate('/vital')
  }

  function Run(){
    navigate('/excercise')
  }


  return (
    <div>
      {/* importing the header */}
      <PatientHeader />
      <div>
        <div className={style.content}>
          <h1 className={styles.h1}>
            Your <span className={styles.span}>Health Records</span>
          </h1>
          <div className={styles.pContainer}>
            <p className={styles.heading}>
              Access your health records by selecting below options
            </p>
          </div>
          <div className={`${styles.gridContainer} ${style.gridContainer}`}>
            <div className={`${styles.services} ${style.services}`}>
              <div
                className={`${styles.service} ${styles.one} ${style.one}`}
                onClick={Medical}
              >
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={medical}></img>
                </div>
                <h2 className={styles.h2}>Medical history</h2>
                <p className={styles.p}>
                  Acess of your medical records easily at one place
                </p>
              </div>
              <div className={`${styles.service} ${styles.two} ${style.two}`}  onClick={Pres}>
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={pres}></img>
                </div>
                <h2 className={styles.h2}>Prescriptions</h2>
                <p className={styles.p}>
                  Get all the details of your prescriptions for each appointment
                  with your health care provider
                </p>
              </div>
              <div
                className={`${styles.service} ${styles.three} ${style.three}`}
                onClick={Vital}
              >
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={vital}></img>
                </div>
                <h2 className={styles.h2}>Vital signs</h2>
                <p className={styles.p}>View and store your vital signs.</p>
              </div>
              <div
                className={`${styles.service} ${styles.four}  ${style.four}`}
                onClick={Run}
              >
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={run}></img>
                </div>
                <h2 className={styles.h2}>Exercise Data</h2>
                <p className={styles.p}>
                  Store all your exercise data to keep track of calories burnt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Phr;
