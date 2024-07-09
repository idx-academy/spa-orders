import { render, screen } from "@testing-library/react";

import AppTableBox from "@/components/app-table/components/app-table-box/AppTableBox";

describe("AppTableBox", () => {
  test("renders with children", () => {
    render(
      <AppTableBox>
        <tbody>
          <tr>
            <td>Test</td>
          </tr>
        </tbody>
      </AppTableBox>
    );

    const child = screen.getByText(/Test/);
    expect(child).toBeInTheDocument();
  });
});
