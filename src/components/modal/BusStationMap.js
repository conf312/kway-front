import { Modal, Button }  from 'react-bootstrap';
import { Map, MapMarker } from "react-kakao-maps-sdk";

function BusStationMap(props) {
  return (
    <Modal
      {...props}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title className="ft-ckr-bold">지도</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map
          center={{ lat: props.lat, lng: props.lng }}
          style={{ width: "100%", height: "100%", minHeight:"80vh"}}
        >
          <MapMarker position={{ lat: props.lat, lng: props.lng }}>
          </MapMarker>
        </Map>
      </Modal.Body>
    </Modal>
  );
}

export default BusStationMap;