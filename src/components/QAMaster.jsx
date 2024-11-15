import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const QAMaster = () => {
  const onDrop = useCallback((acceptedFiles) => {
    const url =
      "https://divine-backend-db.onrender.com/api/qas/upload-excel";
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    console.log("Uploading file...", url, formData);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => alert("File successfully uploaded"))
      .catch((err) => alert("Error uploading file: " + err.message));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyle(isDragActive)}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={dragActiveStyle}>Drop the file here ...</p>
      ) : (
        <button style={buttonStyle}>Upload Excel</button>
      )}
    </div>
  );
};

const dropzoneStyle = (isDragActive) => ({
  padding: "200px 0 200px 0",
  border: `2px dashed ${isDragActive ? "#4CAF50" : "#ccc"}`,
  backgroundColor: isDragActive ? "#e7f5e9" : "#CBEBF7",
  borderRadius: "5px",
  textAlign: "center",
  color: isDragActive ? "#4CAF50" : "#333",
  transition: "background-color 0.3s, border-color 0.3s",
});

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

const dragActiveStyle = {
  fontWeight: "bold",
  color: "#4CAF50",
};

export default QAMaster;
