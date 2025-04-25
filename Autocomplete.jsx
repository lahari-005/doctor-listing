import React, { useState } from "react";

const Autocomplete = ({ doctors, searchTerm, setSearchTerm, onSelectSuggestion }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = doctors
    .filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  const handleSelect = (name) => {
    setSearchTerm(name);
    onSelectSuggestion(name);
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder="Search doctor name..."
        data-testid="autocomplete-input"
        style={{ padding: "8px", width: "250px" }}
      />
      {showSuggestions && searchTerm && (
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          position: "absolute",
          background: "#fff",
          border: "1px solid #ccc",
          width: "250px",
          zIndex: 10
        }}>
          {suggestions.map((doc, index) => (
            <li
              key={index}
              onClick={() => handleSelect(doc.name)}
              data-testid="suggestion-item"
              style={{ padding: "8px", cursor: "pointer", background: "#f9f9f9" }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
