import BestSellers from "@/layouts/best-sellers/BestSellers";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import Subintro from "@/layouts/subintro/Subintro";
import CategorySection from "@/layouts/category-section/CategorySection";
import CallToActionSection from "@/pages/home/components/call-to-action-section/CallToActionSection";

const HomePage = () => {
  return (
    <>
      <IntroBanner />
      <PageWrapper>
        <Subintro />
        <CallToActionSection />
        <BestSellers />
        <CategorySection />
      </PageWrapper>
    </>
  );
};

export default HomePage;
