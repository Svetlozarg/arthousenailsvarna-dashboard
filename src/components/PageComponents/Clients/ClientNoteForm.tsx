import { useState } from "react";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import Button from "@/components/MUIComponents/Button";
import TextField from "@/components/MUIComponents/TextField";
import { postQueryCreateNote } from "@/services/Notes/apiNotesPostQueries";
import {
  Note,
  PostQueryCreateNoteSnippet,
} from "@/services/Notes/apiNotesSnippets";
import { callApi } from "@/services/callApi";
import { CircularProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";

const fieldValidation = object({
  title: string().required("Полето е задължително"),
});

type NoteFormValues = {
  title: string;
};

interface ClientNoteFormProps {
  clientId: string;
  setNotesData: React.Dispatch<React.SetStateAction<Note[] | undefined>>;
}

const ClientNoteForm: React.FC<ClientNoteFormProps> = ({
  clientId,
  setNotesData,
}) => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: NoteFormValues = {
    title: "",
  };

  const handleFormSubmit = async (values: NoteFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const note = await callApi<PostQueryCreateNoteSnippet>({
        query: postQueryCreateNote({
          title: values.title,
          client_id: clientId,
        }),
      });

      if (note.success) {
        setNotesData((prevNotes) => {
          if (prevNotes) {
            return [...prevNotes, note.data];
          } else {
            return [note.data];
          }
        });

        setFormStatus("success");
        setAlertMessage("Успешно добавяне на бележка");
        setLoading(false);
      }
    } catch (err) {
      console.log((err as Error).message);
      setFormStatus("error");
      setAlertMessage("Неуспешно добавяне на бележка");
      setLoading(false);
    }
  };

  return (
    <Stack>
      {!loading ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={fieldValidation}
        >
          {({ handleSubmit, handleChange, touched, errors, values }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} mt={3}>
                <TextField
                  name="title"
                  label="Въведете бележка"
                  error={touched["title"] && !!errors["title"]}
                  helperText={touched["title"] && errors["title"]}
                  onChange={handleChange}
                  value={values.title}
                  type="text"
                />

                <Button message="Добави" type="submit" />

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

export default ClientNoteForm;
