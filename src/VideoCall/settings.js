import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "31dc1f2969c14f97882a45a3fc086709";
export const channelName = "Test";

export const config = { mode: "rtc", codec: "vp8", appId: appId };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();