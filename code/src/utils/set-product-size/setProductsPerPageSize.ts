import { BREAKPOINTS } from "@/constants/breakpoints";

const setProductsPerPageSize = (screenWidth: number) => {
  switch (true) {
    case screenWidth >= BREAKPOINTS.xl:
      return 10;
    case screenWidth >= BREAKPOINTS.l:
      return 12;
    case screenWidth >= BREAKPOINTS.m:
      return 9;
    default:
      return 10;
  }
};

export default setProductsPerPageSize;
