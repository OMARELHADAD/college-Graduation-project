import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { id } = useParams(); // orderId
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await newRequest.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.log("Order not found", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Order Title: {order.title}</p>
      <p>Price: {order.price} EGP</p>
      <p>Buyer ID: {order.buyerId}</p>
      <p>Seller ID: {order.sellerId}</p>
    </div>
  );
};

export default Success;
