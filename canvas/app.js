var app = require('http').createServer(handler),
    io  = require('socket.io').listen(app),
    fs  = require('fs'),
    PORT= 1337;
var mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript"

  // 読み取りたいMIMEタイプはここに追記
};

app.listen(1337);
console.log(`Server running at http://localhost:/${PORT}`);
function handler(req,res){
  if (req.url == '/') {
    filePath = '/index.html';
  } else {
    filePath = req.url;
  }
  var fullpath = __dirname + '/canvas.html';
  fs.readFile(fullpath, function(err, data){
    if(err){
      res.writeHead(500);
      log("end with error");
      return res.end('Err');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}
io.sockets.on('connection',function(socket){
  socket.on('emit_from_client', function(data){
    socket.client_name = data.name;
    console.log('['+data.name+']:'+data.msg);
    //emit:接続しているSocketのみにイベントを発信している
    //on: "value", イベントを待っている
    //接続しているSocket以外全部のときは
    //socket.broadcast.emit
    // io.sockets.emit
    io.sockets.emit('emit_from_server','['+socket.client_name+']:' +data.msg)
  });
});