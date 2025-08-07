import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const FETCH_BUTTON_TEXT = /fetch data/i;
  render(<App />);
  const buttonElement = screen.getByText(FETCH_BUTTON_TEXT);
  expect(buttonElement).toBeInTheDocument();
});
