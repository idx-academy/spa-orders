import "@/components/subintro/subintro.scss";
import subintroData from "@/components/subintro/subintroData";
import SubintroElement from "@/components/subintroElement/SubintroElement";
import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import Box from "@mui/material/Box";

const Subintro = () => {
    return (
        <PageWrapper>
            <Box className="spa-subintro">
                {subintroData.map(element => <SubintroElement icon={element.icon} key={element.id}
                    content={element.content} />)}
            </Box>
        </PageWrapper>
    )
}

export default Subintro;