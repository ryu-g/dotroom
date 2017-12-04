function draw(name,id){
	you = new Unit(name,id);
	var canvas = document.getElementById('canvas');
	console.log("hello,"+you.getName()+"!");

	function updatePosition(x,y){
		x = you.position.x;
		y = you.position.y;
		console.log(x,y);
	}
	function initUnit(x,y){
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(unitImage, x, y);
		you.moveDown(you);
		console.log("initialized")
	}
	function drawUnit(x,y){
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(unitImage, x, y);
	}

	if (canvas.getContext){
		var width = canvas.width;
		var height = canvas.height;
		var ctx = canvas.getContext('2d');
		//----仮置きのuserinfo----
		var unitImage= new Image();
		unitImage.src= you.looks.normal;
		var x = you.position.x;
		var y = you.position.y;
		//----
		initUnit(you.position.x,you.position.y);
		updatePosition(x,y);
		document.onkeydown = function (e){
			if(!e) e = window.event;
			var keyCode =e.keyCode;
			switch(keyCode){
				case 87:
				case 38:
				you.moveUp(you);
				drawUnit(you.position.x,you.position.y);
				break;

				case 65:
				case 37:
				you.moveLeft(you);
				drawUnit(you.position.x,you.position.y);
				break;

				case 83:
				case 40:
				you.moveDown(you);
				drawUnit(you.position.x,you.position.y);
				break;

				case 68:
				case 39:
				you.moveRight(you);
				drawUnit(you.position.x,you.position.y);
				break;
			}
			// console.log(you.position.x+","+you.position.y);
		}
	}

}
