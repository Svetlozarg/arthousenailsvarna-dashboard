import { Query } from "../apiTypes";

export const getQueryClientNotes = (clientId: string): Query => ({
  endpoint: `/notes/${clientId}/all`,
  method: "GET",
});
