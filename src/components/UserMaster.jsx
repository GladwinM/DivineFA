import React, { useState, useEffect } from "react";
import axios from "axios";

const UserMaster = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://divine-backend-db.onrender.com/api/users"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const toggleUserStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, status: !user.status } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div style={containerStyle}>
      <h1>User Master</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr>
              <th>Name</th>
              <th>Country Code</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={rowStyle}>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {user.name}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {user.countryCode}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {user.mobileNumber}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {user.email}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {user.gender}
                </td>
                <td>
                  <button
                    onClick={() => toggleUserStatus(user._id)}
                    style={buttonStyle(user.status)}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#CBEBF7",
  borderRadius: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 15px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const headerStyle = {
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
  padding: "12px",
};

const rowStyle = {
  borderBottom: "1px solid #ccc",
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  padding: "10px",
};

const buttonStyle = (isActive) => ({
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: isActive ? "#4CAF50" : "#f44336",
  color: "white",
  fontWeight: "bold",
  margin: "15px",
});

export default UserMaster;
