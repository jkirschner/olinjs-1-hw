var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

var imgfp = "/tmp/test.png";

function start(response, request) {
	
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" ' +
		'method="post">'+
		'<input type="file" name="upload" multiple="multiple">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';

	console.log("Request handler 'start' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	
	console.log("about to parse");
	
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		console.log("errors?:\n" + error);
		/* Possible error on Windows systems:
		 * tried to rename to an already existing file */
		fs.rename(files.upload.path, imgfp, function(err) {
			if (err) {
				console.log("fs rename error");
				fs.unlink(imgfp);
				fs.rename(files.upload.path, imgfp);
			}
		});
	});
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();
}

function show(response, request) {
	console.log("Request handler 'show' was called.");
	fs.readFile(imgfp, "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
