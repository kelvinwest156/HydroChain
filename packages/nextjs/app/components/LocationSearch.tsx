import React, { useState } from "react";

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue) {
      onLocationSelect(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter a country or town"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default LocationSearch;
