import React, { useState } from "react";
import PatientHeader from "./PatientHeader";
import styles from "./community.module.css";

const PatientCommunityinteraction = () => {
  const [posts, setPosts] = useState([
    { id: 1, username: "swarag", title: "Post 1", content: "Content for post 1" },
    { id: 2,username : "sunny", title: "Post 2", content: "Content for post 2" },
    { id: 3,username: "raj", title: "Post 3", content: "Content for post 3" },
  ]);
  const [newPost, setNewPost] = useState({ title: "", content: "", username: "" });

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const newPostWithUser = { ...newPost, username: 'user', id: posts.length + 1 };
      setPosts([...posts, newPostWithUser]);
      setNewPost({ title: "", content: "", username: "" });
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
      <PatientHeader />
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
};

export default PatientCommunityinteraction;
