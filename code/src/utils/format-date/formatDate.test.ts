import formatDate from "@/utils/format-date/formatDate";

const backendDate = "2024-06-27T12:35:14.396Z";

describe("formatDate", () => {
  test("formats date to default locale and options", () => {
    const formattedDate = formatDate(backendDate);
    expect(formattedDate).toBe("27/06/2024, 15:35:14");
  });

  test("formats date with custom locale", () => {
    const formattedDate = formatDate(backendDate, { locale: "en-US" });
    expect(formattedDate).toBe("06/27/2024, 15:35:14");
  });

  test("formats date with custom options", () => {
    const formattedDate = formatDate(backendDate, {
      options: { weekday: "long" }
    });
    expect(formattedDate).toBe("Thursday, 27/06/2024, 15:35:14");
  });

  test("accepts Date object directly", () => {
    const formattedDate = formatDate(new Date("2024-06-27T12:35:14.396Z"));
    expect(formattedDate).toBe("27/06/2024, 15:35:14");
  });

  test("accepts Date object directly", () => {
    const formattedDate = formatDate("hello");
    expect(formattedDate).toBe("Invalid date");
  });
});
