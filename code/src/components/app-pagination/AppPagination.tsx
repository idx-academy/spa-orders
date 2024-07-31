import { useSearchParams } from "react-router-dom";

import Pagination, {
  PaginationRenderItemParams
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import AppLink from "@/components/app-link/AppLink";
import { AppPaginationProps } from "@/components/app-pagination/AppPagination.types";

const AppPagination = (props: AppPaginationProps) => {
  const [searchParams] = useSearchParams();

  const renderPaginationItem = (itemProps: PaginationRenderItemParams) => {
    searchParams.set("page", String(itemProps.page));

    const itemSearchParamsString = searchParams.toString();

    return (
      <PaginationItem
        component={AppLink}
        to={{ search: itemSearchParamsString }}
        data-cy="pagination"
        data-testid="pagination-button"
        {...itemProps}
      />
    );
  };

  return <Pagination renderItem={renderPaginationItem} {...props} />;
};

export default AppPagination;
