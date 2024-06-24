import Box from "@mui/material/Box";
import subintroData from "@/components/subintro/Subintro.constants";
import SubintroElement from "@/components/subintroElement/SubintroElement";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import "@/components/subintro/subintro.scss";

const Subintro = () => {
  return (
    <PageWrapper>
      <Box className="spa-subintro">
        {subintroData.map((element) => (
          <SubintroElement
            icon={element.icon}
            key={element.id}
            content={element.content}
          />
        ))}
      </Box>
    </PageWrapper>
  );
};

export default Subintro;
