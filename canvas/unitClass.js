var Unit = function(name, id){
  this.name = name;
  this.id = id;
  this.position={
  	room : 0,
  	x    : 0,
  	y    : 0
  };
  // this.looks = {
  // 	normal : //通常時の画像
  // 	walking: //歩行時の画像
  // };
};

Unit.prototype.getName = function(){
  return this.name;
};
Unit.prototype.getID = function() {
	return this.id;
};

Unit.prototype.moveDown = function(usr) {
  usr.position.y += 10;
  console.log(usr.position);
};
Unit.prototype.moveUp = function(usr) { 
  usr.position.y -= 10;
  console.log(usr.position);
};
Unit.prototype.moveRight = function(usr) {
  usr.position.x += 10;
  console.log(usr.position); 
};
Unit.prototype.moveLeft = function(usr) {
  usr.position.x -= 10;
  console.log(usr.position); 
};
Unit.prototype.disp = function(x,y) {
	canvas.img(x,y);//的な内容	
};

amigo = new Unit('amigo', '0000000');
console.log(amigo.getName());
