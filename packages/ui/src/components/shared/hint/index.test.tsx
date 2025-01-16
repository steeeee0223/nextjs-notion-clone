import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Hint, HintProvider } from ".";

const description = "Shows some messages";

describe("<Hint />", () => {
  it("should render the default text", () => {
    const { getByText } = render(
      <HintProvider>
        <Hint description={description}>
          <div>Hover</div>
        </Hint>
      </HintProvider>,
    );
    expect(getByText("Hover")).toBeDefined();
  });

  it("should render description on hover", async () => {
    const user = userEvent.setup();
    const hint = render(
      <HintProvider>
        <Hint description={description}>
          <div role="button">Hover</div>
        </Hint>
      </HintProvider>,
    );
    const button = screen.getByRole("button", { name: "Hover" });
    await act(() => user.hover(button));
    const tooltip = await hint.findByRole("tooltip");
    expect(tooltip).toHaveTextContent(description);
  });
});
