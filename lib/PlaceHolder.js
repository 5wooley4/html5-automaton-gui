function PlaceHolder(options){
	this.geo = new Kinetic.Group({
		draggable: true
	});
	this.circle = new Kinetic.Circle({
		x: 0,
		y: 0,
		radius: 20,
		stroke: 'black',
		fill: "blue",
		strokeWidth: 4,
		opacity: .8
		//draggable: true
    });
	this.geo.add(this.circle);
	this.txt = new Kinetic.Text({
		x: 0,
		y: 0,
		text: "",
		fontSize: 30,
		fill: "black"
	});
	this.txt.setPosition(
		0 - this.txt.getWidth() / 2,// x
		0 - this.txt.getHeight() / 2// y
	)
	this.geo.add(this.txt);
	this.Char = "";
	this.setChar = function(c){
		this.Char = c;
		this.txt.setText(c);
		var pos = this.circle.getPosition();
		this.txt.setPosition(
			pos.x - this.txt.getWidth() / 2,// x
			pos.y - this.txt.getHeight() / 2// y
		);
		placeholder_layer.draw();
	}; 
	this.setPosition = function(x, y){
		this.txt.setPosition(
			x - this.txt.getWidth() / 2,// x
			y - this.txt.getHeight() / 2// y
		);
		this.circle.setPosition(x, y);
		placeholder_layer.draw();
	};
	this.animateTo = function(x, y, speed){
		//var currentPos = this.circle.getAbsolutePosition();
		var tween = new Kinetic.Tween({
			node: this.geo,
	        x:  x,
	        y:  y,
	        rotation: 0,
	        duration: Number(speed)
		});
		tween.play();
	};
};