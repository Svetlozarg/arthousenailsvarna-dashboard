"use client";
import { useEffect, useState } from "react";
import Table from "@/components/MUIComponents/Table";
import { formatDate } from "@/helpers/helpers";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import Button from "@/components/MUIComponents/Button";
import Groups2Icon from "@mui/icons-material/Groups2";
import Modal from "@/components/MUIComponents/Modal";
import Dialog from "@/components/MUIComponents/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClientsForm from "@/components/PageComponents/Clients/ClientsForm";
import DescriptionIcon from "@mui/icons-material/Description";
import ClientNotes from "@/components/PageComponents/Clients/ClientNotes";
import { getQueryClients } from "@/services/Clients/apiStaffGetQueries";
import {
  Client,
  GetQueryClientsSnippet,
  PostQueryDeleteClientSnippet,
} from "@/services/Clients/apiStaffSnippets";
import { callApi } from "@/services/callApi";
import { signOut } from "@/services/Auth/auth";
import { postQueryDeleteClient } from "@/services/Clients/apiStaffPostQueries";

export type ModalType = "create" | "edit" | "notes";
export type ModalDataType = {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

const ClientsPage = () => {
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [modalData, setModalData] = useState<ModalDataType>();
  const [modalType, setModalType] = useState<ModalType>("create");
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "Име",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Фамилия",
      width: 150,
    },
    {
      field: "phone_number",
      headerName: "Телефон",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Дата на вписване",
      width: 180,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return formatDate(params.value);
      },
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            {/* Notes */}
            <Tooltip
              title="Бележки"
              onClick={() => {
                setModalData({
                  _id: params.row._id,
                  first_name: params.row.first_name,
                  last_name: params.row.last_name,
                  phone_number: params.row.phone_number,
                });
                setModalOpen(true);
                setModalType("notes");
              }}
            >
              <IconButton>
                <DescriptionIcon color="info" />
              </IconButton>
            </Tooltip>
            {/* Edit */}
            <Tooltip
              title="Промени"
              onClick={() => {
                setModalData({
                  _id: params.row._id,
                  first_name: params.row.first_name,
                  last_name: params.row.last_name,
                  phone_number: params.row.phone_number,
                });
                setModalOpen(true);
                setModalType("edit");
              }}
            >
              <IconButton>
                <EditIcon sx={{ color: "#FFA319" }} />
              </IconButton>
            </Tooltip>

            {/* Delete */}
            <Tooltip title="Изтрий">
              <Dialog
                icon={<DeleteIcon sx={{ color: "#FF1943" }} />}
                buttonText="Изтрий"
                dialogTitle={`Изтриване на клиент ${params.row.first_name} ${params.row.last_name}`}
                dialogDescription="Сигурни ли сте, че искате да изтриете този клиент?"
                onConfirm={() => handleDeleteClient(params.row._id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const clientsData = await callApi<GetQueryClientsSnippet>({
          query: getQueryClients,
        });

        if (clientsData.success) {
          setClientsData(clientsData.data);
          setLoading(false);
        } else {
          signOut();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDeleteClient = async (clientId: string) => {
    setLoading(true);
    try {
      const deletedClient = await callApi<PostQueryDeleteClientSnippet>({
        query: postQueryDeleteClient(clientId),
      });

      if (deletedClient.success) {
        setClientsData((prev) =>
          prev.filter((client) => client._id !== clientId)
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Stack gap={4}>
      <PageHeader
        header="Клиенти"
        subheader="Всичко за вашите клиенти на едно място"
        icon={<Groups2Icon sx={{ fontSize: "2.5rem" }} />}
        action={
          <Button
            message="+ Добави Клиент"
            onClick={() => {
              setModalData(undefined);
              setModalType("create");
              setModalOpen(true);
            }}
          />
        }
      />

      <Table rows={clientsData} columns={columns} loading={loading} />

      <Modal
        modalTitle={
          modalType === "create"
            ? "Добави Клиент"
            : modalType === "edit"
            ? "Промени Клиент"
            : `Бележки за ${modalData?.first_name} ${modalData?.last_name}`
        }
        open={openModal}
        setOpen={setModalOpen}
      >
        {modalType === "notes" && modalData ? (
          <ClientNotes modalData={modalData} />
        ) : (
          <ClientsForm
            modalData={modalData}
            modalType={modalType}
            loading={loading}
            setClientsData={setClientsData}
            setModalOpen={setModalOpen}
            setLoading={setLoading}
          />
        )}
      </Modal>
    </Stack>
  );
};

export default ClientsPage;
