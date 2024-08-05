export const checkUserDetailsInLocalStorage = (
  localStorageValue: string | null,
  role: string
): void => {
  const userDetails = localStorageValue ? JSON.parse(localStorageValue) : null;

  expect(userDetails).to.not.be.null;
  expect(userDetails.token).to.exist;
  expect(userDetails.role).to.eq(role);
};
