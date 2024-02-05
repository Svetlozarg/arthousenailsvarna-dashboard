export type Event = {
  _id: string;
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  client_id: string;
  treatment: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetQueryAllEventsSnippet = {
  success: boolean;
  data: Event[];
};

export type GetQuerySingleEventSnippet = {
  success: boolean;
  data: Event;
};

export type PostQueryCreateEventSnippet = {
  success: boolean;
  data: Event;
};

export type PostQueryUpdateEventSnippet = {
  success: boolean;
  data: Event;
};

export type PostQueryDeleteEventSnippet = {
  success: boolean;
  message: string;
};
