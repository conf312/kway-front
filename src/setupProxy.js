const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/issuemoa", {
      target: "http://localhost:8000",
      pathRewrite: {
        '^/issuemoa': "",
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
};