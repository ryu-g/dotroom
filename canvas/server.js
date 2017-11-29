var app  = require('http');
var fs   = require('fs');
var path = require('path');
var io   = require('socket.io').listen(app);
var PORT = 1337;
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript"
  // 読み取りたいMIMEタイプはここに追記
};

var http_server = new app.createServer(function(req, res) {
  if (req.url == '/') {
    filePath = '/canvas.html';
  } else {
    filePath = req.url;
  }
  var fullPath = __dirname + filePath;

  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
    	console.log(err);
    } else {
    	res.end(data, 'UTF-8');
    }
  });
}).listen(PORT);
console.log(`Server running at http://localhost:/${PORT}`);

io.sockets.on('connection',function(socket){
  socket.on('login', function(data){
    socket.client_id = data.id;
    socket.client_pw = data.pw;
    console.log('login check unit ID: '+data.id+', unit pw: '+data.pw);
    io.sockets.emit('auth_from_server','['+socket.client_name+']:' +data.msg)
  });
  socket.on('signin', function(data){
    socket.client_id = data.name;
    socket.client_id = data.pw;
    console.log('unit ID: '+data.name+', unit name: '+data.pw);
    io.sockets.emit('auth_from_server','['+socket.client_name+']:' +data.msg)
  });
});