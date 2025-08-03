import React, { useState } from "react";
import "./components.css";

const UploadForm = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("image", formData.image);
    // Add uploadedBy from localStorage
    const username = localStorage.getItem("username");
    if (username) {
      data.append("uploadedBy", username);
    }

    // Pass the FormData to the parent component
    onUpload(data);

    setFormData({ name: "", category: "", image: null });
    e.target.reset();
  };

  return (
    <form
      className="upload-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <input
        name="name"
        placeholder="Clothing name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select category (required)</option>
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
      </select>
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
