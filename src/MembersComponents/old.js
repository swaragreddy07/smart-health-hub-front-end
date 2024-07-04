import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import style from "./message.module.css";
import img from "../assets/message.png";
import send from "../assets/send.png";
import background from "../assets/background.jpg";
import { string } from "yup";
function DoctorSecureMessaging() {
  const [list, setList] = useState([]);
  const [reply, setReply] = useState([]);
  const [color, setColor] = useState([]);
  
  const data = [
    {
      message: "Hey there! How's it going?",
      sender: 1,
      time: "17/04/2024",
    },
    {
      message: "Hi! I'm doing well, thanks for asking.",
      sender: 2,
      time: "17/04/2024",
    },
    {
      message: "I just wanted to catch up and see how things are.",
      sender: 1,
      time: "17/04/2024",
    },
    {
      message: "That's nice!",
      sender: 2,
      time: "17/04/2024",
    },
    {
      message: "Glad to hear it! Anything exciting happening?",
      sender: 1,
      time: "17/04/2024",
    },
    {
      message: "Not particularly, just the usual day-to-day stuff.",
      sender: 2,
      time: "17/04/2024",
    },
    {
      message: "Not particularly, just the usual day-to-day stuff.",
      sender: 2,
      time: "17/04/2024",
    },
    {
      message: "Not particularly, just the usual day-to-day stuff.",
      sender: 2,
      time: "17/04/2024",
    },

    // Add more messages here...
  ];

  function set_color(index) {
    if (color[index] == false || color[index] == null) {
      const newColor = Array(color.length).fill(false);
      newColor[index] = true;
      localStorage.setItem("index", index);
      setColor(newColor);
    }
  }

  function add() {
    setList([]);
    setReply([]);
    for (var i = 0; i <= 9; i++) {
      setList((prevList) => [...prevList, { [`swarag${i}`]: "hello" }]);
      setReply((prevList) => [...prevList, { [`reddy${i}`]: "hi" }]);
    }
  }

  useEffect(() => {
    add();
  }, []);
  return (
    <>
      <DoctorHeader />
      <div className={style.layout}>
        <div className={style.list}>
          <div className={style.heading}>
            <img src={img} className={style.image}></img>
            <h5 className={style.p}>Secure Communication</h5>
          </div>
          <div className={style.msg}>
            {list.map((item, index) => {
              const [key, value] = Object.entries(item)[0]; // Get the first (and only) key-value pair
              return (
                <div
                  className={style.index}
                  key={index}
                  onClick={() => set_color(index)}
                  style={color[index] ? { backgroundColor: "#d5e6f5" } : {}}
                >
                  <span className={style.letter}>{key[0]}</span>
                  <span className={style.key}>{key}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={style.message}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {item.sender === 1 && (
                <div className={style.sender1}>
                  <div class={style.messageContainer1}>
                    <p className={style.msgP}>{item.message}</p>
                    <p className={style.msgT}>{item.time}</p>
                  </div>
                </div>
              )}
              {item.sender === 2 && (
                <div className={style.sender2}>
                  <div class={style.messageContainer2}>
                    <span className={style.msgP}>{item.message}</span>
                    <span className={style.msgT}>{item.time}</span>
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
            ></input>
            <img src={send} className={style.img}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorSecureMessaging;
