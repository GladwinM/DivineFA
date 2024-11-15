import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateManager = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch current updates from the server
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://divine-backend-db.onrender.com/api/updates"
        );
        const data = response.data[0]; // assuming the first item contains the info
        if (data) {
          setYoutubeLink(data.youtubeLink || "");
          setPhoneNumber(data.phoneNumber || "");
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to update YouTube link
  const updateYouTubeLink = async () => {
    try {
      await axios.post(
        "https://divine-backend-db.onrender.com/api/updates/youtubeLink",
        {
          youtubeLink,
        }
      );
      alert("YouTube link updated!");
    } catch (err) {
      alert("Failed to update YouTube link");
    }
  };

  // Function to update Phone Number
  const updatePhoneNumber = async () => {
    try {
      await axios.post(
        "https://divine-backend-db.onrender.com/api/updates/phone",
        {
          phoneNumber,
        }
      );
      alert("Phone number updated!");
    } catch (err) {
      alert("Failed to update phone number");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2>Manage Updates</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>YouTube Link:</label>
        <input
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          style={styles.input}
        />
        <button onClick={updateYouTubeLink} style={styles.button}>
          Update YouTube Link
        </button>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
        />
        <button onClick={updatePhoneNumber} style={styles.button}>
          Update Phone Number
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#7FA6D7",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "calc(100% - 22px)",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdateManager;
