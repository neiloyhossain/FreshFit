import React from "react";
import "./components.css";

const ClothingItemCard = ({ item }) => (
  <div className="clothing-item-card">
    <img className="clothing-item-image" src={item.imageURL} alt={item.name} />
    <div className="clothing-item-details">
      <p>
        <strong>{item.name}</strong>
      </p>
      <p>{item.category}</p>
    </div>
  </div>
);

export default ClothingItemCard;
