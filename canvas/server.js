var app = require('http').createServer(handler);
var fs  = require('fs');
var path= require('path');
var io  = require('socket.io').listen(app);
var PORT= 1337;
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript"
  // 読み取りたいMIMEタイプはここに追記
};

app.listen(1337);//seerverを待ち受け状態にするよ
console.log(`Server running at http://localhost:/${PORT}`);

function handler(req,res){
  fs.readFile(__dirname + '/canvas.html', function(err, data){
    if (req.url == '/') {
      filePath = '/canvas.html'; 
       } else {
      filePath = req.url;
      }
      var fullPath = __dirname + filePath;

    res.writeHead(200,{"Content-type":mime[path.extname(fullPath)] || "text/plain" });
    fs.readFile(fullPath, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.end(data, 'UTF-8');
    };
    res.end();
    })
  });
}

//socketですよ
io.sockets.on('connection',function(socket){
  socket.on('emit_login', function(data){
    socket.client_id = data.unitId;
    socket.client_pw = data.unitPass;
    console.log('login check unit ID: '+socket.client_id+', unit pass: '+socket.client_pw);
    // io.sockets.emit('auth_from_server','['+socket.client_name+']:' +data.msg)
  });
  socket.on('emit_signin', function(data){
    socket.client_name = data.unitName;
    socket.client_pw = data.unitPass;
    console.log('unit ID: '+socket.client_name+', unit pass: '+socket.client_pw);
    // io.sockets.emit('auth_from_server','['+socket.client_name+']:' +data.msg)
  });
});