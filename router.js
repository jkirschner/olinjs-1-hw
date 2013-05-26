var querystring = require("querystring");

function route(handle, pathname) {
	console.log("Routing request for " + pathname + ".");
	if (typeof handle[pathname] === 'function') {
		handle[pathname]();
	} else {
		console.log("No request handler found for " + pathname + ".");
	}
	handle[pathname]
}

exports.route = route;
