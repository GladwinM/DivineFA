import React, { useState, useEffect } from "react";
import axios from "axios";
import { getFileUrlFromS3, uploadFileToS3 } from "../util/awsService";

const BannerMaster = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Hero");
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [newBannerName, setNewBannerName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBanners(type);
  }, [type]);

  const fetchBanners = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://divine-backend-db.onrender.com/api/banners`
      );
      const filteredBanners = response.data.filter(
        (banner) => banner.type === type
      );
      setBanners(filteredBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleAddBanner = async () => {
    if (!newBannerFile || !newBannerName) {
      alert("Please provide a name and select a file for the banner.");
      return;
    }

    const bannerUrl = await uploadFileToS3(newBannerFile, "banners");
    const formData = {
      name: newBannerName,
      image: bannerUrl,
      type: type,
    };

    try {
      await axios.post(
        `https://divine-backend-db.onrender.com/api/banners`,
        formData
      );
      setBanners([...banners, { ...formData, image: bannerUrl }]);
      setNewBannerFile(null);
      setNewBannerName("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await axios.delete(`https://divine-backend-db.onrender.com/api/banners/${id}`);
      setBanners(banners.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Banner Master - {type}</h1>
      <div style={buttonContainerStyle}>
        <button
          onClick={() => handleTypeChange("Hero")}
          style={buttonStyles(type === "Hero")}
        >
          Hero
        </button>
        <button
          onClick={() => handleTypeChange("Features")}
          style={buttonStyles(type === "Features")}
        >
          Features
        </button>
        <button onClick={() => setShowModal(true)} style={buttonStyles()}>
          Add Banner
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={galleryStyle}>
          {banners.map((banner) => (
            <div key={banner._id} style={bannerStyle}>
              <div style={deleteButtonContainer}>
                <button
                  onClick={() => handleDeleteBanner(banner._id)}
                  style={deleteButtonStyle}
                >
                    X
                </button>
              </div>
              <img
                src={getFileUrlFromS3(banner.image)}
                alt="Banner"
                style={imageStyle}
              />
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Add a New Banner</h2>
            <input
              type="text"
              placeholder="Enter banner name"
              value={newBannerName}
              onChange={(e) => setNewBannerName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="file"
              onChange={(e) => setNewBannerFile(e.target.files[0])}
              style={inputStyle}
            />
            <button onClick={handleAddBanner} style={buttonStyles()}>
              Submit
            </button>
            <button onClick={() => setShowModal(false)} style={buttonStyles()}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the components

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#CBEBF7",
  borderRadius: "10px",
};

const buttonContainerStyle = {
  marginBottom: "20px",
  display: "flex",
  justifyContent: "flex-start",
  gap: "10px",
};

const galleryStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "10px",
};

const bannerStyle = {
  position: "relative",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const imageStyle = {
  width: "200px",
  height: "200px",
  objectFit: "cover",
  borderRadius: "5px",
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "50%",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyles = (isActive = true) => ({
  backgroundColor: isActive ? "#5471FD" : "#ccc",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
});
const deleteButtonContainer = {
  position: "absolute",
  top: "0",
  right: "0",
  padding: "10px",
};

const deleteButtonStyle = {
  backgroundColor: "#ff0000",
  color: "#fff",
  border: "none",
  fontSize: "22px",
  cursor: "pointer",
  borderRadius: "5px",
};
export default BannerMaster;
