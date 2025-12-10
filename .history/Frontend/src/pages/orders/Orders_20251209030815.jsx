import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./Orders.scss";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/api/orders`).then((res) => {
        return res.data;
      }),
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
      const res = await newRequest.get(`/api/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          const res = await newRequest.post(`/api/conversations/`, {
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

  return (
    <div className="orders">
      {isLoading ? (
        <div className="container">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="container">
          <p>Error loading orders</p>
        </div>
      ) : data && data.length === 0 ? (
        <div className="container">
          <h1>My Orders</h1>
          <div className="empty-state">
            <p>You don't have any orders yet.</p>
          </div>
        </div>
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
              {data && data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img
                      className="image"
                      src={order.img}
                      alt={order.title}
                      onError={(e) => {
                        e.target.src = "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600";
                      }}
                    />
                  </td>
                  <td className="title-cell">{order.title}</td>
                  <td className="price-cell">${order.price}</td>
                  <td className="contact-cell">
                    <button
                      className="contact-btn"
                      onClick={() => handleContact(order)}
                      title="Contact seller"
                    >
                      💬
                    </button>
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

export default Orders;
