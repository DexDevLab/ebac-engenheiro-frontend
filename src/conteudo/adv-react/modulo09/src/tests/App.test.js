import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders page", () => {
  render(<App />);
  const elmt = screen.getByText(/EBAC/i);
  expect(elmt).toBeInTheDocument();
});
