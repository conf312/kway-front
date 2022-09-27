import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bus_1 } from '../../images';
import * as AxiosUtil from '../../lib/AxiosUtil';

function getDetail(stationNm, arsId, gpsY, gpsX) {
  window.location.href = "/detail/" + stationNm + "/" + arsId + "/" + gpsY + "/" + gpsX;
}

function Main() {
  const [stationList, setStationList] = useState([]);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });
    if (navigator.geolocation) { // GPS 허용
      navigator.geolocation.getCurrentPosition(function(position) {
        let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
        queryParams += '&' + encodeURIComponent('tmX') + '=' + encodeURIComponent(position.coords.longitude);
        queryParams += '&' + encodeURIComponent('tmY') + '=' + encodeURIComponent(position.coords.latitude);
        queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('300');
        queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
    
        AxiosUtil.send("GET", "/getSeoulStation/getStationByPos" + queryParams, "", "", (e) => {
          console.log(e)
          setStationList(e.msgBody.itemList);
        });
      }, function(error) {
        console.error(error);
      });
    } else {
      alert('GPS 기능을 허용해주세요.');
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  return (
    <>
      <div className="container-fluid bg-gray">
        <br/>
        <div>
          <img src={bus_1} alt="bus" width="50px" height="50px"/>
          <span className="fw-bold" style={{fontSize:"20px"}}>주변 정류장</span>
        </div>
        {stationList.map((data, idx) => (
          <Card className="mt-3" key={idx} onClick={() => getDetail(data.stationNm, data.arsId, data.gpsY, data.gpsX)}>
            <Card.Body>
              <Card.Title>{data.stationNm}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{data.adirection}</Card.Subtitle>
              <Card.Subtitle className="fw-bold text-danger text-end">{data.dist}m</Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
        {showTopButton && (
          <Button onClick={scrollToTop} className="fw-bold back-to-top">↑</Button>
        )}
      </div>
    </>
  )
}

export default Main;