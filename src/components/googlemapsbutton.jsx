import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "600px" };
const defaultCenter = { lat: 6.9271, lng: 79.8612 }; // Colombo
const libraries = ["places"];

export default function BoardimakMap() {
  const [places, setPlaces] = useState([]); // { id, title, rent, room_type, position, thumbnail_url }
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Fit map to markers
  const fitBoundsToPlaces = (placesWithPos) => {
    if (!mapRef.current || !placesWithPos.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    placesWithPos.forEach((p) => bounds.extend(p.position));
    mapRef.current.fitBounds(bounds);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch("http://localhost:5000/places");
        if (!res.ok) throw new Error("Failed to fetch places");

        const data = await res.json(); // already has `position` from backend
        const withPos = data.filter((p) => p.position); // only keep resolved ones

        setPlaces(withPos);
        if (withPos.length) fitBoundsToPlaces(withPos);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };

    fetchPlaces();
  }, []);

  if (loadError) return <div>Map failed to load: {String(loadError)}</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={places.length ? places[0].position : defaultCenter}
        onLoad={onMapLoad}
      >
        {places.map((p) =>
          p.position ? (
            <Marker
              key={p.id}
              position={p.position}
              onClick={() => setSelected(p)}
              icon={
                p.thumbnail_url
                  ? {
                      url: p.thumbnail_url,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }
                  : undefined
              }
            />
          ) : null
        )}

        {selected && selected.position && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ minWidth: 200 }}>
              <h3 style={{ margin: 0 }}>{selected.title || "Boarding place"}</h3>
              <p style={{ margin: "4px 0" }}>
                <strong>Type:</strong> {selected.room_type || "—"}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Rent:</strong>{" "}
                {selected.rent != null ? `Rs. ${selected.rent}` : "—"}
              </p>
              <a
                href={selected.resolvedUrl || selected.map_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
