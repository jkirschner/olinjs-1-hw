var querystring = require("querystring");

function route(handle, pathname, response) {
	console.log("Routing request for " + pathname + ".");
	if (typeof handle[pathname] === 'function') {
		response.writeHead(200, {"Content-Type": "text/plain"});
		handle[pathname](response);
	} else {
		console.log("No request handler found for " + pathname + ".");
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 not found");
		response.end()
	}
}

exports.route = route;
