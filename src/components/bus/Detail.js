import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { bus_blue, bus_green, bus_yellow } from '../../images';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import * as AxiosUtil from '../../lib/AxiosUtil';
import XMLParser from 'react-xml-parser';

function Detail() {
  const [arsId, setArsId] = useState(null);
  const [stationNm, setStationNm] = useState(null);
  const [stationList, setStationList] = useState([]);
  const [gstationList, setGstationList] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [dist, setDist] = useState(null);
  const params = useParams();
  
  useEffect(() => {
    setArsId(params.arsId);
    setStationNm(params.stationNm);
    setLat(params.gpsY);
    setLng(params.gpsX);
    setDist(params.dist);

    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
    if (params.stationId === "null") {
      queryParams += '&' + encodeURIComponent('arsId') + '=' + encodeURIComponent(params.arsId);
      queryParams += '&' + encodeURIComponent('resultType') + '=' + encodeURIComponent('json');
      AxiosUtil.send("GET", "/getSeoulStation/getLowStationByUid" + queryParams, "", "", (e) => {
        if (e.msgBody.itemList !== null) {
          setStationList(e.msgBody.itemList);
        }
      });
    } else {
      getBusApiCall();
    }
  }, []);

  function getBusApiCall() {
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
    queryParams += '&' + encodeURIComponent('stationId') + '=' + encodeURIComponent(params.stationId);
    AxiosUtil.send("GET", "/getBusarrivalservice/getBusArrivalList" + queryParams, "", "", (e) => {
      const dataArr = new XMLParser().parseFromString(e).children[2];
      let array = new Array();
      if (dataArr !== null) { 
        dataArr.children.forEach(function(item){
          var obj = new Object();
          item.children.forEach(function(detail){
            obj[detail.name] = detail.value;
            if (detail.name  === "routeId") {
              let queryParams2 = '?' + encodeURIComponent('serviceKey') + '=' + process.env.REACT_APP_SEOUL_STATION_SERVICE_KEY;
              queryParams2 += '&' + encodeURIComponent('routeId') + '=' + encodeURIComponent(detail.value);
              AxiosUtil.send("GET", "/getBusrouteservice/getBusRouteInfoItem" + queryParams2, "", "", (e) => {
                const dataArr = new XMLParser().parseFromString(e).children[2];
                if (dataArr !== null) { 
                  dataArr.children.forEach(function(item){
                    item.children.forEach(function(detail){
                      if (detail.name === "routeName") {
                        obj[detail.name] = detail.value;
                        array.push(obj);
                        console.log(obj)
                        setGstationList(array);
                      }
                    });
                  });
                }
              });
            }
          })
        })
      }
    });
  }

  function getDetailRoute(stationNo, busRouteId) {
    window.location.href = "/detail-route/" + stationNo + "/" + busRouteId;
  }

  function GetBusRouteAbrv(props) {
    if (props.no.length === 3) {
      return (
        <Card.Title>
          <img src={bus_blue} alt="bus_blue" width={25}></img>
          <span className="ft-gm fw-bold text-primary" style={{fontSize:"22px", marginLeft:"10px"}}>{props.no}</span>
          <span className="text-muted"> | </span>          
          <span className="ft-gm text-muted">{props.adirection} 방면</span>
        </Card.Title>
      );
    } else if (props.no.length === 4) {
      return (
        <Card.Title>
          <img src={bus_green} alt="bus_green" width={25}></img>  
          <span className="ft-gm text-success" style={{fontSize:"22px", marginLeft:"10px"}}>{props.no}</span>
          <span className="text-muted"> | </span>  
          <span className="ft-gm text-muted">{props.adirection} 방면</span></Card.Title>
      );
    } else {
      return (
        <Card.Title>
          <img src={bus_yellow} alt="bus_yellow" width={25}></img>  
          <span className="ft-gm" style={{fontSize:"22px", marginLeft:"10px"}}>{props.no}</span>
          <span className="text-muted"> | </span>  
          <span className="ft-gm text-muted"> | {props.adirection} 방면</span></Card.Title>
      );
    }
  }

  return (
    <>
      <div className="bg">
        <Map
          center={{ lat: lat, lng: lng }}
          style={{ width: "100%", height: "250px" }}>
          <MapMarker position={{ lat: lat, lng: lng }}></MapMarker>
        </Map>
        <div className="text-center mt-4">
          <h6 className="ft-gm text-muted">{arsId}</h6>
          <h4 className="ft-ckr-bold" style={{fontSize:"25px"}}>{stationNm}</h4>
          <h6 className="ft-gm text-danger">{dist}m</h6>
        </div>
        {stationList.length > 0 && 
          stationList.map((data, idx) => (
            <Card className="mt-3" key={idx} onClick={() => getDetailRoute(data.rtNm, data.busRouteId)}>
              <Card.Body>
                <GetBusRouteAbrv no={data.busRouteAbrv} adirection={data.adirection} />
                <Card.Subtitle className="ft-gm mt-3 text-danger">{data.arrmsg1}</Card.Subtitle>
                <Card.Subtitle className="ft-gm mt-2 text-muted">{data.arrmsg2}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))
        } 
        {gstationList.length > 0 &&
          gstationList.map((data, idx) => (
            <Card className="mt-3" key={idx} onClick={() => getDetailRoute(data.routeName, data.routeId)}>
              <Card.Body>
                <Card.Title>
                  <img src={bus_green} alt="bus_green" width={25}></img>  
                  <span className="ft-gm text-success" style={{fontSize:"22px"}}> {data.routeName}</span>
                  <span className="text-muted"> | </span>  
                  <span className="ft-gm text-muted">방면</span>
                </Card.Title>
                <Card.Subtitle className="ft-gm mt-3 text-danger">{data.predictTime1}분후[{data.locationNo1}번째 전]</Card.Subtitle>
                <Card.Subtitle className="ft-gm mt-2 text-muted">{data.predictTime2}분후[{data.locationNo2}번째 전]</Card.Subtitle>
              </Card.Body>
            </Card>
          ))
        } 
        {stationList.length < 1 && gstationList.length < 1 &&
          <Card className="mt-2">
            <Card.Body>
              <Card.Subtitle className="ft-gm text-danger">배차가 없습니다.</Card.Subtitle>
            </Card.Body>
          </Card>
        }
      </div>
    </>
  )
}

export default Detail;