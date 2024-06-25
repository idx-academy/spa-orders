import BestSellers from "@/layouts/best-sellers/BestSellers";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import Subintro from "@/layouts/subintro/Subintro";

const HomePage = () => {
  return (
    <>
      <IntroBanner />
      <PageWrapper>
        <BestSellers />
        <Subintro />
      </PageWrapper>
    </>
  );
};

export default HomePage;
