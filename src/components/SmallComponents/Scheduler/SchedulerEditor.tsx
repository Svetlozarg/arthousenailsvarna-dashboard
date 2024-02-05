import { useState } from "react";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import {
  DefaultRecourse,
  ProcessedEvent,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { Form, Formik } from "formik";
import { date, object, string } from "yup";
import DateAndTimePicker from "@/components/MUIComponents/DateAndTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@/components/MUIComponents/Autocomplete";
import { TREATMENT_OPTIONS } from "./schedulerData";
import { PostQueryCreateEventInput } from "@/services/Events/apiEventsInputs";
import { callApi } from "@/services/callApi";
import {
  PostQueryCreateEventSnippet,
  PostQueryUpdateEventSnippet,
} from "@/services/Events/apiEventsSnippets";
import {
  postQueryCreateEvent,
  postQueryUpdateEvent,
} from "@/services/Events/apiEventsPostQueries";
import TextField from "@/components/MUIComponents/TextField";

const fieldValidation = object({
  client_id: string().required("Полето е задължително"),
  treatment: string().required("Полето е задължително"),
  start: date().required("Полето е задължително"),
  end: date().required("Полето е задължително"),
  note: string(),
});

type SchedulerFormValues = {
  title: string;
  client_id: string;
  treatment: string;
  start: Date;
  end: Date;
  note: string;
};

interface SchedulerEditorProps {
  scheduler: SchedulerHelpers;
  resources: DefaultRecourse[];
}

const SchedulerEditor = ({ scheduler, resources }: SchedulerEditorProps) => {
  const event = scheduler.edited;
  const eventState = scheduler.state;
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: SchedulerFormValues = {
    title: event?.title || "",
    client_id: event?.client_id || "",
    treatment: event?.treatment || "",
    start: event?.start || eventState.start.value || new Date(),
    end: event?.end || eventState.end.value || new Date(),
    note: event?.note || "",
  };

  const handleCalculateEndData = (
    e: any,
    values: SchedulerFormValues,
    handleChange: any
  ) => {
    values.treatment = e.target.innerHTML;
    const selectedTreatment = TREATMENT_OPTIONS.find(
      (option) => option.title === e.target.innerHTML
    );
    if (selectedTreatment) {
      const durationInMinutes = selectedTreatment.duration;
      const start = values.start || new Date();
      const end = new Date(start.getTime() + durationInMinutes * 60000);
      values.end = end;
      handleChange({ target: { name: "end", value: end } });
    }
  };

  const handleFormSubmit = async (values: SchedulerFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const client_id = resources.find(
        (resource) => resource.client_id === values.client_id
      );
      if (!client_id) return;
      const event_id = event?.event_id.toString() || Math.random().toString();

      const added_updated_event = (await new Promise((res) => {
        res({
          event_id: event_id,
          title: values.title,
          start: values.start,
          end: values.end,
          client_id: values.client_id,
          treatment: values.treatment,
          note: values.note ? values.note : "",
          color: "#D1B160",
        });
      })) as ProcessedEvent;

      const body: PostQueryCreateEventInput = {
        event_id: event_id,
        title: values.title,
        start: values.start,
        end: values.end,
        client_id: values.client_id,
        treatment: values.treatment,
        note: values.note ? values.note : "",
      };

      if (event) {
        const updatedEvent = await callApi<PostQueryUpdateEventSnippet>({
          query: postQueryUpdateEvent(body, event.event_id.toString()),
        });

        if (updatedEvent.success) {
          scheduler.onConfirm(updatedEvent.data, "edit");
          setLoading(false);
          scheduler.close();
        }
      } else {
        const newEvent = await callApi<PostQueryCreateEventSnippet>({
          query: postQueryCreateEvent(body),
        });

        if (newEvent.success) {
          scheduler.onConfirm(newEvent.data, "create");
          setLoading(false);
          scheduler.close();
        }
      }

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } catch (error) {
      console.log((error as Error).message);
      setFormStatus("error");
      setAlertMessage("Възникна грешка, моля опитайте отново!");
      setLoading(false);
    }
  };

  return (
    <Stack width="100vw" maxWidth="35rem" p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h4" variant="h3">
          {scheduler.edited
            ? `Промяна на часът на ${event?.title}`
            : "Добави нов час"}
        </Typography>

        <IconButton onClick={() => scheduler.close()}>
          <CloseIcon />
        </IconButton>
      </Stack>

      {!loading ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={fieldValidation}
        >
          {({ handleSubmit, handleChange, touched, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} mt={3}>
                <Autocomplete
                  name="client_id"
                  label="Клиент"
                  optionsData={resources}
                  value={values.client_id}
                  helperText={touched["client_id"] && errors["client_id"]}
                  error={touched["client_id"] && !!errors["client_id"]}
                  onChange={(e: any) => {
                    values.title = e.target.innerHTML;
                    const selectedResource = resources.find((resource) => {
                      return resource.title === e.target.innerHTML;
                    });

                    if (selectedResource) {
                      values.client_id = selectedResource.client_id;
                    }
                  }}
                />

                <DateAndTimePicker
                  name="start"
                  label="Начална дата"
                  onChange={(e) => (values.start = e as Date)}
                  error={touched["start"] && !!errors["start"]}
                  helperText={touched["start"] && errors["start"]}
                  value={values.start}
                  type="datetime"
                />

                <Autocomplete
                  name="treatment"
                  label="Прецедура"
                  optionsData={TREATMENT_OPTIONS}
                  value={values.treatment}
                  helperText={touched["treatment"] && errors["treatment"]}
                  error={touched["treatment"] && !!errors["treatment"]}
                  onChange={(e: any) =>
                    handleCalculateEndData(e, values, handleChange)
                  }
                />

                <DateAndTimePicker
                  name="end"
                  label="Крайна дата"
                  onChange={(e) => (values.end = e as Date)}
                  error={touched["end"] && !!errors["end"]}
                  helperText={touched["end"] && errors["end"]}
                  value={values.end}
                />

                <TextField
                  name="note"
                  label="Бележка (по желание)"
                  error={touched["note"] && !!errors["note"]}
                  helperText={touched["note"] && errors["note"]}
                  onChange={handleChange}
                  value={values.note}
                  multiline
                  maxRows={4}
                  type="text"
                />

                <Button
                  message={scheduler.edited ? "Запази" : "Добави"}
                  type="submit"
                />

                <Alert
                  message={alertMessage}
                  showAlert={!!alertMessage}
                  severity={formStatus}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      ) : (
        <Stack justifyContent="center" alignItems="center" my={5}>
          <CircularProgress size="3rem" />
        </Stack>
      )}
    </Stack>
  );
};

export default SchedulerEditor;
