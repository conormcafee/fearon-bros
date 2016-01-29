// Top Slider

jQuery(document).ready(function($) {
	$('.my-slider').unslider();
});

// Sticky Header

$(document).scroll(function() {
	var y = $(document).scrollTop(); 
    var header = $(".header__bar").height();
    var result = $("header").height();
    var outcome = result - header;

    if(y >= outcome)  {
        $(".header__bar").addClass("sticky");
        $(".header__nav-btn").addClass("active");
        $(".pt").addClass("active");
    } else {
        $(".header__bar").removeClass("sticky");
        $(".header__nav-btn").removeClass("active");
        $(".pt").removeClass("active");
    }
});

// Full Screen Slideshow

$('.featured').each( function() {
	var $pic     = $(this),
    	getItems = function() {
        var items = [];
        $pic.find('li').each(function() {
        	var $src   = $(this).data('src'),
            	$size   = $(this).data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
 
            var item = {
                src : $src,
                w   : $width,
                h   : $height
            }
            items.push(item);
        });
    return items;
}

var items = getItems();
    console.log(items);
var $pswp = $('.pswp')[0];
    $pic.on('click', 'div', function(event) {
    event.preventDefault();
     
var options = {
   	index: 0,
    showHideOpacity: true
}
  
var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
lightBox.init();
});
});