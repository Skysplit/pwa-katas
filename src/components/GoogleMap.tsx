import {
  useJsApiLoader,
  GoogleMap as GoogleMapComponent,
  LoadScriptProps,
} from "@react-google-maps/api";

import { useEffect } from "react";

type Props = {
  lat: number;
  lon: number;
};

const googleMapsApiKey = process.env.REACT_APP_API_KEY ?? "";
const libraries: LoadScriptProps["libraries"] = ["places"];

export function GoogleMap({ lat, lon }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <>Loading...</>;
  }

  return (
    <GoogleMapComponent
      mapContainerStyle={{
        width: "500px",
        height: "500px",
      }}
      zoom={10}
      center={{ lat, lng: lon }}
      onLoad={(map) => {
        const maps = window.google.maps;
        const location = new maps.LatLng(lat, lon);
        const service = new maps.places.PlacesService(map);

        service.nearbySearch(
          {
            location,
            rankBy: maps.places.RankBy.DISTANCE,
            type: "tourist_attraction",
          },
          (results) => {
            const [place] = results;

            const marker = new maps.Marker({
              place: {
                location: place.geometry?.location,
                placeId: place.place_id,
              },
              title: place.name,
              label: place.name,
            });

            marker.setMap(map);
          }
        );
      }}
    />
  );
}
