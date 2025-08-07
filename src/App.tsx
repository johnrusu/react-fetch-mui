import React, { useState } from "react";
import ContainerLayout from "./ContainerLayout";
import ButtonLayout from "./ButtonLayout";
import CircularProgress from "@mui/material/CircularProgress";

// const API_URL = "https://dog.ceo/api/breeds/image/random/20"; // Moved from constants.ts
import { API_URL } from "./constants"; // Importing from constants.ts
// utils.ts is not needed here as we are using the utility function directly in ContainerLayout
import { isArrayNotEmpty } from "./utils"; // Importing utility function

function App() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const resetData = () => {
    setData([]);
    setLoading(false);
  };

  const handleClick = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLoading(true);
      if (data) {
        setTimeout(() => {
          setData(data.message);
          setLoading(false);
        }, 1000); // Simulating a delay
      }
    } catch (error) {
      setLoading(false);
      console.error("Fetch error:", error);
    }
  };
  return (
    <div className="App relative">
      {loading && (
        <CircularProgress className="loading-indicator absolute z-20 right-1 bottom-1" />
      )}
      <div className="p-4 z-10 relative">
        <ButtonLayout
          handleClick={handleClick}
          resetData={resetData}
          loading={loading}
        />
        {isArrayNotEmpty(data) && (
          <ContainerLayout data={data} className="image-container" />
        )}
      </div>
    </div>
  );
}

export default App;
