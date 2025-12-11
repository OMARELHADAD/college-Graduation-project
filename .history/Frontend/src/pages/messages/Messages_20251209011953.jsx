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
              {data?.map((c) => (
                <tr
                  key={c.id}
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)
                      ? "active"
                      : ""
                  }
                >
                  <td>{c.userName || (currentUser.isSeller ? c.buyerId : c.sellerId)}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="message-link">
                      {c.lastMessage?.substring(0, 100) || "No messages yet"}
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    <button
                      onClick={() => handleRead(c.id)}
                      className="mark-read-btn"
                      style={{
                        backgroundColor: "#1dbf73",
                        color: "white",
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "13px",
                        opacity: (currentUser.isSeller && !c.readBySeller) || 
                        (!currentUser.isSeller && !c.readByBuyer) ? 1 : 0.5
                      }}
                    >
                      Mark as Read
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

export default Messages;
