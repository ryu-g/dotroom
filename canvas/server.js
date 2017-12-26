var app = require('http').createServer(handler);
var fs  = require('fs');
var path= require('path');
var io  = require('socket.io').listen(app);
var jsonfile = require('jsonfile');
var PORT= 1337;
var mime = {//ここの記載がないとクライアント側ブラウザがcssとかjsとかを読み込めなくなる
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript"
};
var data = JSON.parse(fs.readFileSync('./units.json', 'utf8'));

app.listen(1337);//serverを待ち受け状態にするよ
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
  socket.on('emit_login', function(data){//-----login kokokara-----
    socket.client_id = data.unitId;
    socket.client_pw = data.unitPass;
    var usr = login(socket.client_id, socket.client_pw);
    if(usr!=0){
      io.sockets.emit('login_success_from_server',{id:usr[0],name:usr[1]} );
      console.log('id:'+usr[0] + ", name:" + usr[1]+" >> login successed");
    }else{
      io.sockets.emit('login_failed_from_server',{value:"err"});
      console.log("failed try again");
    }
  });//login kokomade --------

  socket.on('emit_signup', function(data){//sign in kokokara ---------
    socket.client_name = data.unitName;
    socket.client_pw = data.unitPass;
    var chk = signup(socket.client_name,socket.client_pw);
    if(chk!=0){
      io.sockets.emit('login_success_from_server',{id:chk[0],name:chk[1]});
    }else{
      io.sockets.emit('signup_failed_from_server',{value:"err"});
      console.log("failed try again");
    }
  });
});//sign in kokomade --------

login = function(id, password){
  console.log("try to login with "+id+","+password);
  // var data = JSON.parse(fs.readFileSync('./units.json', 'utf8'));
  var len = data.length;
  var target_id = id;
  var target_pw = password;
  var d = 3;
  for(var i = 0; i < len; i++) {
    console.log(data[i].id,data[i].pass);
    if(target_id == data[i].id){
      if(target_pw == data[i].pass){
        d = Array(data[i].id, data[i].name);
        // d = {"id": data[i].id, "name":data[i].name};
        console.log("returned:"+d);
        return d;
      }
    }
  }
  return 0;
}
signup = function(name,password){
  // var data = JSON.parse(fs.readFileSync('./units.json', 'utf8'));
  var len = data.length;
  var target_name = name;
  var target_pw = password;
  for(var i = 0; i < len; i++) {
    console.log("chacking name...["+data[i].name+"]");//新規名前がすでに存在しているかどうかの確認
    if(target_name == data[i].name){
      return 0;//already exist
    }
  }
  addData("SAMPLE",target_name,target_pw,data);
  console.log("new id and password is :"+target_name,target_pw,data);
  save(data);//ここのdataの形式あってる？
  return login("SAMPLE",target_pw);
}


function save(data){
jsonfile.writeFile('./units.json', data, {
    encoding: 'utf-8', 
    replacer: null, 
    spaces: 2
}, function (err) {});
}

function addData(newid,newname,newpass,data){
  var add = {
         id : newid,
         name : newname ,
         pass : newpass 
        }
  data.push(add);
}

function removeData(ID,data){
  var temp = data
  var newData = temp.filter(function(item, index){
    if (item.id != ID) return true;
  });
  temp = newData;
  return temp;
}
