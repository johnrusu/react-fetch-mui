import React, { useState } from "react";
import "./App.css";
import ContainerLayout from "./ContainerLayout";
import ButtonLayout from "./ButtonLayout";

// const API_URL = "https://dog.ceo/api/breeds/image/random/20"; // Moved from constants.ts
import { API_URL } from "./constants"; // Importing from constants.ts
// utils.ts is not needed here as we are using the utility function directly in ContainerLayout
import { isArrayNotEmpty } from "./utils"; // Importing utility function

function App() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const resetData = () => {
    setData([]);
  };

  const handleClick = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {












                                                setLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data) {
        setData(data.message); // Update state with fetched data
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <div className="App">
      <ButtonLayout handleClick={handleClick} resetData={resetData} />
      {isArrayNotEmpty(data) && (
        <ContainerLayout data={data} className="image-container" />
      )}
      {/* Assuming data.message contains the array of images */}
    </div>
  );
}

export default App;
