import React from "react";

const ClothingItemCard = ({ item }) => (
  <div className="card">
    <img src={item.imageURL} alt={item.name} />
    <p>{item.name}</p>
    <p>{item.category}</p>
  </div>
);

export default ClothingItemCard;
