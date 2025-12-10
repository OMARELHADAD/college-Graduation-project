<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
=======
import React, { useRef, useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard"
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
<<<<<<< HEAD

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
=======
  const minRef = useRef();
  const maxRef = useRef();

>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

<<<<<<< HEAD
  useEffect(() => {
    refetch();
  }, [sort]);
=======
  const apply = ()=>{
    console.log(minRef.current.value)
    console.log(maxRef.current.value)
  }
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae

  return (
    <div className="gigs">
      <div className="container">
<<<<<<< HEAD
        <span className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</span>
        <h1>AI Artists</h1>
        <p>Explore the boundaries of art and technology with Liverr's AI artists</p>

=======
        <span className="breadcrumbs">Skillverse - Graphics & Design </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Skillverse AI artists
        </p>
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
<<<<<<< HEAD

=======
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
<<<<<<< HEAD
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

=======
            <img src="../../../public/img/down.png" alt="" onClick={() => setOpen(!open)} />
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
<<<<<<< HEAD
                )}

                <span onClick={() => reSort("sales")}>Popular</span>
=======
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
              </div>
            )}
          </div>
        </div>
<<<<<<< HEAD

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
=======
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Gigs;
=======
export default Gigs;
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
