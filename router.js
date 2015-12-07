var url = require('url');

function route(handle, req, res){
  var pathname = url.parse(req.url).pathname;
  console.log("Request for "+ pathname +" received.");
  if(typeof handle[pathname]==='function'){
    return handle[pathname](req, res);
  }else{
    console.log('No request handler found for ' + pathname);
    return handle['404'](req, res);
  }
}

exports.route = route;