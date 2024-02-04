import { useState } from "react";
import { ModalDataType, ModalType } from "@/app/clients/page";
import Alert, { AlertStatuses } from "@/components/MUIComponents/Alert";
import { object, string } from "yup";
import { CircularProgress, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import TextField from "@/components/MUIComponents/TextField";
import Button from "@/components/MUIComponents/Button";
import { callApi } from "@/services/callApi";
import {
  Client,
  PostQueryCreateClientSnippet,
  PostQueryUpdateClientSnippet,
} from "@/services/Clients/apiStaffSnippets";
import {
  postQueryCreateClient,
  postQueryUpdatedClient,
} from "@/services/Clients/apiStaffPostQueries";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const fieldValidation = object({
  firstName: string().required("Полето е задължително"),
  lastName: string().required("Полето е задължително"),
  phoneNumber: string()
    .matches(phoneRegExp, "Невалиден телефонен номер")
    .required("Полето е задължително"),
});

type ClientsFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

interface ClientsFormProps {
  modalData?: ModalDataType;
  modalType: ModalType;
  loading: boolean;
  setClientsData: React.Dispatch<React.SetStateAction<Client[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientsForm: React.FC<ClientsFormProps> = ({
  modalType,
  modalData,
  loading,
  setClientsData,
  setModalOpen,
  setLoading,
}) => {
  const [formStatus, setFormStatus] = useState<AlertStatuses>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const initialValues: ClientsFormValues = {
    firstName: modalData?.first_name ? modalData.first_name : "",
    lastName: modalData?.last_name ? modalData.last_name : "",
    phoneNumber: modalData?.phone_number ? modalData.phone_number : "",
  };

  const handleFormSubmit = async (values: ClientsFormValues) => {
    try {
      setLoading(true);
      setFormStatus(null);
      setAlertMessage(null);

      const body = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
      };

      if (modalType === "create") {
        const newClient = await callApi<PostQueryCreateClientSnippet>({
          query: postQueryCreateClient(body),
        });

        if (newClient.success) {
          setClientsData((prev) => [...prev, newClient.data]);
          setFormStatus("success");
          setAlertMessage("Успешно създаден клиент!");
          setLoading(false);
          setModalOpen(false);
        }
      } else {
        if (!modalData) return;

        const updatedClient = await callApi<PostQueryUpdateClientSnippet>({
          query: postQueryUpdatedClient(modalData?._id, body),
        });

        if (updatedClient.success) {
          setClientsData((prev) =>
            prev.map((client) => {
              if (client._id === modalData._id) {
                return updatedClient.data;
              }
              return client;
            })
          );
          setFormStatus("success");
          setAlertMessage("Успешно обновен клиент!");
          setLoading(false);
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.log((err as Error).message);
      setFormStatus("error");
      setAlertMessage("Възникна грешка при създаването на клиент");
      setLoading(false);
    }
  };

  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      {!loading ? (
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={fieldValidation}
        >
          {({ handleSubmit, handleChange, touched, errors, values }) => (
            <Form
              style={{ width: "100%" }}
              onSubmit={handleSubmit}
              autoComplete="false"
            >
              <Stack spacing={3} mt={3}>
                <TextField
                  name="firstName"
                  label="Име"
                  error={touched["firstName"] && !!errors["firstName"]}
                  helperText={touched["firstName"] && errors["firstName"]}
                  onChange={handleChange}
                  value={values.firstName}
                  type="text"
                />

                <TextField
                  name="lastName"
                  label="Фамилия"
                  error={touched["lastName"] && !!errors["lastName"]}
                  helperText={touched["lastName"] && errors["lastName"]}
                  onChange={handleChange}
                  value={values.lastName}
                  type="text"
                />

                <TextField
                  name="phoneNumber"
                  label="Тел. Номер"
                  error={touched["phoneNumber"] && !!errors["phoneNumber"]}
                  helperText={touched["phoneNumber"] && errors["phoneNumber"]}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  type="phone"
                />

                <Button
                  message={modalType === "create" ? "Добави" : "Запази"}
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

export default ClientsForm;
