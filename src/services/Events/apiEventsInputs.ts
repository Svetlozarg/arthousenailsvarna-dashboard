export type PostQueryCreateEventInput = {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  client_id: string;
  treatment: string;
  note: string;
};

export type PostQueryUpdateEventInput = {
  title: string;
  start: Date;
  end: Date;
  client_id: string;
  treatment: string;
  note: string;
};
