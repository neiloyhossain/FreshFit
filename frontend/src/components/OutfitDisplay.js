import React from "react";

const OutfitDisplay = ({ outfit }) => (
  <div className="outfit">
    <h3>Outfit Suggestion</h3>
    {outfit.map((item, index) => (
      <div key={index}>
        <img src={item.imageURL} alt={item.name} />
        <p>
          {item.name} - {item.category}
        </p>
      </div>
    ))}
  </div>
);

export default OutfitDisplay;
