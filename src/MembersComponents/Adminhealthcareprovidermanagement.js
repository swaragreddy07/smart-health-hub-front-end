import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "./AdminHeader";
import styles from "./facility.module.css";
import style from "../Components/Forum.module.css";
import Styles from "./incident.module.css";
import Style from "./patient.module.css";
import Styl from "./staff.module.css";
import manage from "./manage.module.css";

function Adminhealthcareprovidermanagement() {
  const [get, setGet] = useState();
  const [display_add, setAdd] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState(true);
  const [qualification, setQualification] = useState(null);
  const [specialization, setSpecialization] = useState(null);
  const [number, setNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [email_error, setEmailError] = useState();
  const [phone_error, setPhoneError] = useState();
  const inputRef = useRef(null);
  const [update_id, setUpdate] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [update_pass, setPass] = useState(null);
  const [update_pa, setPa] = useState(null);
  const [error_pa, setErrorPa] = useState(null);
  const [selectedRole, setSelectedRole] = useState("healthcareProvider");

  function handleRadioChange(event) {
    setSelectedRole(event);
    let role = 2;
    if (event == "pharmacist") {
      role = 4;
    } else if (event == "User") {
      role = 1;
    } else if (event == "health_admin") {
      role = 5;
    } else {
      role = 2;
    }
    get_doctors(role);
  }

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
    setEmail(null);
    setPassword(null);
    setGender("male");
    setDob(null);
    setPhone(null);
    setStatus(true);
    setQualification(null);
    setSpecialization(null);
    setNumber(null);
    setEmailError(null);
    setCity(null);
    setPhoneError(null);
    setUpdate(null);
    setError(null);
    setPass(null);
    setPa(null);
    setErrorPa(null);
    let role = 1;
    if (selectedRole == "pharmacist") {
      role = 4;
    } else if (selectedRole == "User") {
      role = 1;
    } else if (selectedRole == "health_admin") {
      role = 5;
    } else {
      role = 2;
    }
    get_doctors(role);
  }

  function add_doctor() {
    let error = 1;
    if (selectedRole == "healthcareProvider") {
      if (
        email == null ||
        name == null ||
        dob == null ||
        phone == null ||
        qualification == null ||
        specialization == null ||
        number == null ||
        email == "" ||
        name == "" ||
        dob == "" ||
        phone == "" ||
        qualification == "" ||
        specialization == "" ||
        number == ""
      ) {
        error = 0;
        setError("please enter all the details");
      }
    } else if (selectedRole == "pharmacist") {
      if (
        email == null ||
        name == null ||
        dob == null ||
        phone == null ||
        qualification == null ||
        city == null ||
        number == null ||
        email == "" ||
        name == "" ||
        dob == "" ||
        phone == "" ||
        qualification == "" ||
        city == "" ||
        number == ""
      ) {
        error = 0;
        setError("please enter all the details");
      }
    } else {
      if (
        email == null ||
        name == null ||
        dob == null ||
        phone == null ||
        email == "" ||
        name == "" ||
        dob == "" ||
        phone == ""
      ) {
        error = 0;
        setError("please enter all the details");
      }
    }

    if (!/^\d{10}$/.test(phone)) {
      error = 0;
      setPhoneError("enter a valid phone number");
    }

    if (error == 1) {
      let stat = true;
      if (status !== "1") {
        stat = false;
      }
      let role = 1;
      if (selectedRole == "pharmacist") {
        role = 4;
      } else if (selectedRole == "User") {
        role = 1;
      } else if (selectedRole == "health_admin") {
        role = 5;
      } else {
        role = 2;
      }
      const data = {
        password: password,
        email: email,
        full_name: name,
        role_id: role,
        dob: dob,
        phoneNumber: phone,
        gender: gender,
        speciality: specialization,
        activated: stat,
        qualification: qualification,
        license_number: number,
        city: city,
      };
      let url = "";
      let method = "";
      if (update_id == null) {
        url = "http://localhost:8000/api/storedoctor";
        method = "POST";
      } else {
        url = `http://localhost:8000/api/storedoctor/${update_id}`;
        method = "PUT";
      }
      console.log(data);
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
          if (result["message"] == 1) {
            console.log(result["error"]);
            setEmailError("please enter a valid email");
          } else if (result["message"] == 2) {
            setError("The email already exists");
          } else {
            displayAdd();
          }
        });
    }
  }

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function get_doctors(role) {
    const data = {
      role_id: role,
    };
    fetch(`http://localhost:8000/api/doctor`, {
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
        console.log(result["message"]);
        setGet(result["message"]);
      });
  }

  function update_password($id) {
    if (update_pa == null) {
      setAdd(null);
      change();
      setPa($id);
    } else {
      change();
    }
  }

  function password_update() {
    if (update_pass == null || update_pass == "") {
      setErrorPa("please enter the password");
    } else {
      const data = {
        password: update_pass,
      };
      fetch(`http://localhost:8000/api/password/${update_pa}`, {
        method: "PUT",
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
          change();
          alert("password successfully updated");
        });
    }
  }

  function delete_doc(id) {
    fetch(`http://localhost:8000/api/storedoctor/${id}`, {
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
        change();
      });
  }
  useEffect(() => {
    get_doctors(2);
  }, []);

  return (
    <>
      <div className={styles.main}>
        <AdminHeader />
        <h1 className={Styl.h1}>USER MANAGEMENT</h1>
        <div className={manage.container}>
          <div className={`${Styl.Container} ${manage.Container}`}>
            <input
              type="radio"
              id="health"
              name="role"
              value="healthcareProvider"
              className={`${Styl.radio} ${manage.radio}`}
              checked={selectedRole === "healthcareProvider"}
            />
            <label
              for="healthcareProvider"
              className={`${Styl.label} ${manage.label}`}
              onClick={() => handleRadioChange("healthcareProvider")}
            >
              Doctor
            </label>

            <input
              type="radio"
              id="pharma"
              name="role"
              value="pharmacist"
              className={`${Styl.radio} ${manage.radio}`}
              checked={selectedRole === "pharmacist"}
            />
            <label
              for="pharmacist"
              className={`${Styl.label} ${manage.label}`}
              onClick={() => handleRadioChange("pharmacist")}
            >
              Pharmacist
            </label>
          </div>
          <div className={`${Styl.Container} ${manage.Container}`}>
            <input
              type="radio"
              id="user"
              name="role"
              value="User"
              className={`${Styl.radio} ${manage.radio}`}
              checked={selectedRole === "User"}
            />
            <label
              for="user"
              className={`${Styl.label} ${manage.label}`}
              onClick={() => handleRadioChange("User")}
            >
              Patient
            </label>

            <input
              type="radio"
              id="admin"
              name="role"
              value="health_admin"
              className={`${Styl.radio} ${manage.radio}`}
              checked={selectedRole === "health_admin"}
            />
            <label
              for="admin"
              className={`${Styl.label} ${manage.label}`}
              onClick={() => handleRadioChange("health_admin")}
            >
              Health Admin
            </label>
          </div>
        </div>
        <div className={styles.Button}>
          <button
            className={`${style.button} ${styles.button1} ${Styles.button1}`}
            onClick={displayAdd}
            ref={inputRef}
          >
            {selectedRole === "healthcareProvider" &&
              "Add Health Care Provider"}
            {selectedRole === "User" && "Add Patient"}
            {selectedRole === "health_admin" && "Add Health Administrator"}
            {selectedRole === "pharmacist" && "Add Pharmacist"}
          </button>
        </div>
        {update_pa && (
          <div className={styles.input}>
            <h2>Update Password</h2>
            {error_pa && <p className={styles.error}>{error_pa}</p>}
            <input
              type="text"
              value={update_pass}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            ></input>
            <div className={styles.swarag}>
              <button
                className={`${style.button} ${styles.button2}`}
                onClick={password_update}
              >
                Update
              </button>
            </div>
          </div>
        )}
        {display_add && (
          <div className={styles.input}>
            {selectedRole === "healthcareProvider" && (
              <h2>Enter Health Care Provider Details</h2>
            )}
            {selectedRole === "User" && <h2>Enter Patient Details</h2>}
            {selectedRole === "health_admin" && (
              <h2>Enter Health Administrator Details</h2>
            )}
            {selectedRole === "pharmacist" && <h2>Enter Pharmacist Details</h2>}
            {error && <p className={styles.error}>{error}</p>}
            <input
              type="text"
              value={name}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            {email_error && <p className={styles.error}>{email_error}</p>}
            <input
              type="email"
              placeholder="Email"
              defaultValue={email}
              onBlur={(e) => setEmail(e.target.value)}
            ></input>
            <p>select the gender of the user:</p>
            {!update_id && (
              <input
                type="password"
                placeholder="Password"
                defaultValue={password}
                onBlur={(e) => setPassword(e.target.value)}
              ></input>
            )}
            <select
              value={gender}
              onChange={(e) => {
                e.target.value == "male"
                  ? setGender("male")
                  : setGender("female");
              }}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
            {phone_error && <p className={styles.error}>{phone_error}</p>}
            <input
              type="text"
              value={phone}
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
            <p>Select date of birth:</p>
            <input
              type="date"
              className={styles.date}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            ></input>
            {selectedRole === "healthcareProvider" ||
            selectedRole === "pharmacist" ? (
              <input
                type="text"
                value={qualification}
                placeholder="Qualification"
                onChange={(e) => setQualification(e.target.value)}
              />
            ) : null}

            {selectedRole === "healthcareProvider" && (
              <input
                type="text"
                value={specialization}
                placeholder="Specialization"
                onChange={(e) => setSpecialization(e.target.value)}
              ></input>
            )}
            {selectedRole === "pharmacist" && (
              <input
                type="text"
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            )}
            {selectedRole === "healthcareProvider" ||
            selectedRole === "pharmacist" ? (
              <input
                type="text"
                value={number}
                placeholder="License Number"
                onChange={(e) => setNumber(e.target.value)}
              ></input>
            ) : null}
            <p>Select Account Activation status:</p>
            <select
              value={status}
              onChange={(e) => {
                e.target.value == "1" ? setStatus("1") : setStatus("0");
              }}
            >
              <option value={"1"}>Activate</option>
              <option value={"0"}>Deactivate</option>
            </select>

            <div className={styles.Button}>
              {update_id && (
                <button
                  className={`${style.button} ${styles.button2}`}
                  onClick={add_doctor}
                >
                  Update
                </button>
              )}
              {!update_id && (
                <button
                  className={`${style.button} ${styles.button1}`}
                  onClick={add_doctor}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        <div className={styles.main_table}>
          <div
            className={`${styles.table_header} ${Styles.table_header} ${manage.table_header}`}
          >
            {selectedRole === "healthcareProvider" && (
              <h1 className={`${styles.h1} ${Styles.h1}`}>
                Health Care Providers Information
              </h1>
            )}
            {selectedRole === "User" && (
              <h1 className={`${styles.h1} ${Styles.h1}`}>
                Patients Information
              </h1>
            )}
            {selectedRole === "health_admin" && (
              <h1 className={`${styles.h1} ${Styles.h1}`}>
                Health Administrators Information
              </h1>
            )}
            {selectedRole === "pharmacist" && (
              <h1 className={`${styles.h1} ${Styles.h1}`}>
                Pharmacists Information
              </h1>
            )}
          </div>
          <div className={styles.table_body}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>email</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Phone Number</th>

                  {selectedRole === "healthcareProvider" ||
                  selectedRole === "pharmacist" ? (
                    <th>Qualification</th>
                  ) : null}
                  {selectedRole === "healthcareProvider" ||
                  selectedRole === "pharmacist" ? (
                    <th>License Number</th>
                  ) : null}
                  {selectedRole === "healthcareProvider" && (
                    <th>Specialization</th>
                  )}
                  {selectedRole === "pharmacist" && <th>City</th>}
                  <th>Account Status</th>
                  <th></th>
                  <th></th>
                  <th></th>
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
                      {selectedRole === "healthcareProvider" ||
                      selectedRole === "pharmacist" ? (
                        <td>{item.qualification}</td>
                      ) : null}
                      {selectedRole === "healthcareProvider" ||
                      selectedRole === "pharmacist" ? (
                        <td>{item.license_number}</td>
                      ) : null}

                      {selectedRole === "healthcareProvider" && (
                        <td>{item.speciality}</td>
                      )}
                      {selectedRole === "pharmacist" && <td>{item.city}</td>}

                      {item.activated === "1" && (
                        <td>
                          <span className={styles.green}>
                            Account Activated
                          </span>
                        </td>
                      )}
                      {item.activated !== "1" && (
                        <td>
                          <span className={styles.red}>
                            Account not activated
                          </span>
                        </td>
                      )}

                      <td>
                        <p
                          className={`${Style.update} ${Styles.update}`}
                          onClick={(e) => {
                            setName(item.full_name);
                            setEmail(item.email);
                            setPassword(null);
                            setGender(item.gender);
                            setDob(item.dob);
                            setPhone(item.phoneNumber);
                            setCity(item.city);
                            item.activated === "1" && setStatus("1");
                            item.activated !== "1" && setStatus("0");
                            setQualification(item.qualification);
                            setSpecialization(item.speciality);
                            setNumber(item.license_number);
                            setEmailError(null);
                            setPhoneError(null);
                            setUpdate(item.user_id);
                            setError(null);
                            setAdd(true);
                            scrollToInput();
                          }}
                        >
                          Update
                        </p>
                      </td>
                      <td>
                        <p
                          className={`${Style.delete} ${Styles.delete}`}
                          onClick={(e) => {
                            delete_doc(item.user_id);
                          }}
                        >
                          Delete
                        </p>
                      </td>
                      <td>
                        <p
                          className={`${Style.update} ${Styles.update1}`}
                          onClick={(e) => {
                            update_password(item.user_id);
                            scrollToInput();
                          }}
                        >
                          Update Password
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminhealthcareprovidermanagement;
