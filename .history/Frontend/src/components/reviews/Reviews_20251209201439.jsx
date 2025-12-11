import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
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
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star: parseInt(star) });
    e.target[0].value = "";
    e.target[1].value = "1";
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
