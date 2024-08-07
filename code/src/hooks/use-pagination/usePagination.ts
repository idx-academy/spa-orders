import { useSearchParams } from "react-router-dom";

import validatePage from "@/utils/validate-page/validatePage";

const PAGE_KEY = "page";

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromParams = searchParams.get(PAGE_KEY);
  const page = validatePage(pageFromParams);

  const setPage = (newPage: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (newPage !== null) {
      params.set(PAGE_KEY, newPage.toString());
    } else {
      params.delete(PAGE_KEY);
    }

    setSearchParams(params);
  };

  return {
    page,
    setPage
  } as const;
};

export default usePagination;
