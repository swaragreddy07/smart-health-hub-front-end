// this is the Login Page
import Header from "./Header";
import { useState } from "react";
import styles from "../Components/Signup.module.css";
import loginStyles from "../Components/SignIn.module.css";
import { Route, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState(null);

  function set_email(event) {
    setEmail(event.target.value);
  }

  function set_password(event) {
    setPassword(event.target.value);
  }

  // This function is used to verify if the login credentials are correct
  function validiate(event) {
    event.preventDefault();
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        if (result.status === 1) {
          // If status is 1, login successful
          setError(null);
          // Redirect user based on role_id
          const role_id = result.user.role_id;
          const user_id = result.user.user_id;
          localStorage.setItem("role_id", role_id);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("email", result.user.email);
          localStorage.setItem("name", result.user.full_name);
          switch (role_id) {
            case 1: // Patient
              navigate("/patient_dashboard");
              break;
            case 2: // Doctor
              navigate("/doctors");
              break;
            case 3: // Admin
              navigate("/admin");
              break;
            case 4: // Health Admin
              navigate("/pharmacy");
              break;
            case 5: // Pharmacy
              navigate("/healthadmin");
              break;
            default:
              setError("Invalid role");
              break;
          }
        } else {
          // If status is not 1, display error message
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }
  return (
    <div>
      <Header></Header>
      <div className={`${styles.body} ${loginStyles.body}`}>
        <div className={`${styles.signUp} ${loginStyles.signUp}`}>
          <div className={`${styles.formContent} ${loginStyles.formContent}`}>
            <h1 className={`${styles.title} ${loginStyles.title}`}>Login</h1>
            {errors && (
              <p className={`${styles.p} ${loginStyles.p}`}>{errors}</p>
            )}
            <form
              className={`${styles.form} ${loginStyles.form}`}
              onSubmit={validiate}
            >
              <div className={`${styles.inputBox} ${loginStyles.one}`}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={`${styles.textbox} ${loginStyles.textbox}`}
                  placeholder="example@gmail.com"
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(event) => {
                    set_email(event);
                    setError(null);
                  }}
                ></input>
              </div>
              <div className={`${styles.inputBox} ${loginStyles.two}`}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  className={`${styles.textbox} ${loginStyles.textbox}`}
                  type="password"
                  required
                  id="password"
                  value={password}
                  onChange={(event) => {
                    set_password(event);
                    setError(null);
                  }}
                ></input>
              </div>
              <button
                className={`${styles.button} ${loginStyles.button}`}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
