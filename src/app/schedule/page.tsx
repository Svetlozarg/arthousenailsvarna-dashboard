"use client";
import { useEffect, useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import Scheduler from "@/components/SmallComponents/Scheduler/Scheduler";
import {
  DefaultRecourse,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { callApi } from "@/services/callApi";
import { getQueryClients } from "@/services/Clients/apiStaffGetQueries";
import { GetQueryClientsSnippet } from "@/services/Clients/apiStaffSnippets";

const SchedulerPage = () => {
  const [eventsData, setEventsData] = useState<ProcessedEvent[]>();
  const [resourcesData, setResourcesData] = useState<DefaultRecourse[]>();

  useEffect(() => {
    (async () => {
      try {
        const clientsData = await callApi<GetQueryClientsSnippet>({
          query: getQueryClients,
        });

        if (clientsData.success) {
          const filteredStaffData = clientsData.data.map((client) => ({
            client_id: client._id,
            title: `${client.first_name} ${client.last_name}`,
            avatar: `${client.first_name
              .charAt(0)
              .toUpperCase()}${client.last_name.charAt(0).toUpperCase()}`,
            color: "#f7e1e3",
          }));

          setResourcesData(filteredStaffData);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Stack gap={4}>
      <PageHeader
        header="Клиенти"
        subheader="Всичко за вашите клиенти на едно място"
        icon={<CalendarMonthOutlinedIcon sx={{ fontSize: "2.5rem" }} />}
      />

      {resourcesData ? (
        <Scheduler
          events={eventsData}
          resources={resourcesData}
          showResources={false}
          setEventsData={setEventsData}
        />
      ) : (
        <Stack height="600px" justifyContent="center" alignItems="center">
          <CircularProgress size="8rem" />
        </Stack>
      )}
    </Stack>
  );
};

export default SchedulerPage;
