import React, { useState, useEffect } from "react";
import axios from "axios";

const CalendarMaster = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editableCalendar, setEditableCalendar] = useState(null);

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://divine-backend-db.onrender.com/api/calendars"
      );
      setCalendars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching calendars:", error);
      setLoading(false);
    }
  };

  const toggleCalendarStatus = async (id, isActive) => {
    try {
      await axios.patch(
        `https://divine-backend-db.onrender.com/api/calendars/${id}`,
        {
          status: !isActive,
        }
      );
      fetchCalendars();
    } catch (error) {
      console.error("Error updating calendar status:", error);
    }
  };

  const deleteCalendar = async (id) => {
    try {
      await axios.delete(
        `https://divine-backend-db.onrender.com/api/calendars/${id}`
      );
      fetchCalendars();
    } catch (error) {
      console.error("Error deleting calendar:", error);
    }
  };

  const openEditModal = (calendar) => {
    setEditableCalendar(calendar);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditableCalendar(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableCalendar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editableCalendar._id) {
      try {
        await axios.patch(
          `https://divine-backend-db.onrender.com/api/calendars/${editableCalendar._id}/update`,
          editableCalendar
        );
        fetchCalendars();
      } catch (error) {
        console.error("Error updating calendar:", error);
      }
    } else {
      try {
        await axios.post(
          "https://divine-backend-db.onrender.com/api/calendars",
          editableCalendar
        );
        fetchCalendars();
      } catch (error) {
        console.error("Error adding calendar:", error);
      }
    }
    handleCloseModal();
  };

  return (
    <div style={containerStyle}>
      <h1>Calendar Master</h1>
      <button
        style={buttonStyle(false)}
        onClick={() =>
          openEditModal({ originalName: "", calendarId: "", displayName: "" })
        }
      >
        Add New Calendar
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr>
              <th>Original Name</th>
              <th>ID</th>
              <th>Display Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {calendars.map((calendar) => (
              <tr key={calendar._id} style={rowStyle}>
                <td>{calendar.originalName}</td>
                <td>{calendar.calendarId}</td>
                <td>{calendar.displayName}</td>
                <td>
                  <button
                    style={buttonStyle(calendar.status)}
                    onClick={() =>
                      toggleCalendarStatus(calendar._id, calendar.status)
                    }
                  >
                    {calendar.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button
                    style={buttonStyle(false)}
                    onClick={() => openEditModal(calendar)}
                  >
                    Edit
                  </button>
                  <button
                    style={buttonStyle(false)}
                    onClick={() => deleteCalendar(calendar._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>
              {editableCalendar._id ? "Edit Calendar" : "Add New Calendar"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="originalName"
                placeholder="Enter Your Original Name"
                value={editableCalendar.originalName}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="calendarId"
                placeholder="Enter Your ID"
                value={editableCalendar.calendarId}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="displayName"
                placeholder="Enter Your Display Name"
                value={editableCalendar.displayName}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle(false)}>
                Save
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                style={buttonStyle(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
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
  backgroundColor: isActive ? "#4CAF50" : "#5471FD",
  color: "white",
  fontWeight: "bold",
  margin: "5px",
});

const inputStyle = {
  padding: "10px",
  margin: "5px 0",
  display: "block",
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "30px",
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalContentStyle = {
  backgroundColor: "#7FA6D7",
  padding: "30px",
  borderRadius: "10px",
  width: "50%",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

export default CalendarMaster;
