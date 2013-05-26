var exec = require("child_process").exec;

function start(response) {
	console.log("Request handler 'start' was called.");
	response.write("Hello Start");
	response.end();
}

function upload(response) {
	console.log("Request handler 'upload' was called.");
	response.write("Hello Upload");
	response.end();
}

exports.start = start;
exports.upload = upload;
