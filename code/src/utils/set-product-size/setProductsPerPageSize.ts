import { BREAKPOINTS } from "@/constants/breakpoints";

const setProductsPerPageSize = (screenWidth: number) => {
  if (screenWidth >= BREAKPOINTS.xl) {
    return 10;
  } else if (screenWidth >= BREAKPOINTS.l) {
    return 12;
  } else if (screenWidth >= BREAKPOINTS.m) {
    return 9;
  } else {
    return 10;
  }
};

export default setProductsPerPageSize;
