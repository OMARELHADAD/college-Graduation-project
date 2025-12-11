import React from "react";
import "./Gig.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/api/gigs/single/${id}`).then(res => res.data),
  });

  const userId = data?.userId?._id || data?.userId;

  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/api/users/${userId}`).then(res => res.data),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading gig...</div>;
  if (error) return <div>Something went wrong: {error.message}</div>;

  const rating = data?.starNumber > 0 ? Math.round(data.totalStars / data.starNumber) : 0;

  const carouselResponsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (<div className="gig"> <div className="container"> <div className="left"> <span className="breadcrumbs">
    Skillverse {'>'} Graphics & Design {'>'} </span>

    ```
    <h1>{data?.title || "Untitled Gig"}</h1>

    {/* USER INFO */}
    {isLoadingUser ? (
      <div>Loading user...</div>
    ) : errorUser ? (
      <div>Something went wrong: {errorUser.message}</div>
    ) : (
      <div className="user">
        <img className="pp" src={dataUser?.img || "/img/noavatar.jpg"} alt="" />
        <span>{dataUser?.username}</span>

        {rating > 0 && (
          <div className="stars">
            {Array(rating).fill().map((_, i) => (
              <img src="/img/star.png" alt="star" key={i} />
            ))}
            <span>{rating}</span>
          </div>
        )}
      </div>
    )}

    {/* IMAGES SLIDER */}
    {data?.images?.length > 0 && (
      <Carousel
        responsive={carouselResponsive}
        infinite
        arrows
        autoPlay
        autoPlaySpeed={3000}
        containerClass="carousel-container"
        className="slider"
      >
        {data.images.map((img) => (
          <img key={img} src={img} alt="gig" />
        ))}
      </Carousel>
    )}

    <h2>About This Gig</h2>
    <p>{data?.desc || "No description available."}</p>

    {/* SELLER INFO */}
    {!isLoadingUser && !errorUser && dataUser && (
      <div className="seller">
        <h2>About The Seller</h2>
        <div className="user">
          <img src={dataUser.img || "/img/noavatar.jpg"} alt="seller" />
          <div className="info">
            <span>{dataUser.username}</span>

            {rating > 0 && (
              <div className="stars">
                {Array(rating).fill().map((_, i) => (
                  <img src="/img/star.png" alt="star" key={i} />
                ))}
                <span>{rating}</span>
              </div>
            )}

            <Link to={`/messages`}>
              <button>Contact Me</button>
            </Link>
          </div>
        </div>

        <div className="box">
          <div className="items">
            <div className="item">
              <span className="title">From</span>
              <span className="desc">{dataUser?.country || "Unknown"}</span>
            </div>
            <div className="item">
              <span className="title">Member since</span>
              <span className="desc">Aug 2022</span>
            </div>
            <div className="item">
              <span className="title">Avg. response time</span>
              <span className="desc">4 hours</span>
            </div>
            <div className="item">
              <span className="title">Last delivery</span>
              <span className="desc">1 day</span>
            </div>
            <div className="item">
              <span className="title">Languages</span>
              <span className="desc">English</span>
            </div>
          </div>

          <hr />
          <p>{dataUser?.desc || "No description available."}</p>
        </div>
      </div>
    )}

    <Reviews gigId={id} />
  </div>

    {/* RIGHT SECTION */}
    <div className="right">
      <div className="price">
        <h3>{data?.shortTitle}</h3>
        <h2>$ {data?.price}</h2>
      </div>

      <p>{data?.shortDesc}</p>

      <div className="details">
        <div className="item">
          <img src="/img/clock.png" alt="" />
          <span>{data?.deliveryTime} Days Delivery</span>
        </div>
        <div className="item">
          <img src="/img/recycle.png" alt="" />
          <span>{data?.revisionNumber} Revisions</span>
        </div>
      </div>

      <div className="features">
        {data?.features?.map((feature) => (
          <div className="item" key={feature}>
            <img src="/img/greencheck.png" alt="" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Link to={`/pay/${id}`}>
        <button>Continue</button>
      </Link>
    </div>
  </div>
  </div>


  );
}

export default Gig;
