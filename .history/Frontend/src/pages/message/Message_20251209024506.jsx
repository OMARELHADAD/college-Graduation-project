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
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/api/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  // Fetch conversation details (to get gig info)
  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: () =>
      newRequest.get(`/api/conversations/${id}`).then((res) => res.data),
  });

  // Fetch gig details if available
  const { data: gig } = useQuery({
    queryKey: ["gig", conversation?.gigId],
    queryFn: () =>
      newRequest.get(`/api/gigs/single/${conversation?.gigId}`).then((res) => res.data),
    enabled: !!conversation?.gigId,
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/api/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
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
          <Link to="/messages">Messages</Link> Ziad Elhoseny 
        </span>

        {/* GIG SECTION */}
        {gig && (
          <div className="gig-section">
            <div className="gig-card">
              <img src={gig.cover} alt={gig.title} className="gig-image" />
              <div className="gig-info">
                <h3>{gig.title}</h3>
                <p className="gig-price">${gig.price}</p>
                <Link to={`/gig/${gig._id}`} className="gig-link">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
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
