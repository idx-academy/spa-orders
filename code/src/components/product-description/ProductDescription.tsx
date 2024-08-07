import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import { ProductDescriptionProps } from "@/components/product-description/ProductDescription.types";

import cn from "@/utils/cn/cn";

import "@/components/product-description/ProductDescription.scss";

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
