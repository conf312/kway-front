import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import * as AxiosUtil from '../../lib/AxiosUtil';

function Detail() {
  const params = useParams();
  const [arsId, setArsId] = useState(null);
  const [stationNm, setStationNm] = useState(null);
  const [stationList, setStationList] = useState([]);
  useEffect(() => {
    setArsId(params.arsId);
    setStationNm(params.stationNm);
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('arsId') + '=' + encodeURIComponent(params.arsId);
    queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');

    AxiosUtil.send("GET", "/getSeoulStation/getLowStationByUid" + queryParams, "", "", (e) => {
      console.log(e)
      if (e.msgBody.itemList !== null) {
        setStationList(e.msgBody.itemList);
      }
    });
  }, []);

  function GetBusRouteAbrv(props) {
    if (props.no.length === 3) {
      return (
        <>
          <Card.Title className="fw-bold text-primary">{props.no}</Card.Title>
        </>
      );
    } else if (props.no.length === 4) {
      return (
        <>
          <Card.Title className="fw-bold text-success">{props.no}</Card.Title>
        </>
      );
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="mt-4">
          <h6 className="fw-bold mb-2 text-muted">{arsId}</h6>
          <h5 className="fw-bold">{stationNm}</h5>
          <p className="fw-bold" style={{fontSize:"17px"}}>지도</p>
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
    </>
  )
}

export default Detail;