//This is the Services Page
import React from 'react'
import Header from './Header'
import styles from "../Components/service.module.css";
import records_image from "../assets/records.png"
import diagnosis_image from "../assets/diagnosis.png"
import appointment_image from "../assets/appointment.png"
import prescription_image from "../assets/prescription.png"
import reminder_image from "../assets/reminder.png"
import group_image from "../assets/group.png"


function Service() {
  return (
    <div>
      {/* importing the header */}
      <Header></Header>
      <div>
        <div className={styles.content}>
          <h1 className={styles.h1}>
            OUR <span className={styles.span}>SERVICE</span>
          </h1>
          <div className={styles.pContainer}>
            <p className={styles.heading}>
              Welcome to SmartHealth Hub, your all-in-one solution for managing
              your healthcare needs. Access a range of services designed to make
              healthcare management easy and convenient.
            </p>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.services}>
              <div className={`${styles.service} ${styles.one}`}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={records_image}
                  ></img>
                </div>
                <h2 className={styles.h2}>
                  Personal Health Records management
                </h2>
                <p className={styles.p}>
                  Manage all your health records effortlessly. Keep track of
                  your medications, and health metrics easily.
                </p>
              </div>
              <div className={`${styles.service} ${styles.two}`}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={appointment_image}
                  ></img>
                </div>
                <h2 className={styles.h2}>Appointment Management</h2>
                <p className={styles.p}>
                  Manage all your health Appointments effortlessly. Keep track
                  of your appointments with a healthcare provider easily.
                </p>
              </div>
              <div className={`${styles.service} ${styles.three}`}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={group_image}
                  ></img>
                </div>
                <h2 className={styles.h2}>Community Interaction</h2>
                <p className={styles.p}>
                  Interact with users and healthcare providers on the platform.
                  Ask any health-related questions or concerns and receive
                  clarification.
                </p>
              </div>
              <div className={`${styles.service} ${styles.four}`}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={diagnosis_image}
                  ></img>
                </div>
                <h2 className={styles.h2}>Symptom Checker</h2>
                <p className={styles.p}>
                  Check your symptoms and receive immediate feedback by using
                  our symptom checker. It is very accurate and will help you get
                  an idea.
                </p>
              </div>
              <div className={`${styles.service} ${styles.five}`}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={reminder_image}
                  ></img>
                </div>
                <h2 className={styles.h2}>Medication Reminders</h2>
                <p className={styles.p}>
                  Get medication reminders every day on your preferred platform
                  so you never miss a dose and can take care of your health
                  properly.
                </p>
              </div>
              <div className={`${styles.service} ${styles.six}`}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={prescription_image}
                  ></img>
                </div>
                <h2 className={styles.h2}>Prescription Management</h2>
                <p className={styles.p}>
                  Manage your prescriptions with paperless e-prescriptions that
                  are sent directly to you and your pharmacist from the
                  healthcare provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
