// Services.jsx
import React from 'react';

const Services = (props) => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-5">
      <h1 className="display-4 mb-4 text-center text-primary">
        Services / Products
      </h1>
      <img
        src="https://via.placeholder.com/400" // Replace this with your actual image URL
        alt="Services or Products"
        className="img-fluid rounded shadow-lg"
      />
    </div>
  );
};

export default Services;
