import Box from "@mui/material/Box";
import subintroData from "@/layouts/subintro/Subintro.constants";
import SubintroItem from "@/layouts/subintro/components/SubintroItem";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import "@/layouts/subintro/subintro.scss";

const Subintro = () => {
  return (
    <PageWrapper>
      <Box className="spa-subintro">
        {subintroData.map((element) => (
          <SubintroItem
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
