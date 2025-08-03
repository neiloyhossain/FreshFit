import React, { useState, useEffect } from "react";
import UploadForm from "../components/UploadForm";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import "./WardrobeUploadPage.css";

const WardrobeUploadPage = () => {
  const [error, setError] = useState("");

  // Upload new item to backend with user ID
  const handleUpload = (formData) => {
    setError("");
    
    if (!isAuthenticated()) {
      setError("Please log in to upload items");
      return;
    }

    const { userId } = getCurrentUser();
    console.log("WardrobeUploadPage: Uploading with user ID:", userId);
    formData.append('userId', userId);

    fetch("/api/wardrobe", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => { throw new Error(data.error || "Upload failed"); });
        return res.json();
      })
      .then((item) => {
        console.log("WardrobeUploadPage: Upload successful:", item);
        // Show success message or redirect
        alert("Item uploaded successfully!");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="wardrobe-bg">
      <div className="wardrobe-card">
        <h2 className="wardrobe-title">Upload Wardrobe</h2>
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <UploadForm onUpload={handleUpload} />
      </div>
    </div>
  );
};

export default WardrobeUploadPage;
