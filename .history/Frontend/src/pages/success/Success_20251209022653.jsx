import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Success.scss";

const Success = () => {
  const { id } = useParams(); // orderId
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const res = await newRequest.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        setError("Order not found");
        console.log("Order not found", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (isLoading) return <div className="success-loading">Loading order...</div>;

  if (error) return (
    <div className="success-error">
      <h1>⚠️ {error}</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );

  return (
    <div className="success">
      <div className="container">
        <div className="celebration">
          <div className="confetti"></div>
          <div className="checkmark">✓</div>
        </div>
        
        <h1>Payment Successful!</h1>
        <p className="subtitle">Thank you for your order</p>

        <div className="order-details">
          <div className="detail-item">
            <span className="label">Order Title</span>
            <span className="value">{order?.title || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="label">Price</span>
            <span className="value">{order?.price} EGP</span>
          </div>
          <div className="detail-item">
            <span className="label">Seller ID</span>
            <span className="value">{order?.sellerId || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="label">Status</span>
            <span className="value status">✓ Completed</span>
          </div>
        </div>

        <div className="actions">
          <button className="primary" onClick={() => navigate("/orders")}>View My Orders</button>
          <button className="secondary" onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
