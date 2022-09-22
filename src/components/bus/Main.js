import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { bus_1 } from '../../images';
import * as AxiosUtil from '../../lib/AxiosUtil';

function getDetail(stationNm, arsId) {
  window.location.href = "/detail/" + stationNm + "/" + arsId;
}

function getDistanceFromLatLon(lat1,lng1,lat2,lng2) {
  function deg2rad(deg) {
      return deg * (Math.PI/180)
  }

  let R = 6378137; // Radius of the earth in meter
  let dLat = deg2rad(lat2-lat1);
  let dLon = deg2rad(lng2-lng1);
  let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c;
  return Math.round(d, 0);
}

function Main() {
  const [stationList, setStationList] = useState([]);
  useEffect(() => {
    if (navigator.geolocation) { // GPS 허용
      navigator.geolocation.getCurrentPosition(function(position) {
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
        queryParams += '&' + encodeURIComponent('tmX') + '=' + encodeURIComponent(position.coords.longitude);
        queryParams += '&' + encodeURIComponent('tmY') + '=' + encodeURIComponent(position.coords.latitude);
        queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('300');
        queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
    
        AxiosUtil.send("GET", "/getSeoulStation/getStationByPos" + queryParams, "", "", (e) => {
          let itemList = e.msgBody.itemList;
          itemList.forEach((data,idx) => {
            itemList[idx].distance = getDistanceFromLatLon(37.592252, 126.915752, data.gpsY, data.gpsX);
          })
          setStationList(itemList);
        });
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS 기능을 허용해주세요.');
    }
  }, []);

  return (
    <>
      <div className="container-fluid bg-gray">
        <br/>
        <div>
          <img src={bus_1} alt="bus" width="50px" height="50px"/>
          <span className="fw-bold" style={{fontSize:"20px"}}>주변 정류장</span>
        </div>
        {stationList.map((data, idx) => (
          <Card className="mt-3" key={idx} onClick={() => getDetail(data.stationNm, data.arsId)}>
            <Card.Body>
              <Card.Title>{data.stationNm}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{data.adirection}</Card.Subtitle>
              <Card.Subtitle className="fw-bold text-danger text-end">{data.distance}m</Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Main;