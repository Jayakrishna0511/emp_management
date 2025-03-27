import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config.jsx";
import FadeContent from "../Components/Animations/Animation.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [comment, setComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/projects/${id}`)
      .then((result) => setProject({ ...result.data, comments: result.data.comments || [] }))
    //   .catch(() => toast.error("Error fetching project details."));
  }, [id]);

  const handleStatusChange = (status) => {
    axios
      .put(`${API_URL}/api/projects/${id}/status`, { status })
      .then(() => {
        toast.success("Status updated!");
        setProject((prev) => ({ ...prev, status }));
      })
      .catch(() => toast.error("Error updating status."));
  };

  const handleAddComment = () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty.");

    axios
      .put(`${API_URL}/api/projects/${id}/comment`, { comment })
      .then(() => {
        toast.success("Comment added!");
        setProject((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), comment],
        }));
        setComment("");
      })
      .catch(() => toast.error("Error adding comment."));
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditText(project.comments[index]);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return toast.error("Comment cannot be empty.");

    const updatedComments = [...project.comments];
    updatedComments[editingIndex] = editText;

    axios
      .put(`${API_URL}/api/projects/${id}/update-comment`, { comment: editText, index: editingIndex })
      .then(() => {
        toast.success("Comment updated!");
        setProject((prev) => ({ ...prev, comments: updatedComments }));
        setEditingIndex(null);
      })
      .catch(() => toast.error("Error updating comment."));
  };

  const handleLogout = () => {
    axios
      .get(`${API_URL}/auth/logout`)
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate("/");
        }
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="container-fluid min-vh-100 d-flex flex-column align-items-center bg-light p-4">
        <div className="card shadow-lg p-4 w-75 bg-white rounded">
          <h2 className="text-center text-primary fw-bold">Project: {project.name}</h2>
          <p className="text-center fs-5">
            <strong>Status:</strong>{" "}
            <span className={`badge ${project.status === "Completed" ? "bg-success" : "bg-warning"}`}>
              {project.status}
            </span>
          </p>

          {/* Status Change Buttons */}
          <div className="d-flex justify-content-center gap-3 my-3">
            <button className="btn btn-warning fw-bold" onClick={() => handleStatusChange("Pending")}>
              Mark Pending
            </button>
            <button className="btn btn-success fw-bold" onClick={() => handleStatusChange("Completed")}>
              Mark Completed
            </button>
          </div>

          {/* Comments Section */}
          <h3 className="mt-4 text-secondary">Comments</h3>
          <div className="mb-3">
            <textarea
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            />
          </div>
          <button className="btn btn-primary w-50 d-block mx-auto fw-bold" onClick={handleAddComment}>
            Add Comment
          </button>

          <div className="comments-section mt-4">
            {project.comments?.length > 0 ? (
              project.comments.map((cmt, index) => (
                <div key={index} className="comment-card p-2 my-2 rounded">
                  {editingIndex === index ? (
                    <div>
                      <textarea
                        className="form-control"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button className="btn btn-success btn-sm mt-2" onClick={handleSaveEdit}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm mt-2 ms-2"
                        onClick={() => setEditingIndex(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{cmt}</span>
                      <button className="btn btn-link text-primary p-0" onClick={() => handleEditComment(index)}>
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>

          {/* Back and Logout Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-secondary fw-bold px-4" onClick={() => navigate(-1)}>
              Back
            </button>

            <Button className="btn-danger px-4" onClick={handleLogout}>
              <i className="fs-5 bi bi-box-arrow-right"></i>
              <span className="ms-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <style>
        {`
          .comment-card {
            background-color: #f8f9fa;
            border-left: 5px solid #0d6efd;
            padding: 10px;
            transition: transform 0.2s ease-in-out;
          }
          .comment-card:hover {
            transform: scale(1.02);
            background-color: #e9ecef;
          }
        `}
      </style>
    </FadeContent>
  );
};

export default ProjectDetails;
