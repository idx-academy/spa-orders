import BestSellers from "@/layouts/best-sellers/BestSellers";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import Subintro from "@/layouts/subintro/Subintro";
import CategorySection from "@/layouts/category-section/CategorySection";
import CallToAction from "@/layouts/call-to-action/CallToAction";
import AppButton from "@/components/app-button/AppButton";
import useSignIn from "@/hooks/use-sign-in/useSignIn";

const HomePage = () => {
  const [signIn] = useSignIn();

  return (
    <>
      <AppButton
        onClick={() => {
          signIn({ email: "fdg", password: "dfg" });
        }}
      >
        Sign in
      </AppButton>
      <IntroBanner />
      <PageWrapper>
        <Subintro />
        <CallToAction />
        <BestSellers />
        <CategorySection />
      </PageWrapper>
    </>
  );
};

export default HomePage;
