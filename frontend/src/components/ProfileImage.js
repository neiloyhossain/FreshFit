import React from 'react';
import DefaultAvatar from './DefaultAvatar';
import './ProfileImage.css';

const ProfileImage = ({ 
  src, 
  alt = "Profile", 
  size = 120, 
  className = '',
  showUploadOverlay = false,
  onImageUpload = null 
}) => {
  const handleImageClick = () => {
    if (showUploadOverlay && onImageUpload) {
      document.getElementById('profile-image-upload').click();
    }
  };

  return (
    <div 
      className={`profile-image-wrapper ${className}`}
      onClick={handleImageClick}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="profile-image"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ) : (
        <DefaultAvatar size={size} />
      )}
      
      {showUploadOverlay && onImageUpload && (
        <div className="image-upload-overlay">
          <label htmlFor="profile-image-upload" className="upload-label">
            <i className="fas fa-camera"></i>
          </label>
          <input
            type="file"
            id="profile-image-upload"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImage; 