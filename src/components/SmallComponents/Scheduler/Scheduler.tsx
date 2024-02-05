"use client";
import { Scheduler as MUIScheduler } from "@aldabil/react-scheduler";
import { DAY, FIELDS, MONTH, RESOURCE_FIELDS, WEEK } from "./schedulerData";
import { SchedulerLocale } from "@/components/SmallComponents/Scheduler/SchedulerLocale";
import { View } from "@aldabil/react-scheduler/components/nav/Navigation";
import {
  DefaultRecourse,
  ProcessedEvent,
} from "@aldabil/react-scheduler/types";
import bg from "date-fns/locale/bg";
import SchedulerEditor from "./SchedulerEditor";
import { callApi } from "@/services/callApi";
import {
  PostQueryDeleteEventSnippet,
  PostQueryUpdateEventSnippet,
} from "@/services/Events/apiEventsSnippets";
import {
  postQueryDeleteEvent,
  postQueryUpdateEvent,
} from "@/services/Events/apiEventsPostQueries";
import SchedulerVewerTitle from "./SchedulerVewerTitle";

interface SchedulerProps {
  events?: ProcessedEvent[];
  resources: DefaultRecourse[];
  loading?: boolean;
  view?: View;
  resourceViewMode?: "tabs" | "default";
  showResources?: boolean;
  setEventsData?: React.Dispatch<
    React.SetStateAction<ProcessedEvent[] | undefined>
  >;
}

const Scheduler: React.FC<SchedulerProps> = ({
  view = "month",
  events,
  resources,
  resourceViewMode = "tabs",
  loading,
  showResources,
  setEventsData,
}) => {
  const handleEventDragged = async (
    droppedOn: Date,
    updatedEvent: ProcessedEvent,
    originalEvent: ProcessedEvent
  ): Promise<void | ProcessedEvent> => {
    try {
      const client = resources.find(
        (client) => client.client_id === originalEvent.client_id
      );

      if (!client) return;
      const newEvent = await callApi<PostQueryUpdateEventSnippet>({
        query: postQueryUpdateEvent(
          {
            title: originalEvent.title,
            start: updatedEvent.start,
            end: updatedEvent.end,
            client_id: updatedEvent.client_id
              ? updatedEvent.client_id
              : originalEvent.client_id,
            note: originalEvent.note,
            treatment: originalEvent.treatment,
          },
          originalEvent.event_id.toString()
        ),
      });

      if (newEvent.success) {
        if (setEventsData) {
          setEventsData((prev) => {
            if (prev) {
              const filteredEvents = prev.filter(
                (event) => event.event_id !== originalEvent.event_id
              );
              return [
                ...filteredEvents,
                {
                  ...originalEvent,
                  start: updatedEvent.start,
                  end: updatedEvent.end,
                  client_id: updatedEvent.client_id
                    ? updatedEvent.client_id
                    : originalEvent.client_id,
                },
              ];
            }
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventDelete = async (deletedId: string): Promise<string> => {
    return new Promise(async (res: any) => {
      try {
        const deletedEvent = await callApi<PostQueryDeleteEventSnippet>({
          query: postQueryDeleteEvent(deletedId),
        });

        if (deletedEvent.success) {
          res(deletedId);
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <MUIScheduler
      resourceViewMode={resourceViewMode}
      view={view}
      events={events ? events : []}
      resources={showResources ? resources : []}
      hourFormat="24"
      translations={SchedulerLocale}
      resourceFields={RESOURCE_FIELDS}
      fields={FIELDS(resources)}
      loading={loading}
      month={MONTH}
      week={WEEK}
      day={DAY}
      onDelete={handleEventDelete}
      onEventDrop={handleEventDragged}
      locale={bg}
      customEditor={(scheduler) => (
        <SchedulerEditor scheduler={scheduler} resources={resources} />
      )}
      viewerTitleComponent={(event) => <SchedulerVewerTitle event={event} />}
    />
  );
};

export default Scheduler;
