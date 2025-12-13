import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  // Fetch conversation with enriched data (gig info + isClient)
  const { isLoading: isLoadingConv, data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () =>
      newRequest.get(`/api/conversations/single/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  // Fetch messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/api/messages/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  // Determine other user details
  const otherUserId = conversation
    ? currentUser.isSeller
      ? conversation.buyerId
      : conversation.sellerId
    : null;

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

  // Logic for "Seen" status
  // If I sent the last message, and the other person has read it.
  const isMyLastMessageSeen = () => {
    if (!data || data.length === 0 || !conversation) return false;
    const lastMsg = data[data.length - 1];
    if (lastMsg.userId !== currentUser._id) return false; // Not my message

    return currentUser.isSeller
      ? conversation.readByBuyer
      : conversation.readBySeller;
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; {otherUser?.username || "Chat"}
        </span>

        {/* HEADER BADGE & GIG INFO */}
        {conversation && (
          <div className="chat-header-info">
            {conversation.isClient && (
              <div className="client-badge">
                <span>⭐ Client (Bought this Gig)</span>
              </div>
            )}
            <div className="gig-snippet">
              {conversation.gigImg && <img src={conversation.gigImg} alt="" />}
              <span className="gig-title">
                Topic: <Link to={`/gig/${conversation.gigId}`}>{conversation.gigTitle || "Gig Discussion"}</Link>
              </span>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : error ? (
          <div className="error-message">Error loading messages.</div>
        ) : (
          <div className="messages">
            {data && data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src={m.userId === currentUser._id ? (currentUser.img || "/img/noavatar.jpg") : (otherUser?.img || "/img/noavatar.jpg")}
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}

            {/* SEEN INDICATOR */}
            {isMyLastMessageSeen() && (
              <div className="seen-indicator">
                <span>✓✓ Seen</span>
              </div>
            )}
            <div style={{ height: 20 }} /> {/* Spacer */}
          </div>
        )}

        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write a message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
