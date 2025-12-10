<<<<<<< HEAD
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

return ( <div className="gig"> <div className="container"> <div className="left"> <span className="breadcrumbs">
Fiverr {'>'} Graphics & Design {'>'} </span>

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

              <button>Contact Me</button>
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
=======
import React from "react"
import "./Gig.scss"
import Slide from '../../components/Slide/Slide'

const Gig = () => {
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          <span className="breadcrumbs">Skillverse &gt; GRAPHICS &amp; DESIGN &gt;</span>

          <h1>I will create ai generated art for your project</h1>

          <div className="user">
            <img
              className="pp"
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="profile picture"
            />
            <span>Reem Ibrahim</span>
            <div className="stars" aria-hidden>
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <img src="/img/star.png" alt="star" />
              <span>5</span>
            </div>
          </div>

          <div className="slider">
            <Slide slidesToShow={1}>
              <img
                src="https://images.pexels.com/photos/17483848/pexels-photo-17483848.png"
                alt="image slider 1"
              />
              <img
                src="https://images.pexels.com/photos/17483848/pexels-photo-17483848.png"
                alt="image slider 2"
              />
              <img
                src="https://images.pexels.com/photos/17483848/pexels-photo-17483848.png"
                alt="image slider 3"
              />
            </Slide>
          </div>

          <h2>About This Gig</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
            laudantium necessitatibus fugiat pariatur id numquam, amet
            accusantium, commodi sed, laborum eius dolorem ab quos corporis
            labore quasi ut ex cumque?
          </p>

          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="user image"
              />
              <div className="info">
                <span>Asmaa adel</span>
                <div className="stars" aria-hidden>
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <img src="/img/star.png" alt="star" />
                  <span>5</span>
                </div>
                <button type="button" >Contact Me</button>
              </div>
            </div>

            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
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
              <p>
                My name is Anna, I enjoy creating AI generated art in my spare
                time. I have a lot of experience using the AI program and that
                means I know what to prompt the AI with to get a great and
                incredibly detailed result.
              </p>
            </div>
          </div>

          <div className="reviews">
            <h2>Reviews</h2>

            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Garner David</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>

              <div className="stars" aria-hidden>
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>

              <p>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>

              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
              </div>
            </div>

            <hr />
<<<<<<< HEAD
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
=======

            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Sidney Owen</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                      alt=""
                    />
                    <span>Germany</span>
                  </div>
                </div>
              </div>

              <div className="stars" aria-hidden>
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>

              <p>
                The designer took my photo for my book cover to the next level!
                Professionalism and ease of working with designer along with
                punctuality is above industry standards!! Whatever your project
                is, you need this designer!
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>

            <hr />

            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Lyle Giles </span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars" aria-hidden>
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                Amazing work! Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="price">
            <h3>1 AI generated image</h3>
            <h2>$ 59.99</h2>
          </div>
          <p>
            I will create a unique high quality AI generated image based on a
            description that you give me
          </p>

          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="clock" />
              <span>2 Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="recycle" />
              <span>3 Revisions</span>
            </div>
          </div>

          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="green check" />
              <span>Prompt writing</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="green check" />
              <span>Artwork delivery</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt=" green check " />
              <span>Image upscaling</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="green check" />
              <span>Additional design</span>
            </div>
          </div>
          <button type="button">Continue</button> 
        </div>
      </div>
    </div>
  )
}

export default Gig
>>>>>>> a68b8a9493919f638f23b69bc41f1ec47a4e2cae
