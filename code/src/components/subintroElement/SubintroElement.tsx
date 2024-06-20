import Box from "@mui/material/Box";
import AppTypography from "@/components/app-typography/AppTypography";

type SubintroElement = {
    content: string;
    icon: string;
}

const SubintroElement = ({ content, icon }: SubintroElement) => {
    return (
        <Box className="spa-subintro_element" data-testid="spa-subintro-item">
            <img className="spa-subintro_icon" src={icon} />
            <AppTypography translationKey={content} variant="subtitle2" className="spa-subintro_content" />
        </Box>
    )
};

export default SubintroElement;