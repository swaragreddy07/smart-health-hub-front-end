// This is the forums professional collaborartion page
import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import styles from "./community.module.css";

function DoctorProfessionalCollab() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/forum");
        const data = await response.json();
        const transformedPosts = data.map((post, index) => ({
          id: index + 1,
          username: post.full_name,
          title: post.title,
          content: post.content,
        }));
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    username: "",
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const newPostWithUser = {
        ...newPost,
        username: "user",
        id: posts.length + 1,
        user_id: localStorage.getItem("user_id"),
      };
      setPosts([...posts, newPostWithUser]);
      setNewPost({ title: "", content: "", username: "" });

      // Send POST request to API endpoint
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostWithUser),
      };

      fetch("http://localhost:8000/api/forum", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } else {
      alert("Please fill in both title and content fields.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  return (
    <>
      <DoctorHeader />
      <h1 className={styles.h1}>Health Forums</h1>
      <div className={styles.div}>
        <div className={styles.form}>
          <label className={styles.label}>Title:</label>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <label className={styles.label}>Content:</label>
          <textarea
            className={styles.textarea}
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          ></textarea>
          <button className={styles.button} onClick={handleAddPost}>
            Add Post
          </button>
        </div>
        <div className={styles.post}>
          {posts.map((post) => (
            <div key={post.id}>
              <p>{post.username}</p>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DoctorProfessionalCollab;
