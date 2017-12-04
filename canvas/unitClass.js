var Unit = function(name, id){
  this.name = name;
  // this.password = pw;
  this.id = id;
  this.position={
  	room : 0,
  	x    : 40,
  	y    : 40
  };
  this.looks = {
  	normal : "./unit/unit0001.png" //通常時の画像
   	// walking: //歩行時の画像
   };
};

Unit.prototype.getName = function(){
  return this.name;
};
Unit.prototype.changeName = function(usr,newName) {
  var oldName = usr.name;
  usr.name = newName;
  console.log("Unit name changed from "+oldName+" to "+newName); 
};

Unit.prototype.getID = function() {
	return this.id;
};
Unit.prototype.getPosition = function() {
  return this.position;
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
  drawUnit(x,y);//的な内容	
};
Unit.prototype.moveRoom = function(from,to) {
  setRoom
};

amigo = new Unit('amigo', '0000001', 'pass' );
//unit[] = new Unit('unit_name', 'unit_id', 'unit_password' );
console.log(amigo.getName());
