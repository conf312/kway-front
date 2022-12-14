import axios from 'axios';
import { Cookies } from "react-cookie";

const cookies = new Cookies();
axios.defaults.withCredentials = true;

export function send(method, url, param, type, callback) {
  if (url.indexOf("kway") > -1) {
    axios.defaults.headers.common['X-CLIENT-KEY'] = process.env.REACT_APP_X_CLIENT_KEY;
  } else {
    axios.defaults.headers.common['X-CLIENT-KEY'] = "";
  }
  
  if (method === "GET") {
      axios.get(url, param)
      .then(function (response) {
        console.log("==> axios GET then");
        callback (response.data);

        if (url.indexOf("/logout") > -1) {
          axios.defaults.headers.common['Authorization'] = "";
          cookies.remove("accessToken");
        }
      })
      .catch(function (error) {
        console.log("==> axios GET error");
        console.log(error);
      });
  } else if (method === "POST") {
      axios.post(url, param, { 
        headers: { "Content-Type": type === "json" ? "application/json" : "multipart/form-data" }
      })
      .then(function (response) {
        console.log("==> axios POST then");
        callback (response.data);
      })
      .catch(function (error) {
        console.log("==> axios POST error");
        console.log(error);
      });
  } else {
    console.log("==> AxiosUtil Type Error!");
  }
}

export async function asyncSend(method, url, param, type, callback) {
	if (url.indexOf("kway") > -1) {
    axios.defaults.headers.common['X-CLIENT-KEY'] = process.env.REACT_APP_X_CLIENT_KEY;
  } else {
    axios.defaults.headers.common['X-CLIENT-KEY'] = "";
  }
  const contentType = type === "json" ? "application/json" : "multipart/form-data";
  
  if (method === "GET") {
    try {
      const response = await axios.get(url, param);
      callback(response.data);
    } catch(err) {
      console.log("asyncSend GET Error =>>", err);
    }
  } else if (method === "POST") {
    try {
      const response = await axios.get(url, param, { headers: { "Content-Type": contentType }});
      callback(response.data);
    } catch(err) {
      console.log("asyncSend POST Error =>>", err);
    }
  }
}