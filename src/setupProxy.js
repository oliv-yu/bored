const createProxyMiddleware = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/v3/businesses/search',
		createProxyMiddleware({
			target: 'https://api.yelp.com',
			changeOrigin: true,
		})
	)
}
