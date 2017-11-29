
var socket = io.connect();

document.onkeydown = function (e){
  if(!e) e = window.event;
  var keyCode =e.keyCode;
  switch(keyCode){
    case 87:
    y-=5;
    drawUnit(x,y);
    break;

    case 65:
    x-=5;
    drawUnit(x,y);
    break;

    case 83:
    y+=5;
    drawUnit(x,y);
    break;

    case 68:
    x+=5;
    drawUnit(x,y);
    break;
  }
  $(function(){
    document.onkeyDown(function(e){
      e.preventDefault();
      socket.json.emit('emit_from_client',
      {
        posX:x,
        posY:y
      }
      );
    });
    socket.on('emit_from_server',function(data){
      drawUnit(data);
    });
