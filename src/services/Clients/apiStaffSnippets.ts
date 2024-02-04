export type Client = {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type GetQueryClientsSnippet = {
  success: boolean;
  data: Client[];
};

export type GetQueryClientSnippet = {
  success: boolean;
  data: Client;
};

export type PostQueryCreateClientSnippet = {
  success: boolean;
  data: Client;
};

export type PostQueryUpdateClientSnippet = {
  success: boolean;
  data: Client;
};

export type PostQueryDeleteClientSnippet = {
  success: boolean;
  message: string;
};
