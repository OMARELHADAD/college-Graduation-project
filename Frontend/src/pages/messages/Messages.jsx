<<<<<<< HEAD
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [hiddenConversations, setHiddenConversations] = useState(new Set());

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/api/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/api/conversations/${id}`),
    onSuccess: (_, id) => {
      // Immediately hide the conversation from UI
      setHiddenConversations(prev => new Set([...prev, id]));
      // Then invalidate to update in background
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      console.error("Error marking as read:", error);
    }
  });

  const handleRead = (id) => {
    mutation.mutate(id);
    setSelectedConversation(null);
  };

  const handleRowClick = (id) => {
    navigate(`/message/${id}`);
  };

  const isConversationUnread = (conversation) => {
    return (currentUser.isSeller && !conversation.readBySeller) ||
           (!currentUser.isSeller && !conversation.readByBuyer);
  };

  if (isLoading) {
    return (
      <div className="messages-page">
        <div className="container">
          <div className="loading-state">
            <p>Loading your messages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="messages-page">
        <div className="container">
          <div className="error-state">
            <p>Error loading messages. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="messages-page">
        <div className="container">
          <h1>Messages</h1>
          <div className="empty-state">
            <p>No messages yet. Start a conversation!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <div className="container">
        <h1>Messages</h1>
        <table className="messages-table">
          <thead>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(c => !hiddenConversations.has(c.id))
              .map((c) => (
              <tr
                key={c.id}
                className={isConversationUnread(c) ? "active" : ""}
                onClick={() => handleRowClick(c.id)}
              >
                <td>{c.userName || (currentUser.isSeller ? c.buyerId : c.sellerId)}</td>
                <td>
                  <span className="message-link">
                    {c.lastMessage?.substring(0, 100) || "No messages yet"}
                  </span>
                </td>
                <td>{moment(c.updatedAt).fromNow()}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleRowClick(c.id)}
                      className="go-chat-btn"
                      title="Go to chat"
                    >
                      💬 Go to Chat
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
=======
import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr className="active">
            <td>Charley Sharp</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 hour ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr className="active">
            <td>John Doe</td>

            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 hours ago</td>
            <td>
              <button>Mark as Read</button>
            </td>
          </tr>
          <tr>
            <td>Elinor Good</td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>1 day ago</td>
          </tr>
          <tr>
            <td>Garner David </td>
            <td>
              <Link to="/message/123" className="link">
                {message.substring(0, 100)}...
              </Link>
            </td>
            <td>2 days ago</td>
          </tr>
          <tr>
            <td>Troy Oliver</td>
            <td>{message.substring(0, 100)}</td>
            <td>1 week ago</td>
          </tr>
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
        </table>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Messages;
=======
export default Messages;
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
