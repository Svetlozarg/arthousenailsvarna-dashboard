"use client";
import { useEffect, useState } from "react";
import HomeWidget from "@/components/PageComponents/Home/HomeWidget";
import { Grid, Paper, Stack } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeUpcommingEvents from "@/components/PageComponents/Home/HomeUpcommingEvents";
import { callApi } from "@/services/callApi";
import { getQueryAllEvents } from "@/services/Events/apiEventsGetQueries";
import {
  Event,
  GetQueryAllEventsSnippet,
} from "@/services/Events/apiEventsSnippets";
import { getWeekData } from "@/helpers/helpers";
import { GetQueryClientsSnippet } from "@/services/Clients/apiStaffSnippets";
import { getQueryClients } from "@/services/Clients/apiStaffGetQueries";

const HomePage = () => {
  const [eventsData, setEventsData] = useState<Event[]>();
  const [totalClients, setTotalClients] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const clientsData = await callApi<GetQueryClientsSnippet>({
        query: getQueryClients,
      });

      const eventsData = await callApi<GetQueryAllEventsSnippet>({
        query: getQueryAllEvents,
      });

      if (clientsData.success) {
        setTotalClients(clientsData.data.length);
      }

      const filteredEvents = eventsData.data.filter((event) => {
        const eventDate = new Date(event.start).getDate();
        return getWeekData().some((item) => +item.date === eventDate);
      });

      if (eventsData.success) {
        setEventsData(filteredEvents);
        setTotalEvents(
          eventsData.data.filter((event) => new Date(event.start) >= new Date())
            .length
        );
      }
    })();
  }, []);

  return (
    <Paper sx={{ mt: 4, p: 5 }}>
      <Grid container spacing={{ xs: 4, sm: 4, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2}>
            <HomeWidget
              label="Общо Клиенти"
              value={totalClients.toString()}
              icon={
                <SupervisedUserCircleIcon
                  sx={{ fontSize: "5rem", color: "common.white" }}
                />
              }
            />

            <HomeWidget
              label="Оставащи Часове"
              value={totalEvents.toString()}
              icon={
                <CalendarMonthIcon
                  sx={{ fontSize: "5rem", color: "common.white" }}
                />
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <HomeUpcommingEvents
            eventsData={eventsData}
            weekData={getWeekData()}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HomePage;
