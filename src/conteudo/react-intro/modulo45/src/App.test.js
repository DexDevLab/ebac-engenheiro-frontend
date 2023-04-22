import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders page", () => {
  render(<App />);
  const elmt = screen.getByText(/Olá!/i);
  expect(elmt).toBeInTheDocument();
});
