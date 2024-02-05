import { ProcessedEvent } from "@aldabil/react-scheduler/types";
import { Stack, Typography, useTheme } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import PersonIcon from "@mui/icons-material/Person";
import { formatDate } from "@/helpers/helpers";
import BrushIcon from "@mui/icons-material/Brush";
import CommentIcon from "@mui/icons-material/Comment";

interface SchedulerVewerTitleProps {
  event: ProcessedEvent;
}

const SchedulerVewerTitle: React.FC<SchedulerVewerTitleProps> = ({ event }) => {
  const theme = useTheme();

  return (
    <Stack style={{ fontSize: "1.2rem" }} py={1} gap={1}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <EventIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Заглавие: {event.title}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <EventAvailableIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Начало: {formatDate(event.start)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <EventBusyIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Край: {formatDate(event.end)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <PersonIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Клиент:
        </Typography>
        <Typography component="p" variant="body1">
          {event.title}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <BrushIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Прецедура: {event.treatment}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <CommentIcon sx={{ color: theme.palette.common.white }} />
        <Typography component="p" variant="body1">
          Бележка: {event.note ? event.note : "Няма бележка"}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SchedulerVewerTitle;
