import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  // Fetch messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/api/messages/${id}`).then((res) => {
        return res.data;
      }),
    enabled: !!id,
  });

  // Fetch orders to find related gig
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/api/orders`).then((res) => res.data),
  });

  // Find the order related to this conversation
  const relatedOrder = orders?.find(
    (order) =>
      (order.buyerId === currentUser._id && order.sellerId) ||
      (order.sellerId === currentUser._id && order.buyerId)
  );

  // Fetch gig details if order exists
  const { data: gig } = useQuery({
    queryKey: ["gig", relatedOrder?.gigId],
    queryFn: () =>
      newRequest.get(`/api/gigs/single/${relatedOrder?.gigId}`).then((res) => res.data),
    enabled: !!relatedOrder?.gigId,
  });

  // Fetch conversation to get other user's ID
  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () =>
      newRequest.get(`/api/conversations/single/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  // Determine other user's ID
  const otherUserId = conversation
    ? currentUser.isSeller
      ? conversation.buyerId
      : conversation.sellerId
    : null;

  // Fetch other user's details
  const { data: otherUser } = useQuery({
    queryKey: ["user", otherUserId],
    queryFn: () =>
      newRequest.get(`/api/users/${otherUserId}`).then((res) => res.data),
    enabled: !!otherUserId,
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/api/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; {otherUser?.username || "Start Chat"}
        </span>

        {/* GIG SECTION */}
        {(gig || relatedOrder) && (
          <div className="gig-section">
            <div className="gig-card">
              <img
                src={gig?.cover || relatedOrder?.img}
                alt={gig?.title || relatedOrder?.title}
                className="gig-image"
              />
              <div className="gig-info">
                <h3>{gig?.title || relatedOrder?.title}</h3>
                <p className="gig-price">${gig?.price || relatedOrder?.price}</p>
                {gig && (
                  <Link to={`/gig/${gig._id}`} className="gig-link">
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : error ? (
          <div className="error-message">
            Error loading messages. Please try again.
          </div>
        ) : data && data.length > 0 ? (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        )}

        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
