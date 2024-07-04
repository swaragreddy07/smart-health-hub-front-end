import React from "react";
import Header from "./Header";
import styles from "../Components/Forum.module.css";
import male_user from "../assets/male user.png";
import female_user from "../assets/female user.png";
import male_doctor from "../assets/male doctor.png";
import female_doctor from "../assets/female doctor.png";
import { useState, useEffect, useRef } from "react";
import DoctorHeader from "../MembersComponents/DoctorHeader";
import PatientHeader from "../MembersComponents/PatientHeader";

function Forum() {
  const [comment, displayComment] = useState([]);
  const [post, displayAddPost] = useState(false);
  const [post_list, setPost] = useState([]);
  const [comment_list, setComment] = useState([]);
  const [post_content, setContent] = useState();
  const [post_title, setTitle] = useState();
  const [post_error, setError] = useState();
  const [addComment, setAddComment] = useState([]);
  const [post_id, setPostId] = useState();
  const [postStatus, setPostStatus] = useState();
  const [editComment, setEditComment] = useState([]);
  const [editCommentId, setEditCommentId] = useState([]);

  const inputRef = useRef(null);
  function display_comment(id) {
    displayComment((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  function delete_post(id) {
    fetch(`http://localhost:8000/api/forum/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        get_posts();
        get_comments();
      });
  }

  function delete_comment(id) {
    fetch(`http://localhost:8000/api/forum/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        get_posts();
        get_comments();
      });
  }

  function update_post() {
    if (post_title && post_content) {
      const data = {
        title: post_title,
        content: post_content,
      };
      fetch(`http://localhost:8000/api/forum/${post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setContent(null);
          setTitle(null);
          get_posts();
          get_comments();
          setError(null);
          displayAddPost(false);
        });
    } else {
      setError(true);
    }
  }

  function update_comment(id, comm_content) {
    const data = {
      content: comm_content,
    };
    fetch(`http://localhost:8000/api/forum/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        get_posts();
        get_comments();
        setEditComment((prevState) => ({
          ...prevState,
          [id]: null,
        }));
        setEditCommentId((prevState) => ({
          ...prevState,
          [id]: null,
        }));
      });
  }

  function get_comments() {
    fetch("http://localhost:8000/api/forum/comment/index", {
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
        setComment(result["comments"]);
      });
  }
  function display_add_post(id) {
    setError(null);
    if (id == 1) {
      setPostStatus(1);
      setContent(null);
      setTitle(null);
      if (post == false) {
        displayAddPost(true);
      } else {
        displayAddPost(false);
      }
    } else {
      setPostStatus(2);
      displayAddPost(true);
    }
  }

  function get_posts() {
    const data = {
      topic_id: localStorage.getItem("topic_id"),
    };
    fetch("http://localhost:8000/api/forum/posts", {
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
        setPost(result["posts"]);
      });
  }

  function store_comments(postId) {
    const data = {
      post_id: postId,
      content: addComment[postId],
      user_id: localStorage.getItem("user_id"),
    };
    setAddComment((prevState) => ({
      ...prevState,
      [postId]: "",
    }));

    fetch("http://localhost:8000/api/forum/comment", {
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
        get_posts();
        get_comments();
      });
  }

  useEffect(() => {
    get_posts();
  }, []);

  useEffect(() => {
    get_comments();
  }, []);

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function add_post() {
    if (post_title && post_content) {
      const data = {
        title: post_title,
        user_id: localStorage.getItem("user_id"),
        content: post_content,
        topic_id: localStorage.getItem("topic_id"),
      };
      fetch("http://localhost:8000/api/forum", {
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
          setContent(null);
          setTitle(null);
          get_posts();
          get_comments();
          setError(null);
          displayAddPost(false);
        });
    } else {
      setError(true);
    }
  }

  function setComments(postId, comment) {
    setAddComment((prevState) => ({
      ...prevState,
      [postId]: comment,
    }));
  }

  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {localStorage.getItem("role_id") == 1 && <PatientHeader />}

      {localStorage.getItem("role_id") == 2 && <DoctorHeader />}
      <h1 className={styles.h1}>
        {"Activity in " + localStorage.getItem("topic_name") + " Forum"}
      </h1>
      <div className={styles.intro}>
        <button
          className={styles.button}
          ref={inputRef}
          onClick={() => {
            display_add_post(1);
          }}
        >
          ADD YOUR OPINION
        </button>
      </div>
      {post && (
        <div className={styles.opinion}>
          {post_error && (
            <p className={styles.error}>Please add title and description</p>
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
            cols="50"
            placeholder="Add a description"
            onChange={handleContentChange}
            value={post_content}
            className={styles.input}
          ></textarea>
          {postStatus === 1 && (
            <button type="submit" onClick={add_post} className={styles.button}>
              POST
            </button>
          )}
          {postStatus === 2 && (
            <button
              type="submit"
              onClick={update_post}
              className={styles.button}
            >
              UPDATE
            </button>
          )}
        </div>
      )}
      {post_list.map((post) => (
        <div className={styles.posts}>
          <div className={styles.heading}>
            <div className={styles.image}>
              {post.user.gender === "male" && post.user.role_id !== 2 ? (
                <img className={styles.profile} src={male_user}></img>
              ) : post.user.gender === "female" && post.user.role_id !== 2 ? (
                <img className={styles.profile} src={female_user}></img>
              ) : post.user.gender === "male" && post.user.role_id === 2 ? (
                <img className={styles.profile} src={male_doctor}></img>
              ) : (
                <img className={styles.profile} src={female_doctor}></img>
              )}
              <span className={styles.name}>{post.user.full_name}</span>
              {post.user.role_id === 1 ? (
                <span className={styles.role}>--Honored User</span>
              ) : (
                <span className={styles.role}>--Honored Doctor</span>
              )}
            </div>
            <p className={styles.para}>{post.post_date_time}</p>
          </div>
          <div className={styles.title}>
            <h2 className={styles.h2}>{post.title}</h2>
          </div>
          <div className={styles.content}>
            <p className={styles.contentP}>{post.content}</p>
          </div>
          <div className={styles.like}>
            <button
              onClick={() => display_comment(post.post_id)}
              className={styles.button}
            >
              Comments
            </button>
            {post.user_id.toString() ===
              localStorage.getItem("user_id").toString() && (
              <button
                className={styles.delete}
                onClick={() => delete_post(post.post_id)}
              >
                DELETE
              </button>
            )}
            {post.user_id.toString() ===
              localStorage.getItem("user_id").toString() && (
              <button
                className={styles.update}
                onClick={() => {
                  setTitle(post.title);
                  setContent(post.content);
                  setPostId(post.post_id);
                  display_add_post(2);
                  scrollToInput();
                }}
              >
                EDIT
              </button>
            )}
          </div>
          {comment[post.post_id] && (
            <div className={styles.comment}>
              <div className={styles.input}>
                <input
                  className={styles.post_comment}
                  type="text"
                  placeholder="Add a comment..."
                  onChange={(e) => setComments(post.post_id, e.target.value)}
                  value={addComment[post.post_id]}
                ></input>
                <button
                  onClick={() => store_comments(post.post_id)}
                  className={styles.comment_button}
                >
                  post
                </button>
              </div>

              {comment_list.map(
                (comment) =>
                  comment.post_id === post.post_id && (
                    <div className={styles.postComments}>
                      <div className={styles.heading}>
                        <div className={styles.image}>
                          <span className={styles.name}>
                            @{comment.user.full_name}
                          </span>
                          {comment.user.role_id === 1 ? (
                            <span className={styles.role}>--Honored User</span>
                          ) : (
                            <span className={styles.role}>
                              --Honored Doctor
                            </span>
                          )}
                        </div>
                        <p className={styles.para}>{comment.post_date_time}</p>
                      </div>
                      <div className={styles.content}>
                        {!editCommentId[comment.comment_id] && (
                          <p className={styles.contentP}>{comment.content}</p>
                        )}
                        {editCommentId[comment.comment_id] && (
                          <div className={styles.edit_div}>
                            <input
                              type="text"
                              className={styles.post_comment}
                              value={editComment[comment.comment_id]}
                              onChange={(e) => {
                                setEditComment((prevState) => ({
                                  ...prevState,
                                  [comment.comment_id]: e.target.value,
                                }));
                              }}
                            ></input>
                            <button
                              className={styles.comment_edit}
                              onClick={() => {
                                update_comment(
                                  comment.comment_id,
                                  editComment[comment.comment_id]
                                );
                              }}
                            >
                              Update
                            </button>
                          </div>
                        )}
                        {comment.user_id.toString() ===
                          localStorage.getItem("user_id").toString() && (
                          <button
                            className={styles.comment_delete}
                            onClick={() => {
                              delete_comment(comment.comment_id);
                            }}
                          >
                            DELETE
                          </button>
                        )}
                        {comment.user_id.toString() ===
                          localStorage.getItem("user_id").toString() && (
                          <button
                            className={styles.comment_update}
                            onClick={() => {
                              if (
                                !editComment[comment.comment_id] &&
                                !editCommentId[comment.comment_id]
                              ) {
                                setEditComment((prevState) => ({
                                  ...prevState,
                                  [comment.comment_id]: comment.content,
                                }));
                                setEditCommentId((prevState) => ({
                                  ...prevState,
                                  [comment.comment_id]: comment.comment_id,
                                }));
                              } else {
                                setEditCommentId((prevState) => ({
                                  ...prevState,
                                  [comment.comment_id]: null,
                                }));
                                setEditComment((prevState) => ({
                                  ...prevState,
                                  [comment.comment_id]: null,
                                }));
                              }
                            }}
                          >
                            EDIT
                          </button>
                        )}
                      </div>
                      <hr></hr>
                    </div>
                  )
              )}
            </div>
          )}
          <hr></hr>
        </div>
      ))}
    </div>
  );
}
export default Forum;
