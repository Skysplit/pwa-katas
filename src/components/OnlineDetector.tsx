import { useNetworkState } from "react-use";
import { OnlineIndicator } from "./OnlineIndicator";

export function OnlineDetector() {
  const { online } = useNetworkState();

  return <OnlineIndicator isOnline={online ?? false} />;
}
