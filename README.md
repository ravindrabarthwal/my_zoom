# my_zoom
JS to make zoom with jquery 1.7.2

Improve this script with modular programing JS


## How to Use

The library provides public api's for easy to use.
```javascript
<script src="rjszoom.js"></script>
<script>
	//First Callout the rjsZoom
	var myZoom = rjsZoom('#parentEl', '#imgContainer', '#image');
	//Init myZoom
	myZoom.init();

	//Add some code here may be listing to button click event
	//for zoom in or zoom out
	myZoom.increaseZoom();
	myZoom.decreaseZoom();
	//Reset the zoom to default
	myZoom.resetZoom();
	//Add listner for resize event on window and then re init the zoom
	window.addEventListener("resize", function(){
			myZoom.initZoom();
	});
</script>
```


