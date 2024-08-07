import cn from "@/utils/cn/cn";

import "./ProductDescription.scss";

import AppBox from "../app-box/AppBox";
import AppTypography from "../app-typography/AppTypography";
import { ProductDescriptionProps } from "./ProductDescription.types";

const ProductDescription = ({
  description,
  className
}: ProductDescriptionProps) => {
  const paragraphs = description.split("/").map((paragraph, index) => (
    <AppTypography
      key={index}
      className={cn("product-description-item", className)}
    >
      {paragraph}
    </AppTypography>
  ));

  return <AppBox className="product-description">{paragraphs}</AppBox>;
};

export default ProductDescription;
