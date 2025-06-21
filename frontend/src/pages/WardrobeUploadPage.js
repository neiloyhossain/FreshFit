import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ClothingItemCard from "../components/ClothingItemCard";

const WardrobeUploadPage = () => {
  const [items, setItems] = useState([]);

  const handleUpload = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h2>Upload Wardrobe</h2>
      <UploadForm onUpload={handleUpload} />
      <div>
        {items.map((item, i) => (
          <ClothingItemCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WardrobeUploadPage;
