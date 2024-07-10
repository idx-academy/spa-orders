const assertErrorThrow = (
  functionThatThrows: () => void,
  expectedErrorMessage: string
) => {
  // required, because otherwise test fails
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  try {
    expect(functionThatThrows).toThrow(expectedErrorMessage);
  } finally {
    spy.mockRestore();
  }
};

export default assertErrorThrow;
