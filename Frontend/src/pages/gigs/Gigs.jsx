import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";


function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],
    queryFn: () => {
      const min = minRef.current?.value || "";
      const max = maxRef.current?.value || "";

      const sep = search ? "&" : "?";
      const params = `${search}${sep}min=${min}&max=${max}&sort=${sort}`;

      return newRequest.get(`/api/gigs${params}`).then((res) => res.data);
    },
  });

  // Apply filters
  const apply = () => {
    refetch();
  };

  // Change sort
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const params = new URLSearchParams(search);
  const category = params.get("cat");
  const searchTerm = params.get("search");
  const title = category ? category.replace(/-/g, " ") : searchTerm ? `Results for "${searchTerm}"` : "All Gigs";

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Skillverse {'>'} {title} {'>'}</span>
        <h1 style={{ textTransform: "capitalize" }}>{title}</h1>
        <p>Explore the boundaries of art and technology with Skillverse's {title}</p>



        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}

                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading || !data ? (
            "loading..."
          ) : error ? (
            "Something went wrong!"
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <div>No gigs found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
