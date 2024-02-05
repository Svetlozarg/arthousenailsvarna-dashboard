import { Box, Stack, Typography, useTheme } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { getWeekData } from "@/helpers/helpers";

const HomeUpcommingEvents = () => {
  const theme = useTheme();

  return (
    <Stack flex={1} gap={2}>
      <Typography component="h4" variant="h2">
        Предстоящи Часове
      </Typography>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <DateRangeIcon />
        <Typography component="h4" variant="h3">
          {new Date()
            .toLocaleString("bg-BG", {
              month: "long",
              year: "numeric",
            })
            .charAt(0)
            .toUpperCase() +
            new Date()
              .toLocaleString("bg-BG", {
                month: "long",
                year: "numeric",
              })
              .slice(1)}
        </Typography>
      </Stack>

      <Stack direction="row">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          {getWeekData().map((day, index) => (
            <Stack
              key={index}
              width="4rem"
              justifyContent="center"
              alignItems="center"
              bgcolor={theme.palette.primary.main}
              p={1}
              borderRadius="10px"
              sx={{ cursor: "pointer" }}
              gap={0.5}
            >
              <Typography component="p" variant="h4" color="common.white">
                {day.day}
              </Typography>
              <Typography component="p" variant="h4">
                {day.date}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack
        width="100%"
        maxWidth="34rem"
        bgcolor={theme.palette.background.default}
        borderRadius="10px"
        p={2}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <WatchLaterIcon
            sx={{ fontSize: "3rem", color: theme.palette.primary.main }}
          />
          <Typography component="p" variant="h3" color="primary.main">
            Име Фамилия
          </Typography>
          <Box>
            <Typography component="p" variant="body1">
              Процедура
            </Typography>
            <Typography component="p" variant="body1">
              10.00 - 11.00
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomeUpcommingEvents;
