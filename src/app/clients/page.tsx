"use client";
import { useEffect, useState } from "react";
import Table from "@/components/MUIComponents/Table";
import { formatDate } from "@/helpers/helpers";
import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import PageHeader from "@/components/SmallComponents/PageHeader/PageHeader";
import Button from "@/components/MUIComponents/Button";
import Groups2Icon from "@mui/icons-material/Groups2";

const ClientsPage = () => {
  const [clientsData, setClientsData] = useState<any>([]);
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
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      setClientsData([]);
      setLoading(false);
    })();
  }, []);

  return (
    <Stack gap={4}>
      <PageHeader
        header="Клиенти"
        subheader="Всичко за вашите клиенти на едно място"
        icon={<Groups2Icon sx={{ fontSize: "2.5rem" }} />}
        action={<Button message="+ Добави Клиент" />}
      />

      <Table rows={clientsData} columns={columns} loading={loading} />
    </Stack>
  );
};

export default ClientsPage;
