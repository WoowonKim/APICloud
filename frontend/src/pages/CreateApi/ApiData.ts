import { ApisType, ControllerType, PropertiesType } from "./ApisType";
export const apiData: ApisType = {
  name: "",
  uri: "",
  method: "Get",
  requestBody: {
    dtoName: "",
    name: "",
    type: "Object",
    collectionType: "",
    properties: [],
    required: true,
  },
  parameters: [
    {
      dtoName: "",
      name: "",
      type: "String",
      required: true,
      properties: [],
      collectionType: "",
    },
  ],
  queries: [
    {
      dtoName: "",
      name: "",
      type: "String",
      required: true,
      properties: [],
      collectionType: "",
    },
  ],
  headers: [{ key: "", value: "" }],
  responses: {
    fail: {
      status: 400,
      responseBody: {
        dtoName: "",
        name: "",
        type: "String",
        collectionType: "",
        properties: [],
        required: true,
      },
    },
    success: {
      status: 200,
      responseBody: {
        dtoName: "",
        name: "",
        type: "String",
        collectionType: "",
        properties: [],
        required: true,
      },
    },
  },
};

export const controllerData: ControllerType = {
  name: "",
  commonUri: "",
  apis: [],
};

export const propertiesData: PropertiesType = {
  dtoName: "",
  name: "",
  type: "String",
  required: true,
  collectionType: "",
  properties: [],
};

export const responsesData = {
  fail: {
    status: 400,
    responseBody: {
      dtoName: "",
      name: "",
      type: "String",
      required: true,
      collectionType: "",
      properties: [],
    },
  },
  success: {
    status: 200,
    responseBody: {
      dtoName: "",
      name: "",
      type: "String",
      required: true,
      collectionType: "",
      properties: [],
    },
  },
};
