/******** Project - Fianl *********************************
	Authors: Eric Wooley, Tandra Felly, Lauryn Laudermilk
	Description: Gesture recognition.
**********************************************************/

function canvas_gestures(obj){

	var stage = obj.stage;
	var layer = obj.preview;
	var whiteboard = obj.whiteboard;


	var object_manager = {};
	// a flag we use to see if we're dragging the mouse
	var isMouseDown=false;
    // a reference to the line we are currently drawing
    var line;
    // a reference to the array of points making newline
    var points=[];

    whiteboard.on('mousedown', function(){
    	isMouseDown = true;
        points=[];
        points.push(stage.getMousePosition());
        line = new Kinetic.Line({
            points: points,
            stroke: "green",
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round'
        });
        layer.add(line);
        console.log("starting gesture");
    });

    whiteboard.on('mouseup', function(){
    	isMouseDown = false;
    	layer.removeChildren();
    	layer.drawScene();
    	console.log("finishing gesture");
    });

    whiteboard.on('mousemove', function(){
    	if(!isMouseDown) return;
        points.push(stage.getMousePosition());
        line.setPoints(points);
        layer.drawScene();
    });
}