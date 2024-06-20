import "./subintro.scss";
import { subintroData } from "./subintroData";
import SubintroElement from "../subintroElement/SubintroElement";
import { Paper } from "@mui/material";
import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import Box from "@mui/material/Box";

const Subintro = () => {
    return (
        <PageWrapper>
            <Box className="spa-subintro">
            {subintroData.map(element => <SubintroElement icon={element.icon} key={element.id} 
                content={element.content}/>)}
            </Box>
        </PageWrapper>
    )
}

export default Subintro;