import subintroData from "@/containers/subintro/Subintro.constants";
import SubintroItem from "@/containers/subintro/components/SubintroItem";

import AppBox from "@/components/app-box/AppBox";

import "@/containers/subintro/Subintro.scss";

const Subintro = () => {
  return (
    <AppBox className="spa-subintro" data-cy="subintro">
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
