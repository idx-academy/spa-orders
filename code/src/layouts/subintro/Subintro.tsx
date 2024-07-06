import subintroData from "@/layouts/subintro/Subintro.constants";
import SubintroItem from "@/layouts/subintro/components/SubintroItem";

import AppBox from "@/components/app-box/AppBox";

import "@/layouts/subintro/Subintro.scss";

const Subintro = () => {
  return (
    <AppBox className="spa-subintro">
      {subintroData.map((element) => (
        <SubintroItem
          icon={element.icon}
          key={element.id}
          content={element.content}
        />
      ))}
    </AppBox>
  );
};

export default Subintro;
