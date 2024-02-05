import { Stack, Typography, useTheme } from "@mui/material";

interface HomeWidgetProps {
  label: string;
  value: string;
  icon: React.ReactElement<any, any>;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({ label, value, icon }) => {
  const theme = useTheme();

  return (
    <Stack
      width="100%"
      maxWidth={{ xs: "100%", md: "25rem" }}
      minWidth="25rem"
      direction="row"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.primary.main}
      borderRadius="10px"
      p={5}
      gap={2}
    >
      {icon}
      <Stack gap={1}>
        <Typography component="p" variant="h3" color="common.white">
          {label}
        </Typography>
        <Typography
          component="h4"
          variant="h2"
          textAlign="center"
          color="common.white"
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HomeWidget;
