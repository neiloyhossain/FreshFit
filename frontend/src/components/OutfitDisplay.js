import React from "react";
import "./components.css";

const OutfitDisplay = ({ outfit }) => {
  // Ensure outfit is an array and has valid items
  if (!outfit || !Array.isArray(outfit) || outfit.length === 0) {
    return (
      <div className="outfit-display">
        <h3 className="outfit-display-title">Outfit Suggestion</h3>
        <p>No outfit items available.</p>
      </div>
    );
  }

  return (
    <div className="outfit-display">
      <h3 className="outfit-display-title">Outfit Suggestion</h3>
      {outfit.map((item, index) => {
        // Check if item exists and has required properties
        if (!item || !item.imageURL || !item.name) {
          return (
            <div key={index} className="clothing-item-card">
              <p>Invalid item data</p>
            </div>
          );
        }
        
        return (
          <div key={index} className="clothing-item-card">
            <img
              className="clothing-item-image"
              src={item.imageURL}
              alt={item.name}
            />
            <div className="clothing-item-details">
              <p><strong>{item.name}</strong> - {item.category}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OutfitDisplay;
