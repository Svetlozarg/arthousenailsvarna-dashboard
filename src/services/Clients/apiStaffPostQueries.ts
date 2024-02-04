import { Query } from "../apiTypes";
import {
  PostQueryCreateClientInput,
  PostQueryUpdateClientInput,
} from "./apiStaffInputs";

export const postQueryCreateClient = (
  input: PostQueryCreateClientInput
): Query => ({
  endpoint: "/clients/create",
  method: "POST",
  variables: input,
});

export const postQueryUpdatedClient = (
  staffId: string,
  input: PostQueryUpdateClientInput
): Query => ({
  endpoint: `/clients/${staffId}`,
  method: "PUT",
  variables: input,
});

export const postQueryDeleteClient = (clientId: string): Query => ({
  endpoint: `/clients/${clientId}`,
  method: "DELETE",
});
