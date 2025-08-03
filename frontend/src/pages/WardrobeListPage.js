import React, { useEffect, useState } from "react";
import ClothingItemCard from "../components/ClothingItemCard";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import "./WardrobeUploadPage.css"; // Reuse styles for card layout

const WardrobeListPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      setError("Please log in to view your wardrobe");
      return;
    }

    const { userId } = getCurrentUser();
    fetch(`/api/wardrobe?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch wardrobe items");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="wardrobe-bg">
      <div className="wardrobe-card">
        <h2 className="wardrobe-title">My Wardrobe Items</h2>
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <div>
          {items.length === 0 ? (
            <p>No wardrobe items found.</p>
          ) : (
            items.map((item, i) => <ClothingItemCard key={i} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default WardrobeListPage;
