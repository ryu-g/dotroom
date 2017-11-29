function draw(){
	var canvas = document.getElementById('canvas');
	console.log("hello");
	if (canvas.getContext){
		var width = canvas.width;
		var height = canvas.height;
		var ctx = canvas.getContext('2d');
		//----仮置きのuserinfo----
		var unitImage= new Image();
		unitImage.src= "./unit/unit0001.png";
		var x = width/2;
		var y = height/2;
		//----
		var increase = 10;
		initUnit(x,y);
		drawUnit(x,y);
		document.onkeydown = function (e){
			if(!e) e = window.event;
			var keyCode =e.keyCode;
			switch(keyCode){
				case 87:
				case 38:
				y-= increase;
				drawUnit(x,y);
				break;

				case 65:
				case 37:
				x-= increase;
				drawUnit(x,y);
				break;

				case 83:
				case 40:
				y+= increase;
				drawUnit(x,y);
				break;

				case 68:
				case 39:
				x+= increase;
				drawUnit(x,y);
				break;
			}
			console.log(x+","+y)
		}
	}
	function initUnit(x,y){
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(unitImage, x, y);	
		console.log("initialized")
	}
	function drawUnit(x,y){
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(unitImage, x, y);
	}
}
