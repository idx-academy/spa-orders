import AppButton from "@/components/app-button/AppButton";
import AppContainer from "@/components/app-container/AppContainer";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

const NotFoundPage = () => {
  return (
    <AppContainer>
      <AppTypography variant="h1">404 Not Found</AppTypography>
      <AppButton>
        <AppLink to="/">Go back</AppLink>
      </AppButton>
    </AppContainer>
  );
};

export default NotFoundPage;
