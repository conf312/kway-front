import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bus_1 } from '../../images';
import * as AxiosUtil from '../../lib/AxiosUtil';


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
          if (e.msgBody.itemList !== null) {
            setStationList(e.msgBody.itemList);
          }
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
      behavior: 'smooth'
    });
  };
  
  function getDetail(stationNm, arsId, gpsY, gpsX, dist) {
    window.location.href = "/detail/" + stationNm + "/" + arsId + "/" + gpsY + "/" + gpsX + "/" + dist;
  }

  return (
    <>
      <div>
        <div>
          <img src={bus_1} alt="bus" className="m-3 mt-3" width="50px" height="50px"/>
          <span className="ft-ckr-bold" style={{fontSize:"25px"}}>주변 정류장</span>
        </div>
        <div className="container-fluid">
          {stationList.map((data, idx) => (
            <div className="card-div mt-2" key={idx} onClick={() => getDetail(data.stationNm, data.arsId, data.gpsY, data.gpsX, data.dist)}>
              <Card.Body className="card-body">
                <Card.Title className="ft-gm">{data.stationNm}</Card.Title>
                <Card.Subtitle className="ft-gm text-danger">{data.dist}m</Card.Subtitle>
              </Card.Body>
            </div>
          ))}
          {showTopButton && (
            <Button onClick={scrollToTop} className="fw-bold back-to-top">↑</Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Main;