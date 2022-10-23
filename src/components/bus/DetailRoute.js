import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import BusStationMap from '../modal/BusStationMap';
import * as AxiosUtil from '../../lib/AxiosUtil';

function DetailRoute() {
  const [stationRouteList, setStationRouteList] = useState([]);
  const [modalBusMapShow, setModalBusMapShow] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [totalRoute, setTotalRoute] = useState(null);
  const [routeType, setRouteType] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });

    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent(params.busRouteId);
    queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
    AxiosUtil.send("GET", "/getBusRouteInfo/getStaionByRoute" + queryParams, "", "", (e) => {
      if (e.msgBody.itemList !== null) {
        setStationRouteList(e.msgBody.itemList);
      }
    });

    let queryParams2 = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
    queryParams2 += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent(params.busRouteId);
    queryParams2 += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
    AxiosUtil.send("GET", "/getBusRouteInfo/getRouteInfo" + queryParams2, "", "", (e) => {
      if (e.msgBody.itemList !== null) {
        setTotalRoute(e.msgBody.itemList[0].stStationNm + " ↔ " + e.msgBody.itemList[0].edStationNm);
        //노선 유형 (1:공항, 2:마을, 3:간선, 4:지선, 5:순환, 6:광역, 7:인천, 8:경기, 9:폐지, 0:공용)
        switch(e.msgBody.itemList[0].routeType) {
          case "1" : return setRouteType("공항버스")
          case "2" : return setRouteType("마을버스")
          case "3" : return setRouteType("간선버스")
          case "4" : return setRouteType("지선버스")
          case "5" : return setRouteType("순환버스")
          case "6" : return setRouteType("광역버스")
          case "7" : return setRouteType("인천버스")
          case "8" : return setRouteType("경기버스")
          case "9" : return setRouteType("폐지버스")
          case "0" : return setRouteType("공용버스")
          default : return setRouteType("")
        }
      }
    });

  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  function getModalBusMap(gpsY, gpsX) {
    setLat(gpsY);
    setLng(gpsX);
    setModalBusMapShow(true);
  }

  function GetContainer() {
    let containerColor = "bg-etc";
    if (params.routeTypeCd !== "null") {
      let routeTypeCd = params.routeTypeCd;
      if (routeTypeCd === "12" || routeTypeCd === "22" || routeTypeCd === "42" || routeTypeCd === "52") {
        containerColor = "bg-blue";
      } else if (routeTypeCd === "11" || routeTypeCd === "14" || routeTypeCd === "16" || routeTypeCd === "21") {
        containerColor = "bg-red";
      } else if (routeTypeCd === "13" || routeTypeCd === "23" || routeTypeCd === "43" || routeTypeCd === "53") {
        containerColor = "bg-green";
      } else if (routeTypeCd === "30") {
        containerColor = "bg-yellow";
      }
    } else {
      if (params.stationNo.length === 3 ) {
        containerColor = "bg-blue";
      } else if (params.stationNo.length === 4) {
        containerColor = "bg-green";
      }
    }

    return (
      <>
        <div className={"container-fluid " + containerColor}>
          <br/>
          <div className="text-center">
            <h4 className="ft-gm" style={{fontSize:"17px", color:"white"}}>{routeType}</h4>
            <h4 className="ft-ckr-bold" style={{fontSize:"25px", color:"white"}}>{params.stationNo}</h4>
            <h4 className="ft-gm" style={{fontSize:"15px", color:"white"}}>{totalRoute}</h4>
          </div>
          {stationRouteList.length > 0 && 
            stationRouteList.map((data, idx) => (
              <Card className="mt-2" key={idx} onClick={() => getModalBusMap(data.gpsY, data.gpsX)}>
                <Card.Body>
                  <Card.Subtitle className="ft-gm mt-1">{data.stationNm}<span> ({data.stationNo})</span></Card.Subtitle>
                  <span className="ft-gm mt-1 text-primary">첫차 {data.beginTm}</span> ~ <span className="ft-gm mt-1 text-danger">막차 {data.lastTm}</span>
                </Card.Body>
              </Card>
            ))
          } 
          {stationRouteList.length < 1 && 
            <Card className="mt-2">
              <Card.Body>
                <Card.Subtitle className="ft-gm text-danger">배차가 없습니다.</Card.Subtitle>
              </Card.Body>
            </Card>
          }
          {showTopButton && (
            <Button onClick={scrollToTop} className="fw-bold back-to-top">↑</Button>
          )}
        </div>
        <BusStationMap
          show={modalBusMapShow}
          onHide={() => setModalBusMapShow(false)}
          lat={lat}
          lng={lng}
        />
      </>
    );
  }

  return (
    <GetContainer />
  )
}

export default DetailRoute;