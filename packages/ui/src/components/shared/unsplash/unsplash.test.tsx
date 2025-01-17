import { render } from "@testing-library/react";

import { Unsplash } from "./unsplash";

describe("<Unsplash />", () => {
  it("should render the default text", () => {
    const ui = render(<Unsplash apiKey="" />);
    expect(ui.getByPlaceholderText(/Search for an image/i)).toBeInTheDocument();
  });
});
