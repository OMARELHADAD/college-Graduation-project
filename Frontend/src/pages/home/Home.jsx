import React from 'react'
import { Link } from "react-router-dom";
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/Slide/Slide'
import { cards } from '../../data'
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Home = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["homeProjects"],
    queryFn: () => newRequest.get("/api/gigs").then((res) => res.data),
  });
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className='home'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Featured />
      <TrustedBy />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Slide slidesToShow={4}>
          {cards.map(card => (
            <CatCard key={card.id} item={card} />
          ))}
        </Slide>
      </motion.div>

      {/* Features part */}
      <div className="features">
        <div className="container">
          <motion.div
            className="item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>A whole world of freelance talent at your fingertips</h1>
            {[
              { title: "The best for every budget", desc: "Find high-quality services at every price point. No hourly rates, just project-based pricing." },
              { title: "Quality work done quickly", desc: "Find the right freelancer to begin working on your project within minutes." },
              { title: "Protected payments, every time", desc: "Always know what you'll pay upfront. Your payment isn't released until you approve the work." },
              { title: "24/7 support", desc: "Find high-quality services at every price point. No hourly rates, just project-based pricing." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="title">
                  <img src="./img/check.png" alt="" />
                  {feature.title}
                </div>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="item special-item"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2>If you don't know what <span>FREELANCING </span>is?</h2>
            <video src="./img/video.mp4" controls />
          </motion.div>
        </div>
      </div>

      <div className="explore">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Explore the marketplace
          </motion.h1>
          <motion.div
            className="items"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { img: "graphics-design.d32a2f8.svg", title: "Graphics & Design" },
              { img: "online-marketing.74e221b.svg", title: "Digital Marketing" },
              { img: "writing-translation.32ebe2e.svg", title: "Writing & Translation" },
              { img: "video-animation.f0d9d71.svg", title: "Video & Animation" },
              { img: "music-audio.320af20.svg", title: "Music & Audio" },
              { img: "programming.9362366.svg", title: "Programming & Tech" },
              { img: "business.bbdf319.svg", title: "Business" },
              { img: "lifestyle.745b575.svg", title: "Lifestyle" },
              { img: "data.718910f.svg", title: "Data" },
              { img: "photography.01cf943.svg", title: "Photography" }
            ].map((item, index) => (
              <motion.div
                className="item"
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={`https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/${item.img}`}
                  alt=""
                />
                <div className="line"></div>
                <span>{item.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <motion.div
            className="item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Skillverse <i>business</i></h1>
            <h1>A business solution designed for <i>teams</i></h1>
            <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>

            {[
              "Connect to freelancers with proven business experience",
              "Get matched with the perfect talent by a customer success manager",
              "Manage teamwork and boost productivity with one powerful workspace"
            ].map((text, index) => (
              <div className="title" key={index}>
                <img src="./img/check.png" alt="" />
                {text}
              </div>
            ))}

            <Link to="/gigs">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Explore Skillverse Business
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            className="item"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container" style={{ paddingTop: "50px", marginBottom: "30px", textAlign: "center" }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}>Explore our Gigs</h1>
          <p style={{ color: "gray", fontSize: "18px" }}>Find the best services for your project</p>
        </div>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>Loading projects...</div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>Something went wrong!</div>
        ) : (
          <Slide slidesToShow={4}>
            {data?.map(project => (
              <ProjectCard key={project._id} item={project} />
            ))}
          </Slide>
        )}
      </motion.div>
      <Leaderboard />
    </motion.div>
  )
}

export default Home
