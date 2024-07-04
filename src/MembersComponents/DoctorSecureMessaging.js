import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import PharmacistHeader from "./PharmacistHeader";
import PatientHeader from "./PatientHeader";
import style from "./message.module.css";
import img from "../assets/message.png";
import send from "../assets/send.png";
import background from "../assets/background.jpg";
import { string } from "yup";

function DoctorSecureMessaging() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Function to fetch users from the API
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:8000/api/allusers");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error("Error fetching users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  // Function to fetch messages when selectedUser changes
  useEffect(() => {
    let timeout;
    if (selectedUser) {
      // Set a timeout to fetch messages after 15 seconds
      timeout = setInterval(() => {
        fetchMessages(selectedUser.user_id);
      }, 200);
    }
    return () => clearTimeout(timeout); // Clear the timeout on component unmount or when selectedUser changes
  }, [selectedUser]);

  // Function to fetch messages from the API
  async function fetchMessages(receiver) {
    try {
      const sender = localStorage.getItem("user_id");
      const response = await fetch(
        `https://sxp8023.uta.cloud/backend_laravel/message.php?method=getmessage&sender_id=${sender}&receiver_id=${receiver}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Error fetching messages:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  // Function to send message
  const sendMessage = async () => {
    const sender = localStorage.getItem("user_id");
    const messageData = {
      sender_id: sender,
      receiver_id: selectedUser.user_id,
      message: newMessage,
    };

    try {
      // Send POST request using Fetch API
      const response = await fetch(
        "https://sxp8023.uta.cloud/backend_laravel/message.php?method=insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      );

      if (response.ok) {
        // If message is sent successfully, fetch messages again
        fetchMessages(selectedUser.user_id);
        setNewMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to handle user selection
  function handleUserSelect(user) {
    setSelectedUser(user);
  }

  return (
    <>
      {localStorage.getItem("role_id") === "2" && <DoctorHeader />}
      {localStorage.getItem("role_id") === "1" && <PatientHeader />}
      {localStorage.getItem("role_id") === "4" && <PharmacistHeader />}

      <div className={style.layout}>
        <div className={style.list}>
          <div className={style.heading}>
            <h5 className={style.p}>Secure Communication</h5>
          </div>

          {localStorage.getItem("role_id") === "1" && (
            <div className={style.msg}>
              {users.map(
                (user, index) =>
                  (user.role_id === 2 || user.role_id === 4) && (
                    <div
                      key={index}
                      className={style.index}
                      onClick={() => handleUserSelect(user)}
                      style={
                        selectedUser && user.user_id === selectedUser.user_id
                          ? { backgroundColor: "#d5e6f5" }
                          : {}
                      }
                    >
                      <span className={style.letter}>{user.full_name[0]}</span>
                      <p>{user.full_name}</p>
                    </div>
                  )
              )}
            </div>
          )}

          {(localStorage.getItem("role_id") === "2" ||
            localStorage.getItem("role_id") === "4") && (
            <div className={style.msg}>
              {users.map(
                (user, index) =>
                  user.role_id === 1 && (
                    <div
                      key={index}
                      className={style.index}
                      onClick={() => handleUserSelect(user)}
                      style={
                        selectedUser && user.user_id === selectedUser.user_id
                          ? { backgroundColor: "#d5e6f5" }
                          : {}
                      }
                    >
                      <span className={style.letter}>{user.full_name[0]}</span>
                      <p>{user.full_name}</p>
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        <div className={style.message}>
          {selectedUser && (
            <div>
              <h2>Chat with {selectedUser.full_name}</h2>
              {/* Render chat messages here */}
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  {(msg.receiver_id ===
                    parseInt(localStorage.getItem("user_id")) ||
                    msg.sender_id === selectedUser.user_id) && (
                    <div className={style.sender1}>
                      <div className={style.messageContainer1}>
                        <p className={style.msgP}>{msg.message}</p>
                        <p className={style.msgT}>{msg.sent_At}</p>
                      </div>
                    </div>
                  )}
                  {msg.sender_id ===
                    parseInt(localStorage.getItem("user_id")) && (
                    <div className={style.sender2}>
                      <div className={style.messageContainer2}>
                        <span className={style.msgP}>{msg.message}</span>
                        <span className={style.msgT}>{msg.sent_At}</span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}

              <div className={style.send}>
                <input
                  type="text"
                  placeholder="Type your message here"
                  className={style.input}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={sendMessage}
                  disabled={!selectedUser || !newMessage.trim()}
                  className={style.button}
                >
                  <img src={send} className={style.img} alt="Send" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default DoctorSecureMessaging;
