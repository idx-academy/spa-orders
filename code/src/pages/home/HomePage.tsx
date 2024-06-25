import BestSellers from "@/layouts/best-sellers/BestSellers";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import Subintro from "@/layouts/subintro/Subintro";
import CategorySection from "@/layouts/category-section/CategorySection";
import CallToAction from "@/layouts/call-to-action/CallToAction";

const HomePage = () => {
  return (
    <>
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
