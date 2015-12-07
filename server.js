var http = require('http');
var ports = [8888,8889];
var servers = [];
function start(route, handle){
  function onRequest(request, response){
    route(handle, request, response);
  }
  var s;
  ports.forEach(function(port){
    s = http.createServer(onRequest).listen(port);
    servers.push(s);
    console.log("Create server on " + port);
  });
  console.log("Server has started.");
}

exports.start = start;