import { Doc } from "yjs";
import { ControllerType } from "./../../pages/CreateApi/ApisType";
import syncedStore, { getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

export const store = syncedStore({
  data: [] as ControllerType[],
});

const doc = getYjsValue(store);

export const connectDoc = (encryptedUrl: string) => {
  const webrtcProvider = new WebrtcProvider(
    encryptedUrl,
    doc as Doc,
    {
      signaling: ["wss://apiclouds.net/socket"],
    } as any
  );
};
// export const disconnect = () => webrtcProvider.disconnect();
// export const connect = () => webrtcProvider.connect();
