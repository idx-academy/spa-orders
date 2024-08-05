import { useIntl } from "react-intl";

import AppBadge from "@/components/app-badge/AppBadge";
import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { deliveryMethods as deliveryMethodsData } from "@/constants/deliveryMethods";
import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { ProductDetailsPageParams } from "@/pages/product-details/ProductDetails.types";
import { productNotFoundRedirectConfig } from "@/pages/product-details/ProductsDetailsPage.constants";
import BuyNowButton from "@/pages/product-details/components/buy-now-button/BuyNowButton";
import { useGetUserProductByIdQuery } from "@/store/api/productsApi";
import formatPrice from "@/utils/format-price/formatPrice";
import getCategoryFromTags from "@/utils/get-category-from-tags/getCategoryFromTags";
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";

import "@/pages/product-details/components/product-details-container/ProductDetailsContainer.scss";

type ProductDetailsContainerProps = ProductDetailsPageParams;

const ProductDetailsContainer = ({
  productId
}: ProductDetailsContainerProps) => {
  const { renderRedirectComponent } = useErrorPageRedirect();
  const { locale } = useLocaleContext();
  const { formatMessage } = useIntl();
  const {
    data: product,
    isLoading,
    error
  } = useGetUserProductByIdQuery({
    productId,
    lang: locale
  });

  // @TODO: replace with actual loading fallback
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isNotFoundOnServer = isErrorWithStatus(error) && error.status === 404;

  if (isNotFoundOnServer) {
    return renderRedirectComponent(productNotFoundRedirectConfig);
  }

  // @TODO: add error handling
  if (!product || error) {
    return <div>Error...</div>;
  }

  const categoryTag = getCategoryFromTags(product.tags);

  const categoryBadge = categoryTag && (
    <AppBadge
      badgeContent={
        <AppTypography
          variant="caption-small"
          translationKey={`productsAll.${categoryTag}`}
        />
      }
    />
  );

  const productDescription = product.description
    .split("/")
    .map((paragraph) => (
      <AppTypography key={paragraph}>{paragraph}</AppTypography>
    ));

  const deliveryMethods = deliveryMethodsData.map(
    ({ image, translationKey, value }) => {
      const translatedDeliveryMethodName = formatMessage({
        id: translationKey
      });

      return (
        <AppBox className="product-details__delivery-method" key={value}>
          <AppBox
            component="img"
            className="product-details__delivery-method-image"
            src={image}
            alt={translatedDeliveryMethodName}
          />
          <AppTypography>{translatedDeliveryMethodName}</AppTypography>
        </AppBox>
      );
    }
  );

  const inStockTypography = product.quantity > 0 && (
    <AppTypography
      className="product-details__in-stock"
      fontWeight="extra-bold"
      variant="caption"
      translationKey="productDetailsPage.inStock"
    />
  );

  const productWithId = { ...product, id: productId };

  return (
    <AppBox className="product-details">
      <AppBox className="product-details__image-wrapper">
        <AppBox component="img" src={product.image} alt={product.name} />
      </AppBox>
      <AppBox className="product-details__summary">
        {categoryBadge}
        <AppTypography variant="h3" component="h1">
          {product.name}
        </AppTypography>
        <AppBox>
          <AppBox className="product-details__section">
            {inStockTypography}
            <AppBox className="product-details__buy-action">
              <AppTypography
                className="product-details__price"
                variant="h3"
                component="h2"
              >
                {formatPrice(product.price)}
              </AppTypography>
              <BuyNowButton productWithId={productWithId} />
            </AppBox>
          </AppBox>
          <AppBox className="product-details__section">
            <AppTypography
              className="product-details__section-caption"
              variant="caption-small"
              translationKey="productDetailsPage.deliveryMethodsCaption"
            />
            <AppBox className="product-details__delivery-method-container">
              {deliveryMethods}
            </AppBox>
          </AppBox>
          <AppBox className="product-details__section">
            <AppTypography
              className="product-details__section-caption"
              variant="caption-small"
              translationKey="productDetailsPage.descriptionCaption"
            />
            <AppBox className="product-details__description">
              {productDescription}
            </AppBox>
          </AppBox>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default ProductDetailsContainer;
