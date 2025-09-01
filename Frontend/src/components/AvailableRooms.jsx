// import { useEffect , useState } from "react";
// import axios from "axios";
// import {APIProvider , Map} from '@vis.gl/react-google-maps'
// import { AdvancedMarker , Pin } from "@vis.gl/react-google-maps";



// const AvailableRooms = () => {
//   const [Coords, setCoords] = useState({lat : 0, lng : 0})
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/addressCoordinates", {
//           withCredentials: true
//         });
//         console.log(response.data);
//         console.log(response.data.latitude + " " + response.data.longitude);

//         setCoords({lat : response.data.latitude , lng :  response.data.longitude})
//       } catch (error) {
//         if (error.response) {
//           alert(error.response.data.error || "something is fishy");
//           console.error(error);
//         }
//       }
//     };


//     fetchRooms();
//   }, []);

//   return (

//       <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//     <Map
                
//       style={{width: '800px', height: '600px', border: '2px solid red'}}
//       center={{lat: Coords.lat, lng: Coords.lng}}
//       zoom={15}

//       zoomControl={true}
//       fullscreenControl={false}
//       scrollwheel={true}
//       disableDoubleClickZoom={false}
//       gestureHandling={'greedy'}
//       mapId={import.meta.env.VITE_GOOGLE_MAP_ID}

//     >
//       <AdvancedMarker position={{ lat: Coords.lat, lng: Coords.lng }}>
//         <Pin background="red" glyphColor="#000" borderColor="#000" />
//       </AdvancedMarker>
//     </Map>
//   </APIProvider>
// )
// };

// export default AvailableRooms;
import { useEffect, useState } from "react";
import axios from "axios";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const AvailableRooms = () => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/addressCoordinates",
          { withCredentials: true }
        );

        console.log("Fetched coords:", response.data);

        setCoords({
          lat: response.data.latitude,
          lng: response.data.longitude,
        });
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error || "something is fishy");
          console.error(error);
        }
      }
    };

    fetchRooms();
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ width: "60vw", height: "60vh", margin: "12rem auto" }}>
        <Map
          key={`${coords.lat}-${coords.lng}`}
          style={{ width: "100%", height: "100%", border: "2px solid red" }}
          defaultCenter={{ lat: coords.lat, lng: coords.lng }}
          defaultZoom={18}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          
  options={{
    gestureHandling: "greedy",

    fullscreenControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
  }}
        >
          <AdvancedMarker position={{ lat: coords.lat, lng: coords.lng }}>
            <Pin background="red" glyphColor="#000" borderColor="#000" />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default AvailableRooms;
