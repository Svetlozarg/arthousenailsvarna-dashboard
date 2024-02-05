"use client";
import HomeWidget from "@/components/PageComponents/Home/HomeWidget";
import { Paper, Stack } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeUpcommingEvents from "@/components/PageComponents/Home/HomeUpcommingEvents";

const HomePage = () => {
  return (
    <Paper sx={{ mt: 4, p: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={5}
      >
        <Stack direction="row" gap={2}>
          <HomeWidget
            label="Общо Клиенти"
            value="100"
            icon={
              <SupervisedUserCircleIcon
                sx={{ fontSize: "5rem", color: "common.white" }}
              />
            }
          />

          <HomeWidget
            label="Общо Часове"
            value="100"
            icon={
              <CalendarMonthIcon
                sx={{ fontSize: "5rem", color: "common.white" }}
              />
            }
          />
        </Stack>

        <HomeUpcommingEvents />
      </Stack>
    </Paper>
  );
};

export default HomePage;
