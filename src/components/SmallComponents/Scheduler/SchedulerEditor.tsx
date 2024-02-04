import { useState } from "react";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import {
  DefaultRecourse,
  SchedulerHelpers,
} from "@aldabil/react-scheduler/types";
import { Form, Formik } from "formik";
import { date, object, string } from "yup";
import DateAndTimePicker from "@/components/MUIComponents/DateAndTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@/components/MUIComponents/Autocomplete";

const fieldValidation = object({
  client_id: string().required("Полето е задължително"),
  treatment: string().required("Полето е задължително"),
  start: date().required("Полето е задължително"),
  end: date().required("Полето е задължително"),
});

type SchedulerFormValues = {
  client_id: string;
  treatment: string;
  start: Date;
  end: Date;
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
    client_id: (scheduler.client_id as string) || "",
    treatment: (scheduler.client_id as string) || "",
    start: event?.start || eventState.start.value || new Date(),
    end: event?.end || eventState.end.value || new Date(),
  };

  const handleCalculateEndData = (e: any, values: SchedulerFormValues) => {
    values.treatment = e.target.innerHTML;
    const selectedTreatment = treatmentOptions.find(
      (option) => option.title === e.target.innerHTML
    );
    if (selectedTreatment) {
      const durationInMinutes = selectedTreatment.duration;
      const start = values.start || new Date();
      const end = new Date(start.getTime() + durationInMinutes * 60000);
      values.end = end;
    }
  };

  const handleFormSubmit = async (values: SchedulerFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);
      // TODO: add title
      console.log(values);
    } catch (error) {
      console.log((error as Error).message);
      setFormStatus("error");
      setAlertMessage("Възникна грешка, моля опитайте отново!");
      setLoading(false);
    }
  };

  return (
    <Stack width="35rem" p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h4" variant="h3">
          {scheduler.edited ? `Промени ${event?.title}` : "Добави Час"}
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
          {({ handleSubmit, touched, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} mt={3}>
                <Autocomplete
                  name="client_id"
                  label="Клиент"
                  optionsData={resources}
                  value={values.client_id}
                  helperText={touched["client_id"] && errors["client_id"]}
                  error={touched["client_id"] && !!errors["client_id"]}
                  onChange={(e: any) => (values.client_id = e.target.innerHTML)}
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
                  optionsData={treatmentOptions}
                  value={values.treatment}
                  helperText={touched["treatment"] && errors["treatment"]}
                  error={touched["treatment"] && !!errors["treatment"]}
                  onChange={(e: any) => handleCalculateEndData(e, values)}
                />

                <DateAndTimePicker
                  name="end"
                  label="Крайна дата"
                  onChange={(e) => (values.end = e as Date)}
                  error={touched["end"] && !!errors["end"]}
                  helperText={touched["end"] && errors["end"]}
                  value={values.end}
                />

                <Button
                  message={scheduler.edited ? "Запази" : "Създай"}
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

const treatmentOptions = [
  {
    title: "Класически маникюр без лак (30 Мин)",
    value: "Класически маникюр без лак (30 Мин)",
    duration: 30,
  },
  {
    title: "Маникюр с гел лак (90мин)",
    value: "Маникюр с гел лак (90мин)",
    duration: 90,
  },
  {
    title: "Маникюр с обикновен лак (45 Мин)",
    value: "Маникюр с обикновен лак (45 Мин)",
    duration: 45,
  },
  {
    title: "Мъжки маникюр (30 Мин)",
    value: "Мъжки маникюр (30 Мин)",
    duration: 30,
  },
  {
    title: "Укрепване на един нокът (5 Мин)",
    value: "Укрепване на един нокът (5 Мин)",
    duration: 5,
  },
  {
    title: "Гел на естествен къси/дълги (2 ч)",
    value: "Гел на естествен къси/дълги (2 ч)",
    duration: 120,
  },
  {
    title: "Френски маникюр и омбре (15 Мин)",
    value: "Френски маникюр и омбре (15 Мин)",
    duration: 15,
  },
  {
    title: "Дизайнерска декорация (15 Мин)",
    value: "Дизайнерска декорация (15 Мин)",
    duration: 15,
  },
  {
    title: "Малки декорации (10 Мин)",
    value: "Малки декорации (10 Мин)",
    duration: 10,
  },
  {
    title: "Премахване на гел лак (10 Мин)",
    value: "Премахване на гел лак (10 Мин)",
    duration: 10,
  },
  {
    title: "Спа терапия маникюр (10мин)",
    value: "Спа терапия маникюр (10мин)",
    duration: 10,
  },
  {
    title: "Класически педикюр без лак (45мин)",
    value: "Класически педикюр без лак (45мин)",
    duration: 45,
  },
  {
    title: "Педикюр с гел лак (90мин)",
    value: "Педикюр с гел лак (90мин)",
    duration: 90,
  },
  {
    title: "Педикюр с обикновен лак (60мин)",
    value: "Педикюр с обикновен лак (60мин)",
    duration: 60,
  },
  {
    title: "Бърз педикюр (50 Мин)",
    value: "Бърз педикюр (50 Мин)",
    duration: 50,
  },
  {
    title: "Мъжки педикюр (50 Мин)",
    value: "Мъжки педикюр (50 Мин)",
    duration: 50,
  },
  {
    title: "Спа терапия педикюр (10 Мин)",
    value: "Спа терапия педикюр (10 Мин)",
    duration: 10,
  },
  {
    title: "Изграждане на къси нокти (2 часа)",
    value: "Изграждане на къси нокти (2 часа)",
    duration: 120,
  },
  {
    title: "Изграждане на дълги нокти (3 часа)",
    value: "Изграждане на дълги нокти (3 часа)",
    duration: 180,
  },
  {
    title: "Поддръжка на изградени нокти (2 часа)",
    value: "Поддръжка на изградени нокти (2 часа)",
    duration: 120,
  },
  {
    title: "Изграждане на един нокът (5 Мин)",
    value: "Изграждане на един нокът (5 Мин)",
    duration: 5,
  },
  {
    title: "Премахване на ноктопластика (15 Мин)",
    value: "Премахване на ноктопластика (15 Мин)",
    duration: 15,
  },
  {
    title: "Пакет маникюр и педикюр с гел лак (3ч)",
    value: "Пакет маникюр и педикюр с гел лак (3ч)",
    duration: 180,
  },
  {
    title: "Спа терапия 3+1 (10 Мин)",
    value: "Спа терапия 3+1 (10 Мин)",
    duration: 10,
  },
];
