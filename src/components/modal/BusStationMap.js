import { Modal }  from 'react-bootstrap';
import { Map, MapMarker } from "react-kakao-maps-sdk";

function BusStationMap(props) {
  return (
    <Modal
      {...props}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">지도</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map
          center={{ lat: props.lat, lng: props.lng }}
          style={{ width: "100%", height: "500px" }}
        >
          <MapMarker position={{ lat: props.lat, lng: props.lng }}>
          </MapMarker>
        </Map>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default BusStationMap;