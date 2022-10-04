const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/kway", {
      target: "http://localhost:8000",
      changeOrigin: true,
      pathRewrite: {
        '^/kway': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/getSeoulStation", {
      target: "http://ws.bus.go.kr/api/rest/stationinfo",
      changeOrigin: true,
      pathRewrite: {
        '^/getSeoulStation': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/getBusRouteInfo", {
      target: "http://ws.bus.go.kr/api/rest/busRouteInfo",
      changeOrigin: true,
      pathRewrite: {
        '^/getBusRouteInfo': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/getBusstationservice", {
      target: "http://apis.data.go.kr/6410000/busstationservice",
      changeOrigin: true,
      pathRewrite: {
        '^/getBusstationservice': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/getBusarrivalservice", {
      target: "http://apis.data.go.kr/6410000/busarrivalservice",
      changeOrigin: true,
      pathRewrite: {
        '^/getBusarrivalservice': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/getBusrouteservice", {
      target: "http://apis.data.go.kr/6410000/busrouteservice",
      changeOrigin: true,
      pathRewrite: {
        '^/getBusrouteservice': "",
      }
    })
  );
};