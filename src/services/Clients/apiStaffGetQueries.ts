import { Query } from "../apiTypes";

export const getQueryClients: Query = {
  endpoint: `/clients/all`,
  method: "GET",
};

export const getQueryClient = (clientId: string): Query => ({
  endpoint: `/clients/${clientId}`,
  method: "GET",
});
