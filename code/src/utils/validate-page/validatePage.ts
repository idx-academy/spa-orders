const validatePage = (value: unknown) => {
  return !isNaN(Number(value)) && Number(value) > 0 ? Number(value) : 1;
};

export default validatePage;
