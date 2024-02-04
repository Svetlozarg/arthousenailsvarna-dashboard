import { Query } from "../apiTypes";
import {
  PostQueryCreateNoteInput,
  PostQueryUpdateNoteInput,
} from "./apiNotesInputs";

export const postQueryCreateNote = (
  input: PostQueryCreateNoteInput
): Query => ({
  endpoint: "/notes/create",
  method: "POST",
  variables: input,
});

export const postQueryUpdatedNote = (
  noteId: string,
  input: PostQueryUpdateNoteInput
): Query => ({
  endpoint: `/notes/${noteId}`,
  method: "PUT",
  variables: input,
});

export const postQueryDeleteNote = (noteId: string): Query => ({
  endpoint: `/notes/${noteId}`,
  method: "DELETE",
});
