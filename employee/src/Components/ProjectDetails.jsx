import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import FadeContent from '../Components/Animations/Animation.jsx';
// import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/projects/${id}`)
      .then(result => setProject(result.data))
      .catch(() => toast.error("Error fetching project details."));
  }, [id]);

  const handleStatusChange = (status) => {
    axios.post(`${API_URL}/api/projects/${id}/status`, { status })
      .then(() => {
        toast.success("Status updated!");
        setProject({ ...project, status });
      })
      .catch(() => toast.error("Error updating status."));
  };

  const handleAddComment = () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty.");
    
    axios.post(`${API_URL}/api/projects/${id}/comment`, { comment })
      .then(() => {
        toast.success("Comment added!");
        setProject({ ...project, comments: [...project.comments, comment] });
        setComment('');
      })
      .catch(() => toast.error("Error adding comment."));
  };

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div className="project-details-container">
        <h2>Project: {project.name}</h2>
        <p><strong>Status:</strong> {project.status}</p>

        <button className="btn" onClick={() => handleStatusChange('Pending')}>Mark Pending</button>
        <button className="btn" onClick={() => handleStatusChange('Completed')}>Mark Completed</button>

        <h3>Comments</h3>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." />
        <button className="btn" onClick={handleAddComment}>Add Comment</button>

        <div className="comments-section">
          {project.comments?.map((cmt, index) => (
            <p key={index} className="comment">{cmt}</p>
          ))}
        </div>
      </div>
    </FadeContent>
  );
};

export default ProjectDetails;
