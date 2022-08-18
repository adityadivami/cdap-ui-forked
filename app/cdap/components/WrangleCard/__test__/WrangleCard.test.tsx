import React from "react";
import { render, screen } from "@testing-library/react";
import WrangleCard from "../index";

test("renders lWrangler", () => {
  render(<WrangleCard />);
  const ele = screen.getByTestId(/wrangle-card-parent/i);
  expect(ele).toBeInTheDocument();
});
