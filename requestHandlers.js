var querystring = require("querystring");
var fs = require("fs");
var formidable = require('formidable');
var url = require('url');
var util = require('util');
var path = require('path');

function start(request, response){
  console.log("Request handler 'start' was called.");
  var content ="empty";
  console.log('Request url: ' + request.url);
  var body ='<html>'+
	  '<head>'+
	  '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
	  '</head>'+
	  '<body>'+
	  '<form action="/upload" enctype="multipart/form-data" method="post">'+
	  '<input type="file" name="upload">'+ 
	  '<input type="submit" value="Upload file" />'+
	  '</form>'+
	  '</body>'+
	  '</html>';

  response.writeHead(200, {'Content-Type':'text/html'});
  response.write(body);
  response.end();
}

function upload(req, res){
  console.log("Request handler 'upload' was called.");
//  var postData = "";
//  req.setEncoding("utf8");
//  req.addListener("data",function(postDataChunk){
//    postData += postDataChunk;
//    console.log("Received POST data chunk '" + postDataChunk +"'.");
//  });
//    
//  req.addListener("end",function(){
//    res.writeHead(200, {'Content-Type':'text/plain'});
//    res.write("You've sent the text: " + querystring.parse(postData).text);
//    res.end();
//  });
    var form =new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req,function(err, fields, files){
      //fs.renameSync(files.upload.path,"D:/temp.jpg");
    	var readStream = fs.createReadStream(files.upload.path);
    	var tempFileFullName = "D:/"+files.upload.name;
      var writeStream = fs.createWriteStream(tempFileFullName);
      util.pump(readStream, writeStream, function() {
        fs.unlinkSync(files.upload.path);
      });
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write("received image:<br/>");
      res.write("<img src='/show?filename="+tempFileFullName+"' />");
      res.end();
  });
  console.log('Request url: ' + req.url);
  
}


function show(req, res){
  console.log("Request handler 'show' was called.");
  var filename = url.parse(req.url,true).query.filename;
  var extname = path.extname(filename).substring(1);
  fs.readFile(filename,"binary", function(error, file){
      if(error){
        res.writeHead(500,{"Content-Type":"text/plain"});
        res.write(error +"\n");
        res.end();
      }else{
      	res.writeHead(200,{"Content-Type":"image/"+extname});
      	res.write(file,"binary");
      	res.end();
      }
    }
  );
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
exports.show = show;
exports.favicon = favicon;
exports.default404 = default404;