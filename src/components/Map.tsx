import { useCallback, useState } from "react";
import { GoogleMap } from "./GoogleMap";

export function Map() {
  const [err, setErr] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const handleClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
      },
      (error) => setErr(error.message)
    );
  }, []);

  const handleClose = useCallback(() => {
    setLat(null);
    setLon(null);
  }, []);

  if (err) {
    return <span style={{ color: "red" }}>{err}</span>;
  }

  if (lat && lon) {
    return (
      <>
        <button onClick={handleClose}>Close map</button>
        <hr />
        <GoogleMap lat={lat} lon={lon} />
      </>
    );
  }

  return (
    <>
      <button onClick={handleClick} type="button">
        Find point of interest
      </button>
    </>
  );
}
