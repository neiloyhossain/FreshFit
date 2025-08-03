import React, { useEffect, useState } from "react";
import ProfileImage from "../components/ProfileImage";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [profileData, setProfileData] = useState({
    fullName: "",
    bio: "",
    email: "",
    location: "",
    website: ""
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
      loadProfileData(storedUserId);
    }
  }, []);

  const loadProfileData = async (userId) => {
    try {
      const response = await fetch(`/api/auth/profile/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setProfileData({
          fullName: data.fullName || "",
          bio: data.bio || "",
          email: data.email || "",
          location: data.location || "",
          website: data.website || ""
        });
        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
      } else {
        console.error("Failed to load profile:", data.error);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/auth/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...profileData,
          profileImage: profileImage
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        setShowEditModal(false);
        // Reload profile data to ensure consistency
        await loadProfileData(userId);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="profile-image-section">
          <ProfileImage
            src={profileImage}
            size={120}
            className="large"
            showUploadOverlay={true}
            onImageUpload={handleImageUpload}
          />
        </div>
        <h2 className="profile-title">Your Profile</h2>
        <p>Welcome, {username ? username : "Guest"}!</p>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        
        <div className="profile-info">
          <p><strong>Name:</strong> {profileData.fullName || "Not set"}</p>
          <p><strong>Bio:</strong> {profileData.bio || "No bio yet"}</p>
          <p><strong>Email:</strong> {profileData.email || "Not set"}</p>
          <p><strong>Location:</strong> {profileData.location || "Not set"}</p>
          <p><strong>Website:</strong> {profileData.website || "Not set"}</p>
        </div>

        <button className="edit-profile-btn" onClick={handleEditProfile}>
          <i className="fas fa-edit"></i>
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="close-btn" onClick={handleCancelEdit}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  placeholder="Enter your website URL"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancelEdit} disabled={isLoading}>
                Cancel
              </button>
              <button className="btn-save" onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
