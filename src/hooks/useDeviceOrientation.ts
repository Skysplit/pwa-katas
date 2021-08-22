import { useEffect, useState } from "react";

function getPermissionsPromise(): Promise<PermissionState> {
  if (!("DeviceOrientationEvent" in window)) {
    return Promise.resolve("denied");
  }

  return (
    DeviceOrientationEvent.requestPermission?.() ?? Promise.resolve("granted")
  );
}

export function useDeviceOrientation() {
  const [x, setX] = useState<number | null>(90);
  const [y, setY] = useState<number | null>(0);
  const [z, setZ] = useState<number | null>(0);

  useEffect(() => {
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      setX(event.beta);
      setY(event.gamma);
      setZ(event.alpha);
    };

    getPermissionsPromise().then((state) => {
      if (state !== "granted") {
        return;
      }

      window.addEventListener(
        "deviceorientation",
        handleOrientationChange,
        true
      );
    });

    return () => {
      window.removeEventListener(
        "deviceorientation",
        handleOrientationChange,
        true
      );
    };
  }, []);

  return { x, y, z };
}
