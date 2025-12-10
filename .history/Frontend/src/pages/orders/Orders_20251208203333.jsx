import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await newRequest.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/success/${orderId}`); // استخدم orderId للانتقال لصفحة التفاصيل
  };

  return (
    <div className="orders">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.title}</td>
                <td>{order.price} EGP</td>
                <td>{order.buyerId}</td>
                <td>{order.sellerId}</td>
                <td>{order.isCompleted ? "Completed" : "Pending"}</td>
                <td>
                  <button onClick={() => handleViewOrder(order._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
