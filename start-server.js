const express = require('express');
const http = require('http');

let expressApp = express();

expressApp.get('/get-cookie-test', function(request, response) {
	console.log(request.originalUrl, 'headers.cookie =>', request.headers.cookie);
	response.cookie('test', 'OK', {
		expires: new Date(1000 * 60 * 60 * 24 + Date.now()),
	});
	response.send('<html><body>'
		+ `<p>Cookie value: <span id="cookie-string">${request.headers.cookie}</span></p>`
		+ '<p>Ajax Cookie value: <span id="ajax-cookie-value">...</span></p>'
		+ '<script type="text/javascript">'
		+ '  setTimeout(async () => {'
		+ '    let resp = await fetch("/cookie-echo");'
		+ '    document.getElementById("ajax-cookie-value").innerText = await resp.text();'
		+ '  }, 0);'
		+ '</script>'
		+ '</body></html>'
	);
});

expressApp.get('/cookie-echo', function(request, response) {
	console.log(request.originalUrl, 'headers.cookie =>', request.headers.cookie);
	response.send(request.headers.cookie);
});

http.createServer(expressApp).listen(8880, function() {
	console.log(`App listening on HTTP to port 8880s`);
});

