import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders page", () => {
  render(<App username={""} />);
  const elmt = screen.getByText(/Olá/i);
  expect(elmt).toBeInTheDocument();
});
