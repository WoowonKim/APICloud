import syncedStore, { getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

type ApiDoc = { url: String; details: [] };

export const store = syncedStore({ apis: [] as ApiDoc[] });

const doc = getYjsValue(store);
const webrtcProvider = new WebrtcProvider("syncedTest", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
