import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import moment from "moment";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [otherUserName, setOtherUserName] = useState("User");
  const messagesEndRef = useRef(null);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/api/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/api/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    if (message.trim()) {
      mutation.mutate({
        conversationId: id,
        desc: message,
      });
      e.target[0].value = "";
    }
  };

  return (
    <div className="message">
      <div className="container">
        <div className="header">
          <span className="breadcrumbs">
            <Link to="/messages">
              <span className="icon">←</span> Messages
            </Link>
            <span className="separator">/</span>
            <span className="username">{otherUserName}</span>
          </span>
          <div className="status-indicator">
            <span className="online-dot"></span>
            <span className="status-text">Active now</span>
          </div>
        </div>

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : error ? (
          <div className="error">
            <span className="error-icon">⚠️</span>
            <p>Failed to load messages</p>
          </div>
        ) : (
          <div className="messages">
            {data && data.length === 0 ? (
              <div className="no-messages">
                <span className="empty-icon">💬</span>
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              data?.map((m, index) => (
                <div
                  className={m.userId === currentUser._id ? "owner item" : "item"}
                  key={m._id}
                >
                  <img
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="User avatar"
                  />
                  <div className="message-wrapper">
                    <p>{m.desc}</p>
                    <span className="timestamp">
                      {moment(m.createdAt).format("HH:mm")}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            type="text"
            placeholder="Type your message here..."
            maxLength={500}
          />
          <div className="button-group">
            <span className="char-count">
              {500 - (document.querySelector("textarea")?.value.length || 0)}
            </span>
            <button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
