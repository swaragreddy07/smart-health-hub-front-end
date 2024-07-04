//this is the otp page

import { renderToStaticMarkup } from "react-dom/server";
import styles from "../Components/otp.module.css";
import signstyles from "../Components/Signup.module.css";
import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // verify function is used to verify the otp

  function verify() {
    const data = {
      email: localStorage.getItem("email"),
      otp: otp,
    };
    console.log(data);
    fetch("http://localhost:8000/api/verify_otp", {
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
        if (result["status"] == 1) {
          navigate("/patient_dashboard");
        } else {
          setError("invalid otp");
        }
      });
  }
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <h2 className={`${styles.title} ${signstyles.title}`}>
          Otp Verification
        </h2>
        {error && <p className={`${styles.error} ${signstyles.p}`}>{error}</p>}
        <p className={styles.p}>
          We have sent a verification code to your email
        </p>
        <div className={styles.input}>
          <label className={styles.label} htmlFor="verify">
            Enter your Otp
          </label>
          <input
            placeholder="xxxxxx"
            type="text"
            id="verify"
            className={styles.textBox}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setError(null);
            }}
          ></input>
        </div>
        <button
          onClick={verify}
          className={`${signstyles.button} ${styles.button}`}
        >
          Verify Otp
        </button>
      </div>
    </div>
  );
}

export default Otp;
