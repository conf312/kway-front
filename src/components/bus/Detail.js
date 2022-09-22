import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import * as AxiosUtil from '../../lib/AxiosUtil';
import BusStationMap from '../modal/BusStationMap';
import { maps_1 } from '../../images';

function Detail() {
  const params = useParams();
  const [arsId, setArsId] = useState(null);
  const [stationNm, setStationNm] = useState(null);
  const [stationList, setStationList] = useState([]);
  const [modalBusMapShow, setModalBusMapShow] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    setArsId(params.arsId);
    setStationNm(params.stationNm);

    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('arsId') + '=' + encodeURIComponent(params.arsId);
    queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');

    AxiosUtil.send("GET", "/getSeoulStation/getLowStationByUid" + queryParams, "", "", (e) => {
      console.log(e)
      if (e.msgBody.itemList !== null) {
        setLat(e.msgBody.itemList[0].gpsY);
        setLng(e.msgBody.itemList[0].gpsX);
        setStationList(e.msgBody.itemList);
      }
    });
  }, []);

  function getModalBusMap() {
    setModalBusMapShow(true);
  }

  function GetBusRouteAbrv(props) {
    if (props.no.length === 3) {
      return (
        <Card.Title className="fw-bold text-primary">{props.no}</Card.Title>
      );
    } else if (props.no.length === 4) {
      return (
        <Card.Title className="fw-bold text-success">{props.no}</Card.Title>
      );
    } else {
      return (
        <Card.Title className="fw-bold">{props.no}</Card.Title>
      );
    }
  }

  return (
    <>
      <div className="container-fluid bg-gray">
        <br/>
        <div>
          <span className="fw-bold mb-2 text-muted">{arsId}</span><br/>
          <span className="fw-bold" style={{fontSize:"20px"}}>{stationNm}</span>
          <img src={maps_1} alt="maps" height="50px" width="60px" style={{margin:"-25px 0 0 15px", cursor:"pointer"}} onClick={() => getModalBusMap()}></img>
        </div>
        { stationList.length > 0 && 
          stationList.map((data, idx) => (
            <Card className="mt-2" key={idx}>
              <Card.Body>
                <GetBusRouteAbrv no={data.busRouteAbrv} />
                <Card.Subtitle className="fw-bold text-danger">{data.arrmsg1}</Card.Subtitle>
                <Card.Subtitle className="mt-1 text-muted">{data.arrmsg2}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))
        } 
        { stationList.length < 1 && 
          <Card className="mt-2">
            <Card.Body>
              <Card.Subtitle className="fw-bold text-danger">배차가 없습니다.</Card.Subtitle>
            </Card.Body>
          </Card>
        }
      </div>
      <BusStationMap
        show={modalBusMapShow}
        onHide={() => setModalBusMapShow(false)}
        lat={lat}
        lng={lng}
      />
    </>
  )
}

export default Detail;