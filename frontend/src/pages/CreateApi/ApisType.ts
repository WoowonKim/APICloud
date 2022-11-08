export type ServerInfoType = {
  bootVersion: string;
  type: "maven-project" | "gradle-project";
  language: "java";
  baseDir: string; // 프로젝트 zip 파일 이름
  groupId: string; // com.example
  artifactId: string; // ===> 대부분 name이랑 같아서 뺄 수도.
  name: string;
  description: string; // ===> 빼도 됨
  packageName: string; // 전체 패키지 이름: com.example.demo
  packaging: string; // jar, war
  javaVersion: string; // 자바버전 string값 ( ex. 17, 1.8)
  dependencies: [];
};

export type RequestTypeInfo = {
  controllers: ControllerType[];
  server: {};
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
  parameters: PropertiesType[];
  queries: PropertiesType[];
  headers: HeadersType[];
  responses: ResponsesType;
};

export type DtoType = {
  dtoName: string;
  name: string;
  type: string;
  collectionType: string; // List, Map, Set
  properties: PropertiesType[];
  required: boolean;
};

export type PropertiesType = {
  dtoName: string;
  name: string;
  type: string;
  required: boolean;
  collectionType: string;
  properties: PropertiesType[];
};

export type HeadersType = {
  key: string;
  value: string;
};

export type ResponsesType = {
  fail: {
    status: number;
    responseBody: DtoType;
  };
  success: {
    status: number;
    responseBody: DtoType;
  };
};

export type DataType = {
  controllers: ControllerType[];
};

export type RequestBodyType = {
  collectionType: string;
  dtoName: string;
  name: string;
  properties: PropertiesType[];
  type: string;
  required: boolean;
};
