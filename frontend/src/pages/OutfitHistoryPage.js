import React, { useEffect, useState } from "react";
import "./OutfitHistoryPage.css";
import OutfitDisplay from "../components/OutfitDisplay";
import { getCurrentUser, isAuthenticated } from "../utils/auth";

const OutfitHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("OutfitHistoryPage: Checking authentication...");
    if (!isAuthenticated()) {
      console.log("OutfitHistoryPage: User not authenticated");
      setError("Please log in to view your outfit history");
      return;
    }

    const { userId } = getCurrentUser();
    console.log("OutfitHistoryPage: Current user ID:", userId);
    console.log("OutfitHistoryPage: Making API call to:", `/api/outfits?userId=${userId}`);
    
    fetch(`/api/outfits?userId=${userId}`)
      .then((res) => {
        console.log("OutfitHistoryPage: API response status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch outfit history");
        return res.json();
      })
      .then((data) => {
        console.log("OutfitHistoryPage: Received data:", data);
        setHistory(data);
      })
      .catch((err) => {
        console.error("OutfitHistoryPage: Error:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="outhist-bg">
      <div className="outhist-card">
        <h2 className="outhist-title">Outfit History</h2>
        {error && <div style={{color: 'red'}}>{error}</div>}
        {history.length === 0 ? (
          <p>No outfits generated yet.</p>
        ) : (
          history.map((outfit, i) => (
            <OutfitDisplay key={i} outfit={outfit.items || []} />
          ))
        )}
      </div>
    </div>
  );
};

export default OutfitHistoryPage;
