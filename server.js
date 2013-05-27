var http = require("http"),
	url = require("url");

var port_num = process.env.PORT || 8888;

function start(route, handle) {
	
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}
	
	http.createServer(onRequest).listen(port_num);
	console.log("Server started on port " + port_num);
	
}

exports.start = start;
