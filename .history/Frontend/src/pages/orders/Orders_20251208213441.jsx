import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Orders.scss";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => res.data),
  });

  const handleContact = async (order) => {
    if (!order?.sellerId || !order?.buyerId || !currentUser?.id) {
      console.error("Missing required data for contact");
      return;
    }

    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          const res = await newRequest.post(`/conversations/`, {
            to: currentUser.seller ? buyerId : sellerId,
          });
          navigate(`/message/${res.data.id}`);
        } catch (postErr) {
          console.error("Failed to create conversation:", postErr);
        }
      } else {
        console.error("Failed to get conversation:", err);
      }
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;

  // fallback في حالة data undefined
  const orders = data || [];

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="container">
          <h1>My Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order?._id || Math.random()}>
                  <td>
                    <img
                      className="image"
                      src={order?.img || ""}
                      alt={order?.title || "Order"}
                      onError={(e) => {
                        e.target.src = "/img/placeholder.png";
                      }}
                    />
                  </td>
                  <td>{order?.title || "N/A"}</td>
                  <td>{order?.price ? `${order.price} EGP` : "N/A"}</td>
                  <td>
                    <img
                      className="message"
                      src="/img/message.png"
                      alt="Message"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleContact(order)}
                      title="Contact seller"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
