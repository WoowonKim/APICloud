import { Doc } from "yjs";
import { ControllerType } from "./../../pages/CreateApi/ApisType";
import syncedStore, { getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({
  data: [] as ControllerType[],
});

const doc = getYjsValue(store);

const webrtcProvider = new WebrtcProvider("syncedStore", doc as Doc);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
