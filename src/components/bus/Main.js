import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bus_1 } from '../../images';
import * as AxiosUtil from '../../lib/AxiosUtil';
import XMLParser from 'react-xml-parser';

function Main() {
  const [stationList, setStationList] = useState([]);
  const [gstationList, setGstationList] = useState([]);
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
        // queryParams += '&' + encodeURIComponent('tmX') + '=' + encodeURIComponent(127.0629685);
        // queryParams += '&' + encodeURIComponent('tmY') + '=' + encodeURIComponent(37.3278958);
        queryParams += '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('500');
        queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
        AxiosUtil.send("GET", "/getSeoulStation/getStationByPos" + queryParams, "", "", (e) => {
          if (e.msgBody.itemList !== null) {
            setStationList(e.msgBody.itemList);
          } else {
            let queryParams2 = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
            queryParams2 += '&' + encodeURIComponent('x') + '=' + encodeURIComponent(position.coords.longitude);
            queryParams2 += '&' + encodeURIComponent('y') + '=' + encodeURIComponent(position.coords.latitude);
            // queryParams2 += '&' + encodeURIComponent('x') + '=' + encodeURIComponent(127.0629685);
            // queryParams2 += '&' + encodeURIComponent('y') + '=' + encodeURIComponent(37.3278958);
            AxiosUtil.send("GET", "/getBusstationservice/getBusStationAroundList" + queryParams2, "", "", (e) => {
              const dataArr = new XMLParser().parseFromString(e).children[2];
              let array = new Array();
              if (dataArr !== null) { 
                dataArr.children.forEach(function(item){
                  var obj = new Object();
                  item.children.forEach(function(detail){
                    obj[detail.name] = detail.value;
                  });
                  array.push(obj);
                  setGstationList(array);
                });
              }
            });
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
  
  function getDetail(stationNm, arsId, gpsY, gpsX, dist, stationId) {
    window.location.href = "/detail/" + stationNm + "/" + arsId + "/" + gpsY + "/" + gpsX + "/" + dist + "/" + stationId;
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
            <div className="card-div mt-2" key={idx} onClick={() => getDetail(data.stationNm, data.arsId, data.gpsY, data.gpsX, data.dist, data.stationId)}>
              <Card.Body className="card-body">
                <Card.Title className="ft-gm">{data.stationNm}</Card.Title>
                <Card.Subtitle className="ft-gm text-danger">{data.dist}m</Card.Subtitle>
              </Card.Body>
            </div>
          ))}
          {gstationList.map((data, idx) => (
            <div className="card-div mt-2" key={idx} onClick={() => getDetail(data.stationName, data.mobileNo, data.y, data.x, data.distance, data.stationId)}>
              <Card.Body className="card-body">
                <Card.Title className="ft-gm">{data.stationName}</Card.Title>
                <Card.Subtitle className="ft-gm text-danger">{data.distance}m</Card.Subtitle>
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