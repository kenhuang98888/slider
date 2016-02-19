jQuery.fn.slider = function(options) {
	var defaults = {
        start: 0,
        end: 100,
        value: 50,
        template: '<div class="slider">' +
        				'<div class="slider-bg"><div class="slider-line"></div><div class="slider-dec">-</div><div class="slider-inc">+</div></div>' +
        				'<div class="pointer-container"><div class="label" style="visibility:hidden"></div><div class="pointer"></div></div>' +
        		  '</div>'
    };
 
    var settings = $.extend( {}, defaults, options );

	return this.each(function(e){
		$(this).html(settings.template);
		var slider = $(this).find('.slider'),
			pointerContainer = slider.find('.pointer-container'),
			label = slider.find('.label'),
			pointer = slider.find('.pointer');

		function init() {
			label.text(settings.value);
			pointer.text(settings.value);
			pointerContainer.css('left', parseInt(settings.value/(settings.end-settings.start)*200 + 25)+'px')
		}
		function mouseoveHandler(e) {
		   var pos = parseInt(e.clientX)-25;
		   if (pos < 25){
		   		pos = 25;
		   } else if (pos > 225) {
		   		pos = 225;
		   } 
		   var val = parseInt((pos-25)/200 * (settings.end - settings.start));
		   pointerContainer.css("left", pos+'px');
		   label.text(val);
		}
		function mousemoveRemove(){
 		   slider.unbind("mousemove", mouseoveHandler);
		   label.css('visibility', 'hidden');
		   pointer.text(label.text());
		}
		pointer.bind('mousedown', function(e) {
		   label.css('visibility', 'visible');
		   label.text(pointer.text());
		   pointer.text('');
		   slider.bind("mousemove", mouseoveHandler);
		});
		pointer.bind('mouseup', function(e) {
		   mousemoveRemove();
		});
		pointer.bind('mouseout', function(e) {
		   mousemoveRemove();
		});

		init();

	});
};