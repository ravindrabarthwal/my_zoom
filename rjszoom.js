
/**
 * This is the main wrapper function for the library which helps to
 * zoom and zoom out the images. 
 * @param  {string: selector} parent    The container parent container
 * @param  {string: selector} container The image parent container
 * @param  {string: selector} image     The image which need to be zoom
 * @return {object}     The function on executes returns an object.
 */
var rjsZoom = rjsZoom || function(parent, container, image){

	//some of the private variables for internal use
    var incrementScale = 0.3,
    	map = [],
    	backMap = [],
    	$parent = $(parent),
    	$container = $(container),
    	$image = $(image),

    	//This will be the object which will be available publicly.
    	publicAPI = {
	    	resetZoom: resetZoomDefault,
	    	initZoom: initImageZoom,
	    	decreaseZoom: minusZoom,
	    	increaseZoom: moreZoom
	    };

  	
  	/**
  	 * The private Reset Zoom Function
  	 */
    function resetZoomDefault() {
    	//Reset the $container
    	$container
    		.css('top', 'auto')
    		.css('left', 'auto')
    		.css('width', 'auto')
    		.css('height', 'auto');

    	//Reset the $mapImage
    	$image
    		.css('top', 'auto')
    		.css('left', 'auto')
    		.attr('data-zoom', 0);

    	map = [];
    	backMap = [];
    }

    /**
     * This is the private function that initializes the Image Zoom Functionality
     */
    function initImageZoom() {

    	//reset the zoom
    	publicAPI.resetZoom();

    	var	$parentWidth = $parent.width();


    	if($parentWidth) {

			var $imageWidth = $image[0].naturalWidth,
    		$imageHeight = $image[0].naturalHeight,

    		newHeight = Math.round($parentWidth * $imageHeight / $imageWidth);

    		$parent.css("height", newHeight);
    		$image
    			.css("height", newHeight)
    			.css('width', $parentWidth);
    	}
    	
    }

    /**
     * This private function decrease Zoom
     * @return {[type]} [description]
     */
    function minusZoom() {

    	var $parentWidth = $parent.width(),
    		$imageWidth = $image[0].naturalWidth,
    		$imageHeight = $image[0].naturalHeight,
    		

    		newHeight = Math.round($parentWidth * $imageHeight / $imageWidth),
    		zoomCount = $image.attr('data-zoom'),
    		totalZoom;



    		if(zoomCount <= 0){

    			totalZoom = parseFloat(zoomCount);
    		}
    		else{
    			
    			totalZoom = parseFloat(zoomCount) - 1;
    			

    			$image.attr('data-zoom', totalZoom);


    			var scaleZoom = totalZoom * incrementScale,
    			newImgWidth = $parentWidth * scaleZoom / 1 + $parentWidth,
    			newImgHeight = newHeight * scaleZoom / 1 + newHeight;

    			$image
	    			.css('width', newImgWidth)
	    			.css('height', newImgHeight);

    			activateZoom(newImgWidth, newImgHeight, false);

	    		if(backMap.length == 4) {

	    			$image
	    				.css('left', backMap[0])
	    				.css('top', backMap[1]);
	    		}

	    		if(backMap.length > 4) {
	    			var index1 = zoomCount * 2 - 4
	    				index2 = zoomCount * 2 - 3;
	    			$image
	    				.css('left', backMap[index1])
	    				.css('top', backMap[index2]);
	    		}

    			if(totalZoom == 0) {
	    			$image
	    				.css('left', '0px')
	    				.css('top', '0px');
	    			publicAPI.resetZoom();
	    		}
	    	}
    }

    /**
     * Increase the zoom
     */
    function moreZoom() {
    	
    	var $parentWidth = $parent.width(),
    		$imageWidth = $image[0].naturalWidth,
    		$imageHeight = $image[0].naturalHeight,

    		newHeight = Math.round($parentWidth * $imageHeight / $imageWidth),

    		zoomCount = $image.attr('data-zoom'),
    		totalZoom = parseFloat(zoomCount) + 1,

    		newImgWidth = $parentWidth * ( totalZoom * incrementScale) / 1 + $parentWidth,
    		newImgHeight = newHeight * ( totalZoom * incrementScale) / 1 + newHeight;

    		$image.attr("data-zoom", totalZoom);
    		
    		
    		$image
    			.css('width', newImgWidth)
    			.css('height', newImgHeight);

    		activateZoom(newImgWidth, newImgHeight, true);
    }


    /**
     * This function is used for taking out common functionality for zoom in and out
     * @param  {integer} width  new image width
     * @param  {integer} height new Image height
     * @param  {boolean} bool   This is true for zoom in and false for zoom out
     */
    function activateZoom(width, height, bool) {


    	var $parentWidth = $parent.width(),
    		$parentHeight = $parent.height(),

    		$imageWidth = $image[0].naturalWidth,
    		$imageHeight = $image[0].naturalHeight,

    		xW = width * 2 - $parentWidth,
    		xH = height *2 - $parentHeight,

    		primerP = width - $parentWidth,
    		segundP = height - $parentHeight,

    		hH = height - $parentHeight,
    		wW = width - $parentWidth;

    		

    		map.push(wW);
    		map.push(hH);

    		position = $image.position(),
    		zoomCount = $image.attr('data-zoom');
    		if(bool) {
    			var mW = zoomCount * map[0],
    				mH = zoomCount * map[1],

    				aplicadoA = mW - map[1],
    				porcentajeAlto = aplicadoA - position.top  * 100,
    				fH = porcentajeAlto / aplicadoA,
    				aplicadoAlto = mW * fH / 100,

    				aplicadoL = mH - map[1],
    				porcentajeAncho = aplicadoL - position.left  * 100,
    				fLH = porcentajeAncho / aplicadoL,
    				aplicadoAncho = mH * fLH / 100;

    				if(aplicadoAncho < 0) {
    					aplicadoAncho *= -1;
    				}
    				if(aplicadoAlto < 0) {
    					aplicadoAlto *= -1;
    				}

    				if(backMap.length >= 2) {
    					$image
    						.css('top', aplicadoAlto)
    						.css('left', aplicadoAncho);

    					backMap.push(aplicadoAncho);
    					backMap.push(aplicadoAlto);

    				} else {

    					backMap.push(wW / 2);
    					backMap.push(hH / 2);

    					$image
    						.css('top', hH/2)
    						.css('left', wW/2);

    				}
    		}

    		$container
    			.css('top', -1 * segundP)
    			.css('left', -1 * primerP)
    			.css('width', xW )
    			.css('height', xH);

    		$image.draggable({
    			containment: $container
    		});

    }


    return publicAPI;
}