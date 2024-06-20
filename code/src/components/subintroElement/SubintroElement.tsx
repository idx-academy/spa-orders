import { Avatar, Box } from "@mui/material";

const SubintroElement = ({content, icon}: {content : string, icon: any}) => {
    return (
        <Box className="spa-subintro_element" data-testid="spa-subintro-item">
            <img className="spa-subintro_icon" src={icon}/>
            <p className="spa-subintro_content">{content}</p>
        </Box>
    )
}

export default SubintroElement