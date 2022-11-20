import { Doc } from "yjs";
import { ControllerType } from "./../../pages/CreateApi/ApisType";
import syncedStore, { getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({
  data: [] as ControllerType[],
});

const doc = getYjsValue(store);

const encryptedUrl = window.localStorage.getItem("docId");

export const webrtcProvider = new WebrtcProvider("apiclouds.net", doc as Doc);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
