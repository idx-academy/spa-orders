import subintroData from "@/layouts/subintro/Subintro.constants";
import SubintroItem from "@/layouts/subintro/components/SubintroItem";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import "@/layouts/subintro/subintro.scss";
import AppBox from "@/components/app-box/AppBox";

const Subintro = () => {
  return (
    <PageWrapper>
      <AppBox className="spa-subintro">
        {subintroData.map((element) => (
          <SubintroItem
            icon={element.icon}
            key={element.id}
            content={element.content}
          />
        ))}
      </AppBox>
    </PageWrapper>
  );
};

export default Subintro;
