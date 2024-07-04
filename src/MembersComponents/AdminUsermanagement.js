import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";

function AdminUsermanagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    password: "",
    role_id: "",
    gender: "",
    phoneNumber: "",
    dob: "01/01/2022",
    isActive: true,
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch(" http://localhost:8000/api/patients")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const createUser = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    fetch(" http://localhost:8000/api/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("User registered successfully");
        fetchUsers();
        setNewUser({
          full_name: "",
          email: "",
          password: "",
          role_id: "",
          gender: "",
          phoneNumber: "",
          dob: "01/01/2022",
          isActive: true,
        });
      })
      .catch((error) => console.error("Error registering user:", error));
  };

  const toggleActivation = (userId, isActive) => {
    const activationStatus = isActive == 1 ? "deactivate" : "activate";
    fetch(
      ` http://localhost:8000/api/users${activationStatus}?user_id=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        alert(`User ${activationStatus}d successfully`);
        fetchUsers();
      })
      .catch((error) =>
        console.error(`Error ${activationStatus}ing user:`, error)
      );
  };

  const editUserDetails = (user) => {
    setEditUser(user);
    setNewUser({ full_name: user.full_name, phoneNumber: user.phoneNumber });
  };

  const updateUser = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: editUser.user_id,
        full_name: newUser.full_name,
        phoneNumber: newUser.phoneNumber,
      }),
    };

    fetch(" http://localhost:8000/api/updateUserData", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("User updated successfully");
        fetchUsers();
        setEditUser(null);
        setNewUser({
          full_name: "",
          email: "",
          password: "",
          role_id: "",
          gender: "",
          phoneNumber: "",
          dob: "01/01/2022",
          isActive: true,
        });
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const deleteUser = (userId) => {
    fetch(` http://localhost:8000/api/usersdelete?user_id=${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("User deleted successfully");
        fetchUsers();
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <>
      <AdminHeader />
      <div className="container">
        <h1 style={{ textAlign: "center" }}>User Management</h1>
        <div className="contact-form" style={{ maxWidth: "800px" }}>
          {editUser ? (
            <div>
              <input
                type="text"
                name="full_name"
                value={newUser.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              <input
                type="text"
                name="phoneNumber"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <button onClick={updateUser}>Update User</button>
            </div>
          ) : (
            <>
              <input
                type="text"
                name="full_name"
                value={newUser.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <input
                type="text"
                name="phoneNumber"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <select
                name="role_id"
                value={newUser.role_id}
                onChange={handleInputChange}
              >
                <option selected disabled>
                  Select Role
                </option>
                <option value="1" selected>
                  Patient
                </option>
                <option value="2">Healthcare Provider</option>
                {/* Add other roles as needed */}
              </select>
              <select
                name="gender"
                value={newUser.gender}
                onChange={handleInputChange}
              >
                <option selected disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                {/* Add other genders as needed */}
              </select>

              <button onClick={createUser}>Create User</button>
            </>
          )}
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Activate/Deactivate</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => editUserDetails(user)}
                      style={{
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteUser(user.user_id)}
                      style={{
                        background: "#dc3545",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        backgroundColor:
                          user.activated == 1 ? "#28a745" : "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        toggleActivation(user.user_id, user.activated)
                      }
                    >
                      {user.activated == 1 ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminUsermanagement;
