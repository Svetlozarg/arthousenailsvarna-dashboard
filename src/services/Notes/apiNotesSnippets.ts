export type Note = {
  _id: string;
  client_id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GetQueryClientNotesSnippet = {
  success: boolean;
  data: Note[];
};

export type PostQueryCreateNoteSnippet = {
  success: boolean;
  data: Note;
};

export type PostQueryUpdateNoteSnippet = {
  success: boolean;
  data: Note;
};

export type PostQueryDeleteNoteSnippet = {
  success: boolean;
  message: string;
};
