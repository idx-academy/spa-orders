import Box from "@mui/material/Box";

type SubintroElement = {
    content: string;
    icon: string;
}
const SubintroElement = ({ content, icon }: SubintroElement) => {
    return (
        <Box className="spa-subintro_element" data-testid="spa-subintro-item">
            <img className="spa-subintro_icon" src={icon} />
            <p className="spa-subintro_content">{content}</p>
        </Box>
    )
};

export default SubintroElement;