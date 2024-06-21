import Box from "@mui/material/Box";
import AppTypography from "@/components/app-typography/AppTypography";

type SubintroElementProps = {
  content: string;
  icon: string;
};

const SubintroElement = ({ content, icon }: SubintroElementProps) => {
  return (
    <Box className="spa-subintro__element" data-testid="spa-subintro-item">
      <img className="spa-subintro__icon" src={icon} />
      <AppTypography
        translationKey={content}
        variant="subtitle2"
        className="spa-subintro__content"
      />
    </Box>
  );
};

export default SubintroElement;
