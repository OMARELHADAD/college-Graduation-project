import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("clients"); // "clients" or "inquiries"
  const [hiddenConversations, setHiddenConversations] = useState(new Set());

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/api/conversations`).then((res) => res.data),
  });

  // Effect to set default tab
  React.useEffect(() => {
    if (data && currentUser.isSeller) {
      const clientCount = data.filter(c => c.isClient).length;
      if (clientCount === 0 && data.length > 0) {
        setActiveTab("inquiries");
      }
    }
  }, [data, currentUser.isSeller]);

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/api/conversations/${id}`),
    onSuccess: (_, id) => {
      // Optimistic update handled by local state in UI usually, but invalidation works too
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const handleRowClick = (id) => {
    // optional: mark as read on click
    handleRead(id);
    navigate(`/message/${id}`);
  };

  const isConversationUnread = (c) => {
    return (currentUser.isSeller && !c.readBySeller) ||
      (!currentUser.isSeller && !c.readByBuyer);
  };

  // Filter conversations based on tab
  // Buyers only see their chats. Sellers see "Clients" (who bought) vs "Inquiries" (who didn't).
  // Ideally, if I am a Buyer, I am a "Client" to someone else, but this split view is mostly for Sellers.
  // For Buyers, we can just show "All Messages" or adapt logic.
  // Requirement says: "split ... to two sections imp and normal one for users who bought the gig"
  // This implies mostly Seller-side view.

  const getFilteredConversations = () => {
    if (!data) return [];
    if (!currentUser.isSeller) return data; // Buyers just see all chats

    if (activeTab === "clients") {
      return data.filter(c => c.isClient === true);
    } else {
      return data.filter(c => c.isClient !== true);
    }
  };

  const filteredData = getFilteredConversations();

  if (isLoading) return <div className="messages-page loading">Loading...</div>;
  if (error) return <div className="messages-page error">Error loading messages</div>;

  return (
    <div className="messages-page">
      <div className="container">
        <div className="header">
          <h1>Messages</h1>
          {currentUser.isSeller && (
            <div className="tabs">
              <button
                className={activeTab === "clients" ? "active" : ""}
                onClick={() => setActiveTab("clients")}
              >
                Clients
                {data?.filter(c => c.isClient).length > 0 && <span className="badge">{data.filter(c => c.isClient).length}</span>}
              </button>
              <button
                className={activeTab === "inquiries" ? "active" : ""}
                onClick={() => setActiveTab("inquiries")}
              >
                Inquiries
                {data?.filter(c => !c.isClient).length > 0 && <span className="badge">{data.filter(c => !c.isClient).length}</span>}
              </button>
            </div>
          )}
        </div>

        <div className="messages-list">
          <AnimatePresence mode="wait">
            <motion.table
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="messages-table"
            >
              <thead>
                <tr>
                  <th>{currentUser.isSeller ? "User" : "Freelancer"}</th>
                  <th>Gig</th>
                  <th>Last Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr><td colSpan="5" className="empty-msg">
                    {activeTab === "clients"
                      ? "No client messages yet. Check 'Inquiries'!"
                      : "No inquiries yet."}
                  </td></tr>
                ) : (
                  filteredData.map((c) => (
                    <tr
                      key={c.id}
                      className={`
                                        ${isConversationUnread(c) ? "active" : ""}
                                        ${c.isClient ? "client-row" : ""}
                                    `}
                      onClick={() => handleRowClick(c.id)}
                    >
                      <td>
                        <div className="user-cell">
                          <img src={c.userImg || "/img/noavatar.jpg"} alt="" />
                          <div className="name-info">
                            <span className="name">{c.userName}</span>
                            {c.isClient && <span className="tag bought">Bought Gig</span>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="gig-cell">
                          {c.gigImg && <img src={c.gigImg} alt="" />}
                          <span>{c.gigTitle ? c.gigTitle.substring(0, 30) + "..." : "Unknown Gig"}</span>
                        </div>
                      </td>
                      <td className="msg-preview">
                        <p>{c.lastMessage?.substring(0, 80)}...</p>
                      </td>
                      <td>{moment(c.updatedAt).fromNow()}</td>
                      <td>
                        {(
                          (currentUser.isSeller && c.readBySeller) ||
                          (!currentUser.isSeller && c.readByBuyer)
                        ) ? (
                          <span className="seen" title="Seen">✓✓</span>
                        ) : (
                          <button className="mark-read">Mark as Read</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </motion.table>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Messages;

