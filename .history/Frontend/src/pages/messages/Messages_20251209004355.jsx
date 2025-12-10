import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/api/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/api/conversations/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["conversations"]),
  });

  const handleRead = (id) => mutation.mutate(id);

  return (
    <div className="messages-page">
      {isLoading ? (
        <div className="container"><p>loading...</p></div>
      ) : error ? (
        <div className="container"><p>error loading messages</p></div>
      ) : (
        <div className="container">
          <h1>Messages</h1>
          <div className="messages-list">
            {data?.map((c) => (
              <div
                key={c.id}
                className={
                  (currentUser.isSeller && !c.readBySeller) ||
                  (!currentUser.isSeller && !c.readByBuyer)
                    ? "message-card active"
                    : "message-card"
                }
              >
                <div className="message-content">
                  <div className="message-header">
                    <h3>{c.userName || (currentUser.isSeller ? c.buyerId : c.sellerId)}</h3>
                    <span className="message-date">{moment(c.updatedAt).fromNow()}</span>
                  </div>
                  <Link to={`/message/${c.id}`} className="message-text">
                    {c.lastMessage?.substring(0, 100) || "No messages yet"}...
                  </Link>
                </div>
                <button
                  onClick={() => handleRead(c.id)}
                  className="mark-read-btn"
                >
                  Mark as Read
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
