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
    // console.log('login check unit ID: '+socket.client_id+', unit pass: '+socket.client_pw);
    // console.log(login(socket.client_id, socket.client_pw));
    usr = login(socket.client_id, socket.client_pw);
    if(usr!=0){
      io.sockets.emit('login_success_from_server',{id:usr[0],name:usr[1]} );
      console.log('id:'+usr[0] + ", name:" + usr[1]+" >> login successed");
    // io.sockets.emit('auth_from_server','['+socket.client_id+']:' +data.msg)
    }else{
      io.sockets.emit('login_failed_from_server',{value:"err"});
      console.log("failed try again");
    }
  });
  // socket.on('emit_signin', function(data){
  //   socket.client_name = data.unitName;
  //   socket.client_pw = data.unitPass;
  //   console.log('unit ID: '+socket.client_name+', unit pass: '+socket.client_pw);
  //   // io.sockets.emit('auth_from_server','['+socket.client_name+']:' +data.msg)
  // });
});

login = function(id, password){

  var data = JSON.parse(fs.readFileSync('./units.json', 'utf8'));
  var len = data.length;
  var target_id = id;
  var target_pw = password;
  var d = 1;
  for(var i = 0; i < len; i++) {
    console.log(data[i].id,data[i].pass);
    if(target_id == data[i].id){
      if(target_pw == data[i].pass){
        d = Array(data[i].id, data[i].name);
        // d = {"id": data[i].id, "name":data[i].name};
        console.log(d);
        return d;
      }
    }
  }
  return 0;
}