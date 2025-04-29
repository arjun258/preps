import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Profile = ({ vendor_data }) => {
  const location = useLocation();
  const { id } = location.state || {};

  const vendor = vendor_data.find((item) => item.id === id);

  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!vendor) {
    return (
      <div className="text-white d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h1 className="fs-2">Vendor Not Found</h1>
      </div>
    );
  }

  const toggleDescription = () => setShowFullDesc(!showFullDesc);
  const descriptionPreview = vendor.bus_description?.slice(0, 300); 

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="bg-dark text-white border border-secondary rounded-4 shadow-lg overflow-hidden vendor-profile"
        style={{ maxWidth: "600px", width: "100%", backgroundColor: "#121212" }}
      >
        {/* Business Image */}
        <img
          src={vendor.bus_img}
          alt="Business"
          className="img-fluid"
          style={{
            height: "250px",
            width: "100%",
            objectFit: "cover",
            borderBottom: "2px solid #444",
          }}
        />

        {/* Info */}
        <div className="p-4">
          {/* Business Name */}
          <h1
            className="fw-bold mb-2"
            style={{
              background: "linear-gradient(90deg, #00c6ff, #0072ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "2rem",
            }}
          >
            {vendor.business_name}
          </h1>

          {/* Category */}
          <p className="text-warning fw-semibold mb-3 fs-5">{vendor.category}</p>

          {/* Description with See More */}
          <p className="text-light">
            {showFullDesc
              ? vendor.bus_description
              : descriptionPreview}
            {vendor.bus_description.length > 150 && !showFullDesc && "..."}
          </p>

          {/* See More / See Less Button */}
          {vendor.bus_description.length > 150 && (
            <button
              className="btn btn-sm btn-link text-primary p-0"
              onClick={toggleDescription}
            >
              {showFullDesc ? "Show Less" : "Show More"}
            </button>
          )}

          {/* Tags */}
          <div className="d-flex flex-wrap gap-2 my-4">
            <span className="badge bg-info">{vendor.msp}</span>
            <span className="badge bg-success">{vendor.age_group}</span>
            <span className="badge bg-danger">{vendor.state}</span>
            <span className="badge bg-primary">{vendor.city}</span>
          </div>

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-around gap-3 mt-4">
            <button
              className="btn btn-outline-success flex-grow-1"
              onClick={() => window.open(`tel:${vendor.phone}`)}
            >
              📞 {vendor.phone}
            </button>
            <button
              className="btn btn-outline-danger flex-grow-1"
              onClick={() => navigator.clipboard.writeText(vendor.pincode)}
            >
              📍 {vendor.pincode}
            </button>
            <button
              className="btn btn-outline-warning flex-grow-1"
              onClick={() => alert("Show products coming soon!")}
            >
              🛒 Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
