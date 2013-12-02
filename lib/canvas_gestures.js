/******** Project - Final *********************************
Authors: Eric Wooley, Tandra Felly, Lauryn Loudermilk
Description: Javascript automata engine.
**********************************************************/

function canvas_gestures(obj){

	var stage = obj.stage;
	var layer = obj.preview;
	var whiteboard = obj.whiteboard;
	var events = obj.events || {};

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
        // console.log("starting gesture");
    });

    whiteboard.on('mouseup', function(){
    	isMouseDown = false;
    	layer.removeChildren();
    	layer.drawScene();
    	gesture_check(points);
    	// console.log("finishing gesture");
    });

    whiteboard.on('mousemove', function(){
    	if(!isMouseDown) return;
        points.push(stage.getMousePosition());
        line.setPoints(points);
        layer.drawScene();
    });

    function gesture_check(points){
    	var start = points[0];
    	var end = points[points.length -1];
    	end.distance = calculate_distance(start, end);

    	// Check for circle
    	var far_20 = Math.floor(points.length/5);
    	//console.log("far_20: " + far_20 + " total: " + points.length);
    	if(far_20 < 1)
    		return false;
    	// Max distance object, to keep track of the distance, and which point it is.
    	farthest_point = end;
    	// analyze the furthest 20% of points to see if it's further than the se_distance
    	// useful for checking for circle or oval
    	for(var i = 2*far_20; i < 3*far_20; i++){
    		points[i].distance = calculate_distance(start, points[i]);
    		if(farthest_point.distance <= points[i].distance){
    			farthest_point = points[i];
    		}
    	}
    	// console.log(JSON.stringify(farthest_point) + " - " + JSON.stringify(end));
    	if(farthest_point.distance > end.distance ){
    		console.log("circle");
    		if(events.circle){
    			// Find circle center
    			var circle_boundries = {top: start.y, bottom: start.y, right: start.x, left: start.x};
    			for(var i = 0; i < points.length; i++){
    				var p = points[i];
    				if(p.x > circle_boundries.right) circle_boundries.right = p.x;
    				if(p.x < circle_boundries.left) circle_boundries.left = p.x;
    				if(p.y < circle_boundries.top) circle_boundries.top = p.y;
    				if(p.y > circle_boundries.bottom) circle_boundries.bottom = p.y;
    			}
    			var xcenter = Math.floor((circle_boundries.right + circle_boundries.left) / 2);
    			var ycenter = Math.floor((circle_boundries.top + circle_boundries.bottom) / 2);
    			var radius = Math.floor((((circle_boundries.right - circle_boundries.left)/2) + (circle_boundries.bottom - circle_boundries.top)/2)/2);
    			events.circle({
    				boundries: circle_boundries,
    				center: {x: xcenter, y: ycenter},
    				radius: radius
    			});
    		}
    	}
    	else {
    		console.log("line")
    		if(events.line){
    			events.line({start: start, end: end});
    		}
    	}
    };

}