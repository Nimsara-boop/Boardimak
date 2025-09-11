import React from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width:"100%", height:"600px"};
const defaultCenter = {lat: 6.9271, lng: 79.8612}; // Centered at Colombo, Sri Lanka
const libraries = ["places"];


function parseLatLngFromGoogleMapUrl(url){
    try{
        const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (atMatch){
            return {lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2])};
        }
    try {
      const u = new URL(url);
      const q = u.searchParams.get("q");
      if (q) {
        const parts = q.split(",");
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          return { lat: parseFloat(parts[0]), lng: parseFloat(parts[1]) };
        }
      }

      // try /place/<name> to get a readable name for geocoding
      const placeMatch = u.pathname.match(/\/place\/([^/]+)/);
      if (placeMatch) {
        const name = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
        return { query: name };
      }
    } catch (_) {
      // URL constructor might fail on some short urls; fallback below
    }

    // fallback: maybe whole url contains a visible lat,lng somewhere:
    const latlngMatch = url.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
    if (latlngMatch) {
      return { lat: parseFloat(latlngMatch[1]), lng: parseFloat(latlngMatch[2]) };
    }

    // last resort: return original url as a query for geocoding or server resolve
    return { query: url };
  } catch (err) {
    return { query: url };
  }
}

function geocodeQuery(query) {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) return reject("Google maps not loaded");
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const loc = results[0].geometry.location;
        resolve({ lat: loc.lat(), lng: loc.lng() });
      } else {
        reject(status || "NO_RESULTS");
      }
    });
  });
}


// ----------------- main component -----------------
export default function BoardimakMap() {
  const [places, setPlaces] = useState([]); // { id, map_url, title, rent, room_type, position, thumbnail_url }
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
    // fetch from supabase and resolve positions
    const fetchPlacesAndResolve = async () => {
      try {
        // adjust selected fields to the actual column names in your table:
        const { data, error } = await supabase
          .from("boardimak_places")
          .select("id,map_url,title,room_type,rent,thumbnail_url");

        if (error) throw error;
        if (!data) return;

        // Wait until maps script loaded to geocode fallback queries
        if (!isLoaded) {
          // if not yet loaded, wait for maps to load (effect will re-run)
          setPlaces(
            data.map((r) => ({ ...r, position: null })) // placeholder
          );
          return;
        }

        // resolve all locations in parallel
        const resolved = await Promise.all(
          data.map(async (row) => {
            const parsed = parseLatLngFromGoogleMapsUrl(row.map_url || "");
            try {
              if (parsed.lat && parsed.lng) {
                return { ...row, position: { lat: parsed.lat, lng: parsed.lng } };
              } else if (parsed.query) {
                // geocode the query (place name or whole url)
                const pos = await geocodeQuery(parsed.query);
                return { ...row, position: pos };
              } else {
                return { ...row, position: null };
              }
            } catch (err) {
              // couldn't geocode — keep position null and skip marker
              console.warn("Could not resolve:", row.map_url, err);
              return { ...row, position: null };
            }
          })
        );

        const withPos = resolved.filter((r) => r.position); // only items with position
        setPlaces(withPos);
        if (withPos.length) fitBoundsToPlaces(withPos);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };

    fetchPlacesAndResolve();
  }, [isLoaded]); // re-run after maps script is loaded

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
        {places.map((p) => (
          <Marker
            key={p.id}
            position={p.position}
            onClick={() => setSelected(p)}
            // custom icon (optional). You can use p.thumbnail_url or provide a static custom image
            icon={
              p.thumbnail_url
                ? {
                    url: p.thumbnail_url,
                    scaledSize: new window.google.maps.Size(40, 40), // adjust to taste
                  }
                : undefined
            }
          />
        ))}

        {selected && selected.position && (
          <InfoWindow position={selected.position} onCloseClick={() => setSelected(null)}>
            <div style={{ minWidth: 200 }}>
              <h3 style={{ margin: 0 }}>{selected.title || "Boarding place"}</h3>
              <p style={{ margin: "4px 0" }}><strong>Type:</strong> {selected.room_type || "—"}</p>
              <p style={{ margin: "4px 0" }}><strong>Rent:</strong> {selected.rent != null ? `Rs. ${selected.rent}` : "—"}</p>
              <a href={selected.map_url} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}