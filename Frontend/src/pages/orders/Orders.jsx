import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

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
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/api/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        const res = await newRequest.post(`/api/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders">
      {isLoading ? (
        <div className="container">
          <div className="empty-state">
            <p>⏳ Loading your orders...</p>
          </div>
        </div>
      ) : error ? (
        <div className="container">
          <div className="empty-state error">
            <p>❌ Error loading orders. Please try again.</p>
          </div>
        </div>
      ) : !data || data.length === 0 ? (
        <div className="container">
          <div className="empty-state">
            <p>📦 No orders yet. Start exploring gigs!</p>
            <Link to="/gigs" className="cta-link">Browse Gigs</Link>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>Orders</h1>
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
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img || "/img/noavatar.jpg"} alt={order.title} />
                  </td>
                  <td className="title-cell">{order.title}</td>
                  <td className="price-cell">${order.price} / hr</td>
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
