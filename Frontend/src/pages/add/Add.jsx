import React, { useState } from "react";
import "./Add.scss";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [coverFile, setCoverFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [featureInput, setFeatureInput] = useState(""); // Separate state for input

  const navigate = useNavigate();

  const [gig, setGig] = useState({
    title: "",
    cat: "design",
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 1,
    revisionNumber: 1,
    features: [], // Start empty
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGig((prev) => ({
      ...prev,
      [name]: name === "price" || name === "deliveryTime" || name === "revisionNumber" ? parseInt(value) : value,
    }));
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (featureInput.trim()) {
      setGig((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setGig((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validation
      if (!gig.title || !gig.title.trim()) {
        setError("Gig title is required");
        setLoading(false);
        return;
      }

      if (!gig.desc || !gig.desc.trim()) {
        setError("Description is required");
        setLoading(false);
        return;
      }

      if (!gig.shortTitle || !gig.shortTitle.trim()) {
        setError("Service title is required");
        setLoading(false);
        return;
      }

      if (!gig.shortDesc || !gig.shortDesc.trim()) {
        setError("Short description is required");
        setLoading(false);
        return;
      }

      if (!coverFile) {
        setError("Cover image is required");
        setLoading(false);
        return;
      }

      // Upload cover image
      let coverUrl = "";
      if (coverFile) {
        coverUrl = await upload(coverFile);
      }

      // Upload additional images
      let imageUrls = [];
      if (imageFiles.length > 0) {
        imageUrls = await Promise.all(
          Array.from(imageFiles).map((file) => upload(file))
        );
      }

      // Create gig object
      const gigData = {
        title: gig.title.trim(),
        cat: gig.cat,
        desc: gig.desc.trim(),
        shortTitle: gig.shortTitle.trim(),
        shortDesc: gig.shortDesc.trim(),
        deliveryTime: gig.deliveryTime,
        revisionNumber: gig.revisionNumber,
        features: gig.features,
        price: gig.price,
        cover: coverUrl,
        images: imageUrls,
      };

      // Send to backend
      await newRequest.post("/api/gigs", gigData);
      navigate("/myGigs");
    } catch (err) {
      console.error("Error creating gig:", err);
      setError(err.response?.data?.message || "Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="sections">
            <div className="left">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. I will do something I'm really good at"
                value={gig.title}
                onChange={handleChange}
                required
              />

              <label>Category</label>
              <select name="cat" value={gig.cat} onChange={handleChange}>
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>

              <label>Cover Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="coverInput"
                  onChange={(e) => setCoverFile(e.target.files[0])}
                  accept="image/*"
                  required
                />
                <label htmlFor="coverInput" className="file-label">
                  Choose File
                </label>
                <span className="file-name">
                  {coverFile ? coverFile.name : "No file chosen"}
                </span>
              </div>

              <label>Upload Gallery Images</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="imagesInput"
                  multiple
                  onChange={(e) => setImageFiles(e.target.files)}
                  accept="image/*"
                />
                <label htmlFor="imagesInput" className="file-label">
                  Choose Files
                </label>
                <span className="file-name">
                  {imageFiles.length > 0 ? `${imageFiles.length} files chosen` : "No files chosen"}
                </span>
              </div>

              <label>Description</label>
              <textarea
                name="desc"
                placeholder="Brief descriptions to introduce your service to customers"
                value={gig.desc}
                onChange={handleChange}
                cols="0"
                rows="10"
                required
              ></textarea>
            </div>

            <div className="right">
              <label>Service Title</label>
              <input
                type="text"
                name="shortTitle"
                placeholder="e.g. One-page web design"
                value={gig.shortTitle}
                onChange={handleChange}
                required
              />

              <label>Short Description</label>
              <textarea
                name="shortDesc"
                placeholder="Short description of your service"
                value={gig.shortDesc}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>

              <label>Delivery Time (e.g. 3 days)</label>
              <input
                type="number"
                name="deliveryTime"
                value={gig.deliveryTime}
                onChange={handleChange}
                min="1"
                required
              />

              <label>Revision Number</label>
              <input
                type="number"
                name="revisionNumber"
                value={gig.revisionNumber}
                onChange={handleChange}
                min="1"
                required
              />

              <label>Add Features</label>
              <div className="features-input">
                <input
                  type="text"
                  placeholder="e.g. Responsive design"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent form submission
                      handleAddFeature(e);
                    }
                  }}
                />
                <button
                  type="button"
                  className="add-feature-btn"
                  onClick={handleAddFeature}
                >
                  ADD
                </button>
              </div>

              <div className="added-features">
                {gig.features.map((feature, index) => (
                  <div key={index} className="feature-tag">
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      {feature}
                      <span>×</span>
                    </button>
                  </div>
                ))}
              </div>

              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={gig.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Creating Gig..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;