import React, { useState } from "react";

const UploadForm = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    imageURL: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(formData);
    setFormData({ name: "", category: "", imageURL: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Clothing name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <input
        placeholder="Image URL"
        value={formData.imageURL}
        onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
