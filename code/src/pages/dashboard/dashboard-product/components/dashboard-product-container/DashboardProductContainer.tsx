import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductDescription from "@/components/product-description/ProductDescription";

import routes from "@/constants/routes";
import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { dashboardProductPageNotFoundErrorConfig } from "@/pages/dashboard/dashboard-product/DashboardProductPage.constants";
import { DashboarProductContainerProps } from "@/pages/dashboard/dashboard-product/DashboardProductPage.types";
import { useGetManagerProductQuery } from "@/store/api/productsApi";
import cn from "@/utils/cn/cn";
import formatPrice from "@/utils/format-price/formatPrice";
import getCategoryFromTags from "@/utils/get-category-from-tags/getCategoryFromTags";
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";

import "@/pages/dashboard/dashboard-product/components/dashboard-product-container/DashboardProductContainer.scss";

const DashboardProductContainer = ({
  productId
}: DashboarProductContainerProps) => {
  const [selectedLocaleIndex, setSelectedLocaleIndex] = useState(0);

  const {
    data: product,
    isLoading,
    error
  } = useGetManagerProductQuery({ productId });

  const { renderRedirectComponent } = useErrorPageRedirect();

  if (isLoading) {
    return <PageLoadingFallback className="dashboard-tabs__loading-fallback" />;
  }

  const shouldShowNotFoundError =
    !product && isErrorWithStatus(error) && error.status === 404;

  if (shouldShowNotFoundError) {
    return renderRedirectComponent(dashboardProductPageNotFoundErrorConfig);
  }

  if (!product || error) {
    return <AppTypography translationKey="errors.somethingWentWrong" />;
  }

  const { status, image, price, quantity, tags, productTranslations } = product;

  const languageButtons = productTranslations.map(({ languageCode }, index) => {
    const buttonClassNames = cn(
      "dashboard-product__language-button",
      index === selectedLocaleIndex &&
        "dashboard-product__language-button--active"
    );

    const handleClick = () => setSelectedLocaleIndex(index);

    return (
      <AppButton
        variant="contained"
        size="small"
        key={languageCode}
        className={buttonClassNames}
        data-testid="product-language-button"
        onClick={handleClick}
      >
        <AppTypography translationKey={`language.full.${languageCode}`} />
      </AppButton>
    );
  });

  const productName = productTranslations[selectedLocaleIndex].name;

  const productStatusLabel =
    status === "VISIBLE"
      ? "dashboardProduct.status.visible"
      : "dashboardProduct.status.hidden";

  const categoryName = getCategoryFromTags(tags.map((item) => item.name));

  const displayedCategory = categoryName ? (
    <AppTypography translationKey={`productsAll.${categoryName}`} />
  ) : (
    <AppTypography>-</AppTypography>
  );

  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-products-tab__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardProduct.title"
        />
        <AppButton
          data-cy="new-product-button"
          variant="contained"
          to={routes.dashboard.products.update.path(productId)}
        >
          <EditIcon />
          <AppTypography translationKey="product.edit" />
        </AppButton>
      </AppBox>
      <AppBox>
        <AppBox className="dashboard-product">
          <AppBox className="dashboard-product__container dashboard-product__image-section">
            <AppBox className="dashboard-product__header">
              <AppTypography
                component="h1"
                variant="h3"
                translationKey="dashboardProduct.section.image.title"
                className="dashboard-product__header-title"
              />
            </AppBox>
            <AppBox className="dashboard-product__body">
              <AppBox
                component="img"
                className="dashboard-product__image"
                data-testid="product-image"
                src={image}
                alt={productName}
              />
            </AppBox>
          </AppBox>
          <AppBox className="dashboard-product__container dashboard-product__additional-info-section">
            <AppBox className="dashboard-product__header">
              <AppTypography
                component="h1"
                variant="h3"
                translationKey="dashboardProduct.section.additionalInformation.title"
                className="dashboard-product__header-title"
              />
            </AppBox>
            <AppBox className="dashboard-product__body">
              <AppBox className="dashboard-product__additional-info-item">
                <AppTypography
                  className="dashboard-product__additional-info-item-label"
                  translationKey="product.quantity"
                />
                <AppTypography>{quantity}</AppTypography>
              </AppBox>
              <AppBox className="dashboard-product__additional-info-item">
                <AppTypography
                  className="dashboard-product__additional-info-item-label"
                  translationKey="product.price"
                />
                <AppTypography>{formatPrice(price)}</AppTypography>
              </AppBox>
              <AppBox className="dashboard-product__additional-info-item">
                <AppTypography
                  className="dashboard-product__additional-info-item-label"
                  translationKey="product.category"
                />
                {displayedCategory}
              </AppBox>
            </AppBox>
          </AppBox>
          <AppBox className="dashboard-product__main-info-section">
            <AppBox
              className="dashboard-product__container dashboard-product__main-info-container"
              data-testid={`main-info-${productTranslations[selectedLocaleIndex].languageCode}`}
            >
              <AppBox
                className={
                  "dashboard-product__header dashboard-product__header-main"
                }
              >
                <AppTypography
                  component="h1"
                  variant="h3"
                  translationKey="dashboardProduct.section.mainInformation.title"
                  className="dashboard-product__header-title"
                />
                <AppBox className="dashboard-product__language-buttons">
                  {languageButtons}
                </AppBox>
              </AppBox>
              <AppBox className="dashboard-product__body">
                <AppBox className="dashboard-product__text-container">
                  <AppBox className="dashboard-product__main-info-item">
                    <AppTypography
                      translationKey="product.name"
                      className="dashboard-product__main-info-item-label"
                      variant="caption"
                    />
                    <AppTypography className="dashboard-product__name">
                      {productName}
                    </AppTypography>
                  </AppBox>
                  <AppBox className="dashboard-product__main-info-item">
                    <AppTypography
                      translationKey="product.description"
                      className="dashboard-product__main-info-item-label"
                      variant="caption"
                    />
                    <ProductDescription
                      description={
                        productTranslations[selectedLocaleIndex].description
                      }
                    />
                  </AppBox>
                </AppBox>
                <AppBox>
                  <AppTypography
                    className="dashboard-product__status-caption"
                    translationKey={productStatusLabel}
                  />
                </AppBox>
              </AppBox>
            </AppBox>
          </AppBox>
        </AppBox>
      </AppBox>
    </DashboardTabContainer>
  );
};

export default DashboardProductContainer;
