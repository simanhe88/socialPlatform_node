var exec = require("child_process").exec;

function start(request, response){
  console.log("Request handler 'start' was called.");
  var content ="empty";
  console.log('Request url: ' + request.url);
  exec("ls -lah",function(error, stdout, stderr){
    content = stdout;
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write(content);
    response.end();
  });
}

function upload(request, response){
  console.log("Request handler 'upload' was called.");
  var content ="empty";
  console.log('Request url: ' + request.url);
  exec("ls -lah",function(error, stdout, stderr){
    content = stdout;
    response.writeHead(200, {'Content-Type':'text/plain'});
    response.write(content);
    response.end();
  });
}

function favicon(request, response){
  
  response.end();
}

function default404(request, response){
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write("404 Not found");
  response.end();
}

exports.start = start;
exports.upload = upload;