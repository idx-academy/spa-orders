const validateNumberQueryParam = (value, defaultValue = 0) => {
  return !isNaN(value) && Number(value) >= 0 ? Number(value) : defaultValue;
};

const parsePageable = (req, size = 8) => {
  const page = validateNumberQueryParam(req.query.page);
  const validatedSize = validateNumberQueryParam(req.query.size, size);

  const skip = page * validatedSize;
  const limit = (page + 1) * validatedSize;

  return { skip, limit, size: validatedSize };
};

module.exports = { parsePageable };
