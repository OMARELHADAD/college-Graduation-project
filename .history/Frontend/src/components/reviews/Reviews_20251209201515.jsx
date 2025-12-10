import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState("5");
  const [submitError, setSubmitError] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      newRequest.get(`/api/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/api/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", gigId] });
      setDesc("");
      setStar("5");
      setSubmitError(null);
    },
    onError: (error) => {
      setSubmitError(error.response?.data?.message || "Failed to add review");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!desc.trim()) {
      setSubmitError("Please write a review");
      return;
    }

    mutation.mutate({ gigId, desc: desc.trim(), star: parseInt(star) });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : Array.isArray(data) && data.length > 0 ? (
        data.map((review) => <Review key={review._id} review={review} />)
      ) : (
        <p>No reviews yet.</p>
      )}

      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your opinion" required />
          <select required>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
