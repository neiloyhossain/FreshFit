import React, { useState, useEffect } from "react";
import "./OutfitGeneratorPage.css";
import OutfitDisplay from "../components/OutfitDisplay";
import { getCurrentUser, isAuthenticated } from "../utils/auth";

const OutfitGeneratorPage = () => {
  const [wardrobe, setWardrobe] = useState([]);
  const [history, setHistory] = useState([]);
  const [outfit, setOutfit] = useState(null);
  const [error, setError] = useState("");

  // Fetch wardrobe and history from backend for current user
  useEffect(() => {
    if (!isAuthenticated()) {
      setError("Please log in to use the outfit generator");
      return;
    }

    const { userId } = getCurrentUser();
    console.log("OutfitGenerator: Fetching data for userId:", userId);

    fetch(`/api/wardrobe?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch wardrobe");
        return res.json();
      })
      .then((data) => {
        console.log("OutfitGenerator: Fetched wardrobe data:", data);
        console.log("OutfitGenerator: Wardrobe items with categories:", data.map(item => ({ name: item.name, category: item.category, id: item._id })));
        setWardrobe(data);
      })
      .catch((err) => {
        console.error("OutfitGenerator: Error fetching wardrobe:", err);
        setError(err.message);
      });

    fetch(`/api/outfits?userId=${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch outfit history");
        return res.json();
      })
      .then((data) => {
        console.log("OutfitGenerator: Fetched outfit history:", data);
        setHistory(data);
      })
      .catch((err) => {
        console.error("OutfitGenerator: Error fetching outfit history:", err);
        setError(err.message);
      });
  }, []);

  // Generate a new outfit with required Top and Bottom
  const generateOutfit = () => {
    setError("");
    
    if (!isAuthenticated()) {
      setError("Please log in to generate outfits");
      return;
    }

    console.log("OutfitGenerator: Current wardrobe:", wardrobe);
    console.log("OutfitGenerator: Current history:", history);

    const tops = wardrobe.filter((item) => item && item.category === "Top");
    const bottoms = wardrobe.filter((item) => item && item.category === "Bottom");

    console.log("OutfitGenerator: Tops found:", tops);
    console.log("OutfitGenerator: Bottoms found:", bottoms);
    console.log("OutfitGenerator: Top IDs:", tops.map(t => t._id.toString()));
    console.log("OutfitGenerator: Bottom IDs:", bottoms.map(b => b._id.toString()));

    if (tops.length === 0 || bottoms.length === 0) {
      setOutfit(null);
      setError("You need at least one Top and one Bottom to generate an outfit.");
      return;
    }

    // Generate all possible unique combinations
    const allCombos = [];
    for (let top of tops) {
      for (let bottom of bottoms) {
        if (top && top._id && bottom && bottom._id) {
          // Convert ObjectIds to strings for comparison
          const topId = top._id.toString();
          const bottomId = bottom._id.toString();
          // Don't sort - keep top first, bottom second
          allCombos.push(`${topId},${bottomId}`);
        }
      }
    }

    console.log("OutfitGenerator: All possible combinations:", allCombos);

    // Get all previously generated combos from history
    const generatedCombos = history.map(h => {
      if (!h.items || !Array.isArray(h.items)) return "";
      // Keep the order as stored in the database (top first, bottom second)
      return h.items.map(item => (item._id || item).toString()).join(",");
    }).filter(combo => combo !== "");

    console.log("OutfitGenerator: Previously generated combinations:", generatedCombos);

    // Find combos that haven't been generated yet
    const remainingCombos = allCombos.filter(combo => !generatedCombos.includes(combo));

    console.log("OutfitGenerator: Remaining combinations:", remainingCombos);

    if (remainingCombos.length === 0) {
      setError("All possible unique outfits have been generated!");
      setOutfit(null);
      return;
    }

    // Pick a random remaining combo
    const randomCombo = remainingCombos[Math.floor(Math.random() * remainingCombos.length)];
    const [id1, id2] = randomCombo.split(",");
    
    console.log("OutfitGenerator: Selected combo - id1:", id1, "id2:", id2);
    
    // Find the items by ID, regardless of order
    const top = tops.find(item => {
      const itemId = item && item._id ? item._id.toString() : null;
      console.log("OutfitGenerator: Checking top item:", item.name, "with ID:", itemId, "against:", id1, "and", id2);
      return item && item._id && (itemId === id1 || itemId === id2);
    });
    const bottom = bottoms.find(item => {
      const itemId = item && item._id ? item._id.toString() : null;
      console.log("OutfitGenerator: Checking bottom item:", item.name, "with ID:", itemId, "against:", id1, "and", id2);
      return item && item._id && (itemId === id1 || itemId === id2);
    });
    
    console.log("OutfitGenerator: Found top item:", top);
    console.log("OutfitGenerator: Found bottom item:", bottom);
    
    if (!top || !bottom) {
      setError("Error generating outfit: Could not find matching items.");
      setOutfit(null);
      return;
    }
    
    const newOutfit = [top, bottom];

    setOutfit(newOutfit);

    // Save to backend and update history with user ID
    const itemIds = newOutfit.map((item) => {
      if (item && item._id) {
        return item._id.toString(); // Convert ObjectId to string
      }
      return null;
    }).filter(id => id !== null);
    
    if (itemIds.length !== newOutfit.length) {
      setError("Error saving outfit: Invalid item IDs.");
      return;
    }

    const { userId } = getCurrentUser();
    
    fetch("/api/outfits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: itemIds,
        userId: userId 
      }),
    })
      .then((res) =>
        res.json().then((data) => {
          if (!res.ok) throw new Error(data.error || "Failed to save outfit");
          setHistory((prev) => [...prev, data]);
        })
      )
      .catch((err) => setError(err.message));
  };

  return (
    <div className="outfitgen-bg">
      <div className="outfitgen-card">
        <h2 className="outfitgen-title">Outfit Generator</h2>
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <button onClick={generateOutfit}>Generate Outfit</button>
        {outfit && <OutfitDisplay outfit={outfit} />}
        {!outfit && !error && <p>Click "Generate Outfit" to get started!</p>}
      </div>
    </div>
  );
};

export default OutfitGeneratorPage;
