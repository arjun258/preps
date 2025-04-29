import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css"; // We’ll add the custom CSS styling here

const Post = (props) => {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState("Subscribe");
  const [showFullDesc, setShowFullDesc] = useState(false);

  const googleMapsLink = `https://www.google.com/maps/place/${props.bus_name}/`;

  const toggleDescription = () => setShowFullDesc(!showFullDesc);

  // Show only first 150 characters by default
  const descriptionPreview = props.data.post_desc?.slice(0, 150);

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="vendor-post bg-dark text-light border rounded-lg shadow-lg overflow-hidden"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
          <div className="d-flex align-items-center gap-3">
            <a
             
              onClick={()=>{navigate("/profile", { state: { id: props.data.id } })}}
              className="text-primary text-decoration-none fs-4 fw-bold"
              
            >
              {props.bus_name}
            </a>
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => setSubscribe("Subscribed")}
            >
              {subscribe}
            </button>
          </div>
          <i className="fas fa-ellipsis-h text-muted"></i>
        </div>

        {/* Image */}
        <img
          src={props.data.post_img}
          alt="Vendor"
          className="img-fluid rounded-top"
          style={{ height: "250px", objectFit: "cover" ,width :"100%"}}
        />

        {/* Action Buttons */}
        <div className="d-flex flex-wrap justify-content-around gap-3 p-3">
          <button
            className="btn btn-outline-primary flex-grow-1"
            onClick={() => window.open("https://wa.me/+91" + props.number)}
          >
            <i className="fas fa-comments me-2"></i> Chat
          </button>
          <button
            className="btn btn-outline-primary flex-grow-1"
            onClick={() => window.open(googleMapsLink)}
          >
            <i className="fas fa-map-marker-alt me-2"></i> Directions
          </button>
          <button
            className="btn btn-outline-primary flex-grow-1"
            onClick={() =>
              navigate("/service", { state: { id: props.data.id } })
            }
          >
            <i className="fas fa-box-open me-2"></i> Services/Product
          </button>
        </div>

        {/* Caption */}
        <div className="px-4">
          <h6 className="text-primary mb-3">{props.data.post_caption}</h6>
        </div>

        {/* Divider */}
        <div className="border-top my-3"></div>

        {/* Description */}
        <div className="px-4 pb-4">
          {showFullDesc ? (
            <p className="lead">{props.data.post_desc}</p>
          ) : (
            <p className="lead">
              {descriptionPreview}
              {props.data.post_desc.length > 150 && "..."}
            </p>
          )}

          {props.data.post_desc.length > 150 && (
            <button
              className="btn btn-sm btn-link text-primary p-0"
              onClick={toggleDescription}
            >
              {showFullDesc ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
