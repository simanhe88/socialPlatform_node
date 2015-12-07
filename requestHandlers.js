var querystring = require("querystring");

function start(request, response){
  console.log("Request handler 'start' was called.");
  var content ="empty";
  console.log('Request url: ' + request.url);
  var body ='<html>'+
	  '<head>'+
	  '<meta http-equiv="Content-Type" content="text/html; '+
	  'charset=UTF-8" />'+
	  '</head>'+
	  '<body>'+
	  '<form action="/upload" method="post">'+
	  '<textarea name="text" rows="20" cols="60"></textarea>'+
	  '<input type="submit" value="Submit text" />'+
	  '</form>'+
	  '</body>'+
	  '</html>';

  response.writeHead(200, {'Content-Type':'text/html'});
  response.write(body);
  response.end();
}

function upload(req, res){
  console.log("Request handler 'upload' was called.");
  var postData = "";
  req.setEncoding("utf8");
  req.addListener("data",function(postDataChunk){
    postData += postDataChunk;
    console.log("Received POST data chunk '" + postDataChunk +"'.");
  });
    
  req.addListener("end",function(){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write("You've sent the text: " + querystring.parse(postData).text);
    res.end();
  });
  
  console.log('Request url: ' + req.url);
  
}

function favicon(request, response){
  console.log('Request favicon');
  response.end();
}

function default404(request, response){
  console.log('Request 404');
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write("404 Not found");
  response.end();
}

exports.start = start;
exports.upload = upload;