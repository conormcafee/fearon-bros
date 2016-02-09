// Header Nav

$('.header__nav-btn a').on('click', function(){
    $('.full-screen-nav').toggleClass('js-header-active js-header-inactive');
    event.preventDefault();
});

// Echo

echo.init({
    offset: 100,
    throttle: 100,
    unload: false
});

// Top Slider

jQuery(document).ready(function($) {
	$('.my-slider').unslider({
        autoplay: true,
        speed: 1000,
        delay: 5000
    });
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

$('.js-gallery').each( function() {
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

// Portfolio Filters

$(document).ready(function(){
  $('.category').on('change', function(){
    var category_list = [];
    $('#filters :input:checked').each(function(){
      var category = $(this).val();
      category_list.push(category);
    });

    if(category_list.length == 0)
        $('.resultblock').fadeIn();
    
    else {
      $('.resultblock').each(function(){
        var item = $(this).attr('data-tag');
        if(jQuery.inArray(item,category_list) > -1)
          $(this).fadeIn('fast');
        else
          $(this).hide();
      });
    }
  });
});