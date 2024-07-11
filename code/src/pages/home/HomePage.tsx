import BestSellers from "@/containers/best-sellers/BestSellers";
import CallToAction from "@/containers/call-to-action/CallToAction";
import CategorySection from "@/containers/category-section/CategorySection";
import IntroBanner from "@/containers/intro-banner/IntroBanner";
import Subintro from "@/containers/subintro/Subintro";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

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
