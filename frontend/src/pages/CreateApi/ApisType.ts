export type ServerInfoType = {
  serverUrl: string;
  rootUri: string;
  javaVersion: number;
  buildManagement: string;
  groupPackage: string;
  packageName: string;
  jarWar: string;
  springVersion: string;
};

export type ControllerType = {
  name: string;
  commonUri: string;
  apis: ApisType[];
};

export type ApisType = {
  name: string;
  uri: string;
  method: string;
  requestBody: DtoType;
  parameters: PropertiesType[] | [];
  query: DtoType;
  header: HeaderType[] | [];
  responses: ResponsesType;
};

export type DtoType = {
  name: string;
  type: string;
  properties: PropertiesType[];
  required: boolean;
};

export type PropertiesType = {
  name: string;
  type: string;
  required: boolean;
  properties: [] | PropertiesType;
};

export type HeaderType = {
  key: string;
  value: string;
};

export type ResponsesType = {
  fail: {
    status: number;
    type: string;
    required: boolean;
    properties: PropertiesType[];
  };
  success: {
    status: number;
    type: string;
    required: boolean;
    properties: PropertiesType[];
  };
};

export type DataType = {
  server: ServerInfoType;
  controller: ControllerType[];
};
