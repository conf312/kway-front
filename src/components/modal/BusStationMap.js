import { Modal, Button }  from 'react-bootstrap';
import { Map, MapMarker } from "react-kakao-maps-sdk";

function BusStationMap(props) {
  return (
    <Modal
      {...props}
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title className="ft-ckr-bold" id="contained-modal-title-vcenter">지도</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Map
          center={{ lat: props.lat, lng: props.lng }}
          style={{ width: "100%", height: "500px" }}
        >
          <MapMarker position={{ lat: props.lat, lng: props.lng }}>
          </MapMarker>
        </Map>
      <Button href="#" variant="primary" className="w-100 mt-1" onClick={() => props.onHide()}>닫기</Button>
      </Modal.Body>
    </Modal>
  );
}

export default BusStationMap;