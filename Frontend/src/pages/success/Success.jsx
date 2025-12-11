import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Success.scss";

const Success = () => {
  const location = useLocation();
  const order = location.state?.order;

  // If no order data is found (e.g., direct access), show error/redirect
  if (!order) {
    return (
      <div className="success-error">
        <h1>Unauthorized Access</h1>
        <Link to="/">
          <button>Go Back Home</button>
        </Link>
      </div>
    );
  }

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(order.price);

  return (
    <div className="success">
      <div className="container">
        <div className="celebration">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
          <div className="checkmark">✓</div>
        </div>

        <h1>Payment Successful!</h1>
        <p className="subtitle">
          Thank you for your purchase. Your order has been securely processed.
        </p>

        <div className="order-details">
          <div className="detail-item">
            <span className="label">Order ID</span>
            <span className="value">#{order._id.slice(-6).toUpperCase()}</span>
          </div>

          <div className="detail-item">
            <span className="label">Gig Title</span>
            <span className="value">{order.title}</span>
          </div>

          <div className="detail-item">
            <span className="label">Amount Paid</span>
            <span className="value">{formattedPrice}</span>
          </div>

          <div className="detail-item">
            <span className="label">Status</span>
            <span className="value status">
              <span className="dot">●</span> Active
            </span>
          </div>
        </div>

        <div className="actions">
          <Link to="/orders">
            <button className="primary">View My Orders</button>
          </Link>
          <Link to="/">
            <button className="secondary">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
