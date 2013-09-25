    function calculate_distance(point1, point2){
    	var xs = 0;
    	var ys = 0;

    	xs = point2.x - point1.x;
    	xs = xs * xs;

    	ys = point2.y - point1.y;
    	ys = ys * ys;

    	return Math.sqrt( xs + ys );
    };

    function closest_object(loc, objects){
    	if(objects.length < 1) return false;
    	var ret = objects[0];
    	var nearest = calculate_distance(loc, objects[0]);
    	for(var i = 1; i < objects.length; i++){
    		var challenger = calculate_distance(loc, objects[i])
    		if(challenger < nearest){
    			ret = objects[i];
    			nearest = challenger;
    		}
    	}
    	return ret;
    };