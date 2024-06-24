import BestSellers from "@/layouts/best-sellers/BestSellers";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

const HomePage = () => {
  return (
    <>
      <IntroBanner />
      <BestSellers/>
      <PageWrapper>Content</PageWrapper>
    </>
  );
};

export default HomePage;
