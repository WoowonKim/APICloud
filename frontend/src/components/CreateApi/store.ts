import { Doc } from "yjs";
import { ControllerType } from "./../../pages/CreateApi/ApisType";
import syncedStore, { getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({
  data: [] as ControllerType[],
});

const doc = getYjsValue(store);

const webrtcProvider = new WebrtcProvider(
  "apiCloud",
  doc as Doc,
  {
    signaling: ["ws://localhost:4444"],
  } as any
);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
