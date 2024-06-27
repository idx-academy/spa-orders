import Pagination, {
  PaginationProps,
  PaginationRenderItemParams
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useSearchParams } from "react-router-dom";

import AppLink from "@/components/app-link/AppLink";

export type AppPaginationProps = PaginationProps;

const AppPagination = (props: AppPaginationProps) => {
  const [searchParams] = useSearchParams();

  const renderPaginationItem = (itemProps: PaginationRenderItemParams) => {
    searchParams.set("page", String(itemProps.page));

    const itemSearchParamsString = searchParams.toString();

    return (
      <PaginationItem
        component={AppLink}
        to={{ search: itemSearchParamsString }}
        {...itemProps}
      />
    );
  };

  return <Pagination renderItem={renderPaginationItem} {...props} />;
};

export default AppPagination;
