const createQueryParamsString = (query: Record<string, string>) => {
  const queryParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  return queryParams.toString();
};

const createUrlPath = (URL: string, params = "", query = {}) => {
  let trimmedUrl = URL;
  while (trimmedUrl.endsWith("/")) {
    trimmedUrl = trimmedUrl.slice(0, -1);
  }

  const queryParams = createQueryParamsString(query);
  const queryParamsString = queryParams ? `?${queryParams}` : "";
  const paramsString = params ? `/${params.replace(/^\/+/g, "")}` : "";

  return `${trimmedUrl}${paramsString}${queryParamsString}`;
};

export default createUrlPath;
