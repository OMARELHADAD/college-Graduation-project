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
        "Loading..."
      ) : error ? (
        "Error loading orders"
      ) : data.length === 0 ? (
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
              {data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className="image" src={order.img} alt={order.title} />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price} EGP</td>
                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt="Message"
                      onClick={() => handleContact(order)}
                      style={{ cursor: "pointer" }}
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
