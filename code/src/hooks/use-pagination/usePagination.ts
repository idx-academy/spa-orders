import { useSearchParams } from "react-router-dom";

import validatePage from "@/utils/validate-page/validatePage";

const PAGE_KEY = "page";

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromParams = searchParams.get(PAGE_KEY);
  const page = validatePage(pageFromParams);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_KEY, newPage.toString());
    setSearchParams(params);
  };

  return {
    page,
    setPage
  } as const;
};

export default usePagination;
