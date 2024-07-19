import { screen } from "@testing-library/react";

import AppTable from "@/components/app-table/AppTable";
import { AppTableProps } from "@/components/app-table/AppTable.types";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

type TableItem = { id: number; value: string };

const headItems = ["Header 1", "Header 2"];
const bodyItems: TableItem[] = [
  { id: 1, value: "Row 1" },
  { id: 2, value: "Row 2" }
];

const renderHeadItem = (item: string) => <th key={item}>{item}</th>;
const renderBodyItem = (item: TableItem) => <td key={item.id}>{item.value}</td>;
const renderTable = (props: Partial<AppTableProps<TableItem>>) => {
  renderWithProviders(
    <AppTable
      headItems={headItems}
      bodyItems={[]}
      renderBodyItem={renderBodyItem}
      renderHeadItem={renderHeadItem}
      fallback={<div>Fallback Content</div>}
      {...props}
    />
  );
};

describe("AppTable", () => {
  describe("AppTable with body items", () => {
    beforeEach(() => {
      renderWithProviders(
        <AppTable
          headItems={headItems}
          bodyItems={bodyItems}
          renderBodyItem={renderBodyItem}
          renderHeadItem={renderHeadItem}
        />
      );
    });

    test("renders head items correctly", () => {
      headItems.forEach((item) => {
        const headItem = screen.getByText(item);
        expect(headItem).toBeInTheDocument();
      });
    });

    test("renders body items correctly", () => {
      bodyItems.forEach((item) => {
        const bodyItem = screen.getByText(item.value);
        expect(bodyItem).toBeInTheDocument();
      });
    });

    test("Does not render fallback if body items passed", () => {
      const fallbackContent = screen.queryByTestId("table-fallback");
      expect(fallbackContent).not.toBeInTheDocument();
    });
  });

  describe("AppTable without body items", () => {
    test("renders fallback correctly when bodyItems is empty", () => {
      renderTable({
        headItems: headItems,
        bodyItems: [],
        renderBodyItem: renderBodyItem,
        renderHeadItem: renderHeadItem,
        fallback: <div>Fallback Content</div>
      });

      const fallbackContent = screen.getByText("Fallback Content");
      expect(fallbackContent).toBeInTheDocument();
    });

    test("Should display nothing when there is no fallback and body items", () => {
      renderTable({ bodyItems: [], fallback: undefined });

      const fallbackContent = screen.queryByTestId("table-fallback");
      expect(fallbackContent).not.toBeInTheDocument();
    });
  });
});
