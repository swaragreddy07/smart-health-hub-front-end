import React from "react";
import Header from "./Header";
import styles from "../Components/ForumTopics.module.css";
import style from "../Components/Forum.module.css";
import image from "../assets/forum.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorHeader from "../MembersComponents/DoctorHeader";
import PatientHeader from "../MembersComponents/PatientHeader";

function ForumTopics() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [addTopic, setAddTopic] = useState(null);
  const [post_error, setPostError] = useState(null);
  const [post_title, setTitle] = useState();
  const [post_content, setContent] = useState();
  const [post_type, setType] = useState();
  function dispaly_add_topic() {
    setPostError(null);
    if (addTopic == null) {
      setAddTopic(true);
    } else {
      setAddTopic(null);
    }
  }

  function add_topic() {
    if (!post_title || !post_content || !post_type) {
      setPostError(true);
    } else {
      const data = {
        name: post_title,
        description: post_content,
        type: post_type,
      };
      fetch("http://localhost:8000/api/topics/create", {
        method: "POST",
        body: JSON.stringify(data),
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
          setPostError(null);
          setTitle(null);
          setContent(null);
          setType(null);
          setAddTopic(null);
          get_topics();
        });
    }
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function Forum_page(topic_id, name) {
    localStorage.setItem("topic_id", topic_id);
    localStorage.setItem("topic_name", name);
    navigate("/forum");
  }

  function get_topics() {
    fetch("http://localhost:8000/api/topics", {
      method: "GET",
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
        setTopics(result["topics"]);
      });
  }

  useEffect(() => {
    get_topics();
  }, []);

  return (
    <div>
      {localStorage.getItem("role_id") == 1 && <PatientHeader />}

      {localStorage.getItem("role_id") == 2 && <DoctorHeader />}
      <div class={styles.container}>
        <img class={styles.img} src={image}></img>
        <h1 class={styles.h1}>Health forums</h1>
      </div>
      <div className={styles.buttton_con}>
        <button
          className={`${style.button} ${styles.button}`}
          onClick={dispaly_add_topic}
        >
          Start a conversation
        </button>
      </div>
      {addTopic && (
        <div className={style.opinion}>
          {post_error && (
            <p className={styles.error}>
              Please add name, description and type
            </p>
          )}
          <input
            type="text"
            placeholder="Add a title"
            onChange={handleTitleChange}
            value={post_title}
            className={styles.input}
          />
          <textarea
            rows="4"
            cols="20"
            placeholder="Add a description"
            onChange={handleContentChange}
            value={post_content}
            className={styles.input}
          ></textarea>
          <input
            type="text"
            placeholder="Add a type"
            onChange={handleTypeChange}
            value={post_type}
            className={styles.input}
          />
          <button type="submit" onClick={add_topic} className={style.button}>
            POST
          </button>
        </div>
      )}
      <p className={styles.p}>Explore Different Forums</p>
      <div className={styles.topics}>
        <div className={styles.heading}>
          <ul className={styles.ul}>
            <li className={styles.li}>Forum</li>
            <li className={styles.li}>Type</li>
            <li className={styles.li}>Posts</li>
          </ul>
        </div>
        {topics.map((topic) => (
          <div
            className={styles.content}
            onClick={() => Forum_page(topic.topic_id, topic.name)}
          >
            <ul className={styles.each}>
              <li className={styles.name}>
                <p className={styles.p}>{topic.name}</p>
                <p className={styles.description}>{topic.description}</p>
              </li>
              <li className={styles.name}>{topic.type}</li>
              <li className={styles.name}>{topic.posts}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumTopics;
