import { useState } from "react";
import ContainerLayout from "./ContainerLayout";
import ButtonLayout from "./ButtonLayout";
import Container from "@mui/material/Container";

// const API_URL = "https://dog.ceo/api/breeds/image/random/20"; // Moved from constants.ts
import { API_URL } from "./constants"; // Importing from constants.ts
// utils.ts is not needed here as we are using the utility function directly in ContainerLayout
import { isArrayNotEmpty } from "./utils"; // Importing utility function

// Importing button texts from constants.ts
import { BUTTON_TEXTS } from "./constants"; // Importing button texts from constants.ts

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
      <h1 className="text-2xl font-bold text-center my-4">
        {BUTTON_TEXTS.TITLE}
      </h1>
      <Container>
        <ButtonLayout
          handleClick={handleClick}
          resetData={resetData}
          loading={loading}
        />
        {isArrayNotEmpty(data) && (
          <div className="mt-6">
            <h6 className="text-lg font-semibold text-left">
              {BUTTON_TEXTS.RESULTS}
            </h6>
            <ContainerLayout data={data} className="image-container mt-2" />
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
