const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://m.track1.site',
    createProxyMiddleware({
      target: 'https://d19ot9c0ybvi5o.cloudfront.net',
      changeOrigin: true,
    })
  );
  app.use(
    'http://localhost:3000',
    createProxyMiddleware({
      target: 'https://d19ot9c0ybvi5o.cloudfront.net',
      changeOrigin: true,
    })
  );
};
