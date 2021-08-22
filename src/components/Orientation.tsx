import { useDeviceOrientation } from "../hooks/useDeviceOrientation";

export function Orientation() {
  const { x, y, z } = useDeviceOrientation();

  return (
    <div>
      <p>
        Your device angle X: <strong>{x}</strong>&deg;
      </p>
      <p>
        Your device angle Y: <strong>{y}</strong>&deg;
      </p>
      <p>
        Your device angle Z: <strong>{z}</strong>&deg;
      </p>
    </div>
  );
}
