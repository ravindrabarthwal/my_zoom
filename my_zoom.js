
var incrementScale = .3; 
var map = []; 
var back_map = [];  
var $container = $("#container-zoom");
var $image = $("#map-image");
var $parent = $("#range");

function resetZoomDefault() { 

    $container.css('top', 'auto');
    $container.css('left', 'auto');
    $container.css('width', 'auto');
    $container.css('height', 'auto');

    $image.css('top', 'auto');
    $image.css('left', 'auto');

    $image.attr("data-zoom", 0);

    map = [];
    back_map = [];

}


function initializesZoomImage() {  

    resetZoomDefault();

    var dwidth = $parent.width();

    if (dwidth === null) {} else {

        w = document.querySelector('#map-image').naturalWidth;
        h = document.querySelector('#map-image').naturalHeight;
    
    var nuevo_a = Math.round(dwidth * h / w);
    $parent.css("height", nuevo_a);
    $image.css("height", nuevo_a);
    $image.css("width", dwidth);

    }

} 



function minus_zoom() {  

    var dwidth = $parent.width();
    naturalSizeImage();

    nuevo_a = Math.round(dwidth * h / w);

    var count_zoom = $image.attr("data-zoom");


    if (count_zoom <= 0) {
        var t_zoom = parseFloat(count_zoom);

    } else {
        var t_zoom = parseFloat(count_zoom) - 1;

        $image.attr("data-zoom", t_zoom);

        var count_zoom2 = $image.attr("data-zoom");
        // var dwidth = $parent.width(); 

        var f_s = t_zoom * incrementScale;

        var first = dwidth * f_s / 1 + dwidth;
        var second = nuevo_a * f_s / 1 + nuevo_a;

        
        $image.css('width', first);
        $image.css('height', second);

        activateZoom(first, second);

        if (back_map.length == 4) {

            $image.css('left', back_map[0]);
            $image.css('top', back_map[1]);

        }


        if (back_map.length > 4) {

            c1 = count_zoom * 2 - 4;
            c2 = count_zoom * 2 - 3;
            $image.css('left', back_map[c1]);
            $image.css('top', back_map[c2]);
        }


        if (count_zoom2 == 0) {

            $image.css('left', '0px');
            $image.css('top', '0px');

            resetZoomDefault();

        }

    } //if 


}




function more_zoom() { 

    var dwidth = $parent.width();

    naturalSizeImage(); 

    nuevo_a = Math.round(dwidth * h / w);

    count_zoom = $image.attr("data-zoom");

    t_zoom = parseFloat(count_zoom) + 1; 

    $image.attr("data-zoom", t_zoom);

    first = dwidth * (t_zoom * incrementScale) / 1 + dwidth;
    second = nuevo_a * (t_zoom * incrementScale) / 1 + nuevo_a;
    

    $image.css('width', first); 
    $image.css('height', second);

    activateZoom(first, second, 'more'); 

} 


function activateZoom(w, h, type) { 

    dwidth = $parent.width();
    dheight = $parent.height();

    x_w = w * 2 - dwidth; 
    x_h = h * 2 - dheight; 

    primer_p = w - dwidth; 
    segund_p = h - dheight; 

    h_h = h - dheight;
    w_w = w - dwidth;


    map.push(w_w);
    map.push(h_h);

    position = $image.position();

    count_zoom = $image.attr("data-zoom");
    if (type == 'more') {
        m_w = count_zoom * map[0]; //total anch
        m_h = count_zoom * map[1]; //total alto


        aplicado_a = m_w - map[1]; 
        porcentaje_alto = aplicado_a - position.top * 100;
        f_h = porcentaje_alto / aplicado_a;
        aplicado_alto = m_w * f_h / 100; 
 

        aplicado_l = m_h - map[1];
        porcentaje_ancho = aplicado_l - position.left * 100;
        f_h = porcentaje_ancho / aplicado_l; 
        aplicado_ancho = m_h * f_h / 100; 


        if (aplicado_ancho < 0) { aplicado_ancho = -1 * aplicado_ancho; }
        if (aplicado_alto < 0)  { aplicado_alto = -1 * aplicado_alto;   }


        if (back_map.length >= 2) {

            $image.css('top', aplicado_alto);
            $image.css('left', aplicado_ancho);

            back_map.push(aplicado_ancho);
            back_map.push(aplicado_alto);

        } else {

            back_map.push(w_w / 2);
            back_map.push(h_h / 2);

            $image.css('top', h_h / 2);
            $image.css('left', w_w / 2);

        }

    }


    $container.css('top', -1 * segund_p);
    $container.css('left', -1 * primer_p);

    $container.css('width', x_w);
    $container.css('height', x_h);

    $image.draggable({
        containment: $('#container-zoom')
    });


}



function naturalSizeImage () { 
    return  w = document.querySelector('#map-image').naturalWidth;
    return  h = document.querySelector('#map-image').naturalHeight; 
                             } 




$(document).ready(function() {
    
    initializesZoomImage(); 

});


window.addEventListener("resize", initializesZoomImage);

