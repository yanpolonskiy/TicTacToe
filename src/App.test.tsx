import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  const { getByTestId } = render(<App />);
  const linkElement = getByTestId('board');
  expect(linkElement).toBeInTheDocument();
});
