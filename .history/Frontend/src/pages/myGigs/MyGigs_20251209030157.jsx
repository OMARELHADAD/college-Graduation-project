import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./MyGigs.scss";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch gigs created by current user
  const { isLoading, error, data: gigs } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/api/gigs?userId=${currentUser._id}`).then((res) => res.data),
  });

  // Delete gig mutation
  const deleteMutation = useMutation({
    mutationFn: (gigId) => newRequest.delete(`/api/gigs/${gigId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (gigId) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      deleteMutation.mutate(gigId);
    }
  };

  const handleEdit = (gigId) => {
    navigate(`/gig/${gigId}`);
  };

  if (isLoading) return <div className="myGigs"><div className="container"><p>Loading your gigs...</p></div></div>;
  if (error) return <div className="myGigs"><div className="container"><p>Error loading gigs</p></div></div>;

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>My Gigs</h1>
          <Link to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>

        {!gigs || gigs.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any gigs yet.</p>
            <Link to="/add">
              <button>Create Your First Gig</button>
            </Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gigs.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img
                      className="image"
                      src={gig.cover}
                      alt={gig.title}
                      onError={(e) => {
                        e.target.src = "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600";
                      }}
                    />
                  </td>
                  <td>
                    <Link to={`/gig/${gig._id}`} className="gig-title-link">
                      {gig.title}
                    </Link>
                  </td>
                  <td>${gig.price}</td>
                  <td>{gig.sales || 0}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(gig._id)}
                        title="Edit gig"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(gig._id)}
                        disabled={deleteMutation.isPending}
                        title="Delete gig"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyGigs;