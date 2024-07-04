// This is the home page
// importing all the required modules and libraries

import React from "react";
import Header from "./Header";
import "../style.css";
import style from "../Components/home.module.css";
import aboutStyle from "../Components/About.module.css";
import doctor from "../assets/doctor.jpg";

const Home = () => {
  return (
    <div>
      <Header />
      <section className="hero">
        <div className="container">
          <h1 className={style.titleH}>Welcome to Our Healthcare</h1>
          <p className={style.titleP}>Providing quality healthcare services.</p>
        </div>
      </section>
      <div className="conatainer">
        <section className={style.intro}>
          <h1 className={style.h1}>
            Revolutionize Your Health with SmartHealth Hub
          </h1>
          <p className={style.p}>
            SmartHealth Hub is the destination for all your healthcare needs.
            Experience cutting-edge technology that helps you properly manage
            your health.
          </p>
          <div className={style.buttons}>
            <a href="/about-us">
              <button className={aboutStyle.button}>Learn More</button>
            </a>
            <a href="/sign-up">
              <button className={aboutStyle.button}>Sign Up</button>
            </a>
          </div>
        </section>
        <section className={style.section}>
          <h1 className={style.h1}>Keep Track of all your health records</h1>
          <p className={style.p}>
            SmartHealth Hub lets you keep track of all your health records which
            includes medication history, medical records, appointment history
            and also your personal health metrics.
          </p>
        </section>
        <div className={style.bodySection}>
          <div className={style.imgContainer}>
            <img className={style.img} src={doctor}></img>
          </div>
          <div className={style.content}>
            <div className={style.one}>
              <h1 className={style.contentH}>Health Care Providers</h1>
              <p className={style.contentP}>
                We have well-qualified healthcare providers with years of
                experience dedicated to helping you
              </p>
            </div>
            <div className={style.two}>
              <h1 className={style.contentH}>Pharmacists</h1>
              <p className={style.contentP}>
                We have amazing pharmacists who will dispense your medication
                instantly once they receive it from your healthcare provider.
              </p>
            </div>
          </div>
        </div>
        <section className="services">
          <div className="container">
            <ul>
              <li>
                <h1 className={style.contentH}>E-prescriptions</h1>
                <p className={style.contentP}>Get your prescriptions online.</p>
              </li>
              <li>
                <h1 className={style.contentH}>Symptom Checker</h1>
                <p className={style.contentP}>
                  Check your symptoms and get advice.
                </p>
              </li>
              <li>
                <h1 className={style.contentH}>Medication Reminder</h1>
                <p className={style.contentP}>
                  Get reminders for your medication.
                </p>
              </li>
            </ul>
          </div>
        </section>
        <div className={style.Button}>
          <a href="/service">
            <button className={aboutStyle.button}>Services</button>
          </a>
        </div>
        <section className="gallery">
          <div className="container">
            <div className="gallery-images">
              <img
                src="https://img.freepik.com/free-vector/mobile-medicine-isometric-flowchart-with-online-laboratory-symbols-illustration_1284-31378.jpg?t=st=1709812635~exp=1709816235~hmac=c7a22443a51e6180cd8cabae1b3f2b4501e7c4365796e06c5fd71f23f83c11e5&w=740"
                alt="Image 1"
              />
              <img
                src="https://img.freepik.com/free-vector/modern-medicine-isometric-composition-with-doctor-patient-medical-devices_1284-27118.jpg?t=st=1709812647~exp=1709816247~hmac=9f320fb0ccb72d63fbd01bc95225894b97cd4a9e6ee0eafcb76ebc78a5105c10&w=740"
                alt="Image 2"
              />
              <img
                src="https://img.freepik.com/free-vector/online-medicine-tests-medical-service-isometric-illustration_1284-31058.jpg?t=st=1709812707~exp=1709816307~hmac=30ee5a22376775f0375eb40a5704b9e7e45ff2782443e2cfb1645488acecfcb4&w=996"
                alt="Image 3"
              />
              <img src="https://img.freepik.com/free-vector/online-doctor-concept_23-2148546391.jpg?t=st=1709813048~exp=1709816648~hmac=b06f887286bef116e6425c47479ab187d244a4db5441971b2ba5b2657543b55c&w=740" />
            </div>
          </div>
        </section>
      </div>
      <footer style={{background:"black",color:"white"}}>
      <div class="container" style={{padding:"25px"}}>
            <div class="row justify-content-sm-between align-items-center">
               <div class="col-sm-6 mb-3 mb-sm-0">
                  <div class="d-flex align-items-center">
         
                     <span class="h5 text-white mb-0 ml-3">Powered by SmartHealthCare</span>
                  </div>
               </div>
               
            </div>
            <hr class="opacity-md"/>
            <p class="mb-0 text-white" style={{marginTop:"25px"}}>SmartHealthCare © 2024</p>
         </div>
      </footer>
    </div>
  );
};

export default Home;
