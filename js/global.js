
/*  window/element dimensions */


function portraitFlag()
{
	handlePortraitFlag();
	$( window ).resize( function()
	{
		handlePortraitFlag();
	});
}


function handlePortraitFlag()
{
	var vp										= getViewportDimensions();
	if (vp.height > vp.width) // landscape
	{
		$('body').addClass('portrait');
	}
	else
	{
		$('body').removeClass('portrait');
	}
}


// returns dimensions of viewable area
function getViewportDimensions()
{
	var vpWidth									= 0;
	var vpHeight								= 0;

	if ( typeof( window.innerWidth ) == 'number' )
	{
		//Non-IE
		vpWidth									= window.innerWidth;
		vpHeight								= window.innerHeight;
	}
	else if ( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
	{
		//IE 6+ in 'standards compliant mode'
		vpWidth									= document.documentElement.clientWidth;
		vpHeight								= document.documentElement.clientHeight;
	}
	else if ( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
	{
		//IE 4 compatible
		vpWidth									= document.body.clientWidth;
		vpHeight								= document.body.clientHeight;
	}
	return { width: vpWidth,height: vpHeight };
}



// set element height based on current width using w:h ratio
function resetHeight(targetElement, ratio, heightOffset, maxscreen)
{
	if ($(targetElement).length > 0)
	{
		maxscreen								= (typeof maxscreen === 'undefined') ? 'false' : maxscreen; // optional parameter
		heightOffset							= (typeof heightOffset === 'undefined') ? 0 : heightOffset; // optional parameter

		var currentWidth						= $(targetElement).css('width').replace('px', '');
		var newHeight							= currentWidth / ratio;
		if (maxscreen) // height shouldn't be greater than viewable area
		{
			var vp								= getViewportDimensions();
			newHeight 							= (vp.height < newHeight) ? vp.height : newHeight;
		}
		newHeight								= newHeight - heightOffset;
		$(targetElement).css('height', newHeight + 'px');

		return { width: currentWidth, height: newHeight };
	}
	else
	{
		return false;
	}
}


// positions target element vertically centered
function centerVertical(targetElement, shimOffset)
{
	shimOffset									= (typeof shimOffset === 'undefined') ? 0 : shimOffset; // optional parameter
	handleCenterVertical(targetElement, shimOffset);
	$( window ).resize( function()
	{
		handleCenterVertical(targetElement, shimOffset);
	});
}


function handleCenterVertical(targetElement, shimOffset)
{
	var contentHeight 							= $(targetElement).height();
	var windowHeight 							= $(window).height();
	var shimHeight								= (windowHeight - contentHeight - shimOffset) / 2;

	// configure shim
	$(targetElement).css('margin-top', shimHeight + 'px');
}


// positions target element vertically centered
function setSquare(targetElement)
{
	var contentWidth 							= $(targetElement).width();
	$(targetElement).height(contentWidth);
}


function setMediaDimensions(mediaRatio, container)
{
	var containerWidth							= $('.container').width() - 10;
	var vp										= getViewportDimensions();
	var offset									= (vp.width > 600) ? 400 : 200;
	var mediaWidth								= (vp.width > 600) ? containerWidth : vp.width - 30;
	var mediaHeight								= mediaWidth / mediaRatio;

	switch (true)
	{
		case (mediaHeight > (vp.height - offset)): // vid taller than the screen

			mediaHeight							= vp.height - offset;
			mediaWidth							= mediaHeight * mediaRatio;

			$('#video').css('height', mediaHeight + 'px').css('width', mediaWidth + 'px');
			$('#video_html5_api').css('height', mediaHeight + 'px').css('width', mediaWidth + 'px');
			$(container).css('height', mediaHeight + 'px').css('width', mediaWidth + 'px');
			break;

		default:
			$('#video').css('width', mediaWidth + 'px').css('height', mediaHeight + 'px');
			$('#video_html5_api').css('width', mediaWidth + 'px').css('height', mediaHeight + 'px');
			$(container).css('width', mediaWidth + 'px').css('height', mediaHeight + 'px');
			break;
	}

	// postition play button
	if ( ! $(container + ' button.vjs-big-play-button').hasClass('clicked'))
	{
		$('button.vjs-big-play-button')
			.css('margin-top', ((mediaHeight - 41) / 2) + 'px')
			.css('margin-left', ((mediaWidth - 86) / 2) + 'px')
			.css('display', 'block');
	}

	$(container).on('click','button.vjs-big-play-button', function()
	{
		$(this).stop().animate({ opacity: 0 }, 500, 'easeOutCubic', function()
		{
			$(this).addClass('clicked');
		});
	});
}


/* DOM functions */


// group items by wrapping in div
function groupObjects(thisContainer, thisObject, thisWrapper, thisGroupSize)
{
	// group offer boxes
	var number_of_objects;
	var number_of_rows;
	var startPoint;
	var endPoint;
	var objects_per_row = thisGroupSize;

	number_of_objects							= $(thisObject).length;
	number_of_rows								= 0;

	// calculate number of rows
	for (i = 0; i < number_of_objects; i = (i + objects_per_row))
	{
		number_of_rows++;
	}

	if (number_of_rows > 0)
	{
		// create section
		for (i = 0; i < (number_of_rows) ; i++)
		{
			startPoint							= i;
			endPoint							= startPoint + objects_per_row;

			if (endPoint > number_of_objects)
			{
				endPoint						= number_of_objects;
				$(thisContainer).children().slice(startPoint).wrapAll(thisWrapper);
			}
			else
			{
				$(thisContainer).children().slice(startPoint, endPoint).wrapAll(thisWrapper);
			}
		}
	}
}


function initAccordian(wrapper, trigger, target)
{
	// setup trigger
	$(wrapper + ' ' + trigger).each(function(index)
	{
		$(this).addClass('open-handle');
		$(this).append('<div class="action-icon"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div>');
	});

	// open event
	$(wrapper).on('click', '.open-handle', function()
	{
		var $parentEl								= $(this).parent();
		$(wrapper + ' ' + target).slideUp(300, function() // close all open views
		{
			$(wrapper).find('.close-handle').addClass('open-handle').removeClass('close-handle');
			$(wrapper).find('.action-icon span').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
		});

		$parentEl.find(target).slideDown(600, function()
		{
			$parentEl.find('.open-handle').addClass('close-handle').removeClass('open-handle');
			$parentEl.find('.action-icon span').addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
		});

		return false;
	});

	// close event
	$(wrapper).on('click', '.close-handle', function()
	{
		var $parentEl								= $(this).parent();
		$parentEl.find(target).slideUp(300, function()
		{
			$parentEl.find('.close-handle').addClass('open-handle').removeClass('close-handle');
			$parentEl.find('.action-icon span').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
		});
		return false;
	});
}


function initSlideout(wrapper, trigger, target)
{
	if ($(trigger).length + $(target).length > 0)
	{
		var $wrapper							= $(wrapper);
		var $trigger							= $(trigger);
		var $target								= $(target);

		var slideoutWidth						= $wrapper.width();
		var triggerWidth						= $trigger.width();
		var targetWidth							= slideoutWidth - triggerWidth;

		// setup
		$trigger.addClass('closed');
		$wrapper.css('width', $trigger.width() + 'px');
		var setupCss							= {
			'display':							'none',
			'width':							0,
			'height':							'100%',
			'opacity':							0
		};
		$target.css(setupCss);

		// assign listners
		$wrapper.on('click', trigger + '.closed', function() // open menu
		{
			$wrapper.css('width', 'auto');
			$target.css('display', 'block');
			$trigger.removeClass("closed").addClass("open");
			applyDynamicStyling($wrapper, $trigger, $target);

			$( window ).resize( function()
			{
				applyDynamicStyling($wrapper, $trigger, $target, 'resize');
			});
		});

		$wrapper.on('click', trigger + '.open', function() // close menu
		{
			$target.stop().animate({ width: '0px', opacity: 0 }, 500, 'easeOutCubic', function()
			{
				$trigger.removeClass("open").addClass("closed");
				$target.css('display', 'none');
				$wrapper.css('width', $trigger.width() + 'px');
			});
		});

		function applyDynamicStyling($wrapper, $trigger, $target, resize)
		{
			resize								= (typeof resize === 'undefined') ? false : true; // optional parameter		var offset								= 52 + 63; // header & footer
			var numberOfIcons					= 5;

			var vp								= getViewportDimensions();
			var triggerWidth					= $trigger.width();
			var targeHeight						= $wrapper.height();
			var targetWidth						= (vp.width < 600) ? vp.width - triggerWidth : 570 - triggerWidth;

			$target.css('height', targeHeight + 'px');
			$target.find('.content-wrapper').css('width', targetWidth + 'px');

			if (resize) // just change the width
			{
				$target.css('width', targetWidth + 'px');
			}
			else // animate width change
			{
				$target.stop().animate({ width: targetWidth, opacity: 1  }, 800, 'easeOutCubic');
			}
		}
	}
}


function initSwipeListener(target, callback, reassignment)
{
	reassignment								= (typeof reassignment === 'undefined') ? false : true; // optional parameter

	var gesture									= {};
	gesture.record								= {};

	if ( $(target).length > 0 )
	{
		var $ele								= $(target);

		// check listeners not alreay bound
		if ( ! $ele.hasClass('swipe-listner') || reassignment)
		{
			if ( ! reassignment)
			{
				$ele.addClass('swipe-listner');
				$ele.data('callback', callback);
			}
			else
			{
				$ele.unbind('touchstart mousedown touchend mouseup');
			}

			// bind listeners
			$ele.on('touchstart mousedown', function(event)
			{
				gesture							= startGestureCheck($ele, event, gesture);
			});

			$ele.on('touchend mouseup', function()
			{
				params							= getParams();
				var direction					= analyseGesture(params, gesture, target);
				endGestureCheck($ele, target, direction);
			});
		}
	}

	function startGestureCheck($ele, event, gesture)
	{
		switch(event.type)
		{
			case 'mousedown':
				gesture.record.startX			= event.screenX;
				gesture.record.startY			= event.screenY;
				break;

			case 'touchstart':
				gesture.record.startX			= event.originalEvent.touches[0].pageX;
				gesture.record.startY			= event.originalEvent.touches[0].pageY;
				break;
		}

		// bind movement listener
		$ele.on('touchmove mousemove', function(event)
		{
			return movementCapture(event, gesture);
		});

		return gesture;
	}

	function movementCapture(event, gesture)
	{
		switch(event.type)
		{
			case 'mousemove':
				gesture.record.endX				= event.screenX;
				gesture.record.endY				= event.screenY;
				break;

			case 'touchmove':
				gesture.record.endX				= event.originalEvent.touches[0].pageX;
				gesture.record.endY				= event.originalEvent.touches[0].pageY;
				break;
		}
		return gesture;
	}

	function analyseGesture(params, gesture, target)
	{
		var swipeEvent							= '';
		var record								= gesture.record;

		// horizontal detection
		if ((((record.endX - params.minX > record.startX) || (record.endX + params.minX < record.startX)) && ((record.endY < record.startY + params.maxY) && (record.startY > record.endY - params.maxY) && (record.endX > 0))))
		{
			swipeEvent							= (record.endX > record.startX) ? 'swiperight' : 'swipeleft';
			$(target).data('swiped', 'true'); // flag swipe event

			var alertMsg						= 'swipeEvent: ' + swipeEvent + '\n'
												+ 'vp.width: ' + params.vp.width + '\n'
												+ 'params.minX: ' + params.minX + '\n'
												+ 'params.maxX: ' +  params.maxX + '\n'
												+ 'recorded.startX: ' +  record.startX + '\n'
												+ 'recorded.endX: ' +  record.endX;
			//alert(alertMsg);
		}

		// vertical detection
		else if ((((record.endY - params.minY > record.startY) || (record.endY + params.minY < record.startY)) && ((record.endX < record.startX + params.maxX) && (record.startX > record.endX - params.maxX) && (record.endY > 0))))
		{
			swipeEvent							= (record.endY > record.startY) ? 'swipedown' : 'swipeup';
			$(target).data('swiped', 'true'); // flag swipe event

			var alertMsg						= 'swipeEvent: ' + swipeEvent + '\n'
												+ 'vp.width: ' + params.vp.width + '\n'
												+ 'params.minY: ' + params.minY + '\n'
												+ 'params.maxY: ' +  params.maxY + '\n'
												+ 'recorded.startY: ' +  record.startY + '\n'
												+ 'recorded.endY: ' +  record.endY;
			//alert(alertMsg);
		}
		return swipeEvent;
	}

	function endGestureCheck($ele, target, swipeEvent)
	{
		gesture									= {};
		gesture.record							= {};

		$ele.unbind('touchmove mousemove');

		if (swipeEvent != '')
		{
			if (typeof window[callback] === 'function')
			{
				window[callback](target, swipeEvent);
				timeout							= setTimeout( function ()
				{
					$(target).data('swiped', 'false'); // remove swipe event flag
				}, 500);
			}
		}
	}

	function getParams()
	{
		var vp									= getViewportDimensions();
		var params								= {};
		switch (true)
		{
			case (vp.width >= 600): // tablet & desktop
				params.minX						= 300;	// min x swipe distance - horizonal
				params.minY						= 300;	// min y swipe distance - vertical
				params.maxX						= 350;	// max x swipe distance - horizontal
				params.maxY						= 350;	// max y swipe distance - vertical
				break;

			case (vp.width < 600): // mobile
				params.minX						= 140;	// min x swipe distance - horizonal
				params.minY						= 140;	// min y swipe distance - vertical
				params.maxX						= 180;	// max x swipe distance - horizontal
				params.maxY						= 180;	// max y swipe distance - vertical
				break;
			/*
			default: // desktop
				params.minX						= 50;	// min x swipe distance - horizonal
				params.minY						= 50;	// min y swipe distance - vertical
				params.maxX						= 70;	// max x swipe distance - horizontal
				params.maxY						= 70;	// max y swipe distance - vertical
				break;
			*/
		}
		params.vp								= vp;
		return params;
	}
}



/* plugin functions */


// assign modal to gallery images
function assignGalleryModal(target)
{
	$(target).colorbox(
	{
		rel:			'grp'
	});

	$(document).bind('cbox_open', function()
	{
		// tweak controls
		$('#cboxPrevious').css('display','none');
		$('#cboxNext').css('display','none');
	});

	$(document).bind('cbox_complete', function()
	{
		// tweak controls
		$('#cboxPrevious').html('<span class="glyphicon glyphicon-chevron-left"></span>').css('display','block');
		$('#cboxNext').html('<span class="glyphicon glyphicon-chevron-right"></span>').css('display','block');

		// set image responsive css
		setImageDimensions();
	});

	$( window ).resize( function()
	{
		setImageDimensions();
	});

	function setImageDimensions()
	{
		var media								= getImageDimensions();
		$('.cboxPhoto').css('width', media.width + 'px').css('height', media.height + 'px');

		var colorboxDimensions					= {
			width								: (media.width) + 'px',
			innerWidth							: (media.width) + 'px',
			height								: (media.height) + 'px',
			innerHeight							: (media.height) + 'px'
		};
		$.colorbox.resize(colorboxDimensions);
	}

	function getImageDimensions()
	{
		var objWidth							= $('.cboxPhoto').width();
		var objHeight							= $('.cboxPhoto').height();
		var mediaRatio							= objWidth / objHeight;

		var vp									= getViewportDimensions();
		var maxWidth							= vp.width * 0.75;
		var maxHeight							= vp.height * 0.75;
		var offset								= (vp.width > 767) ? 300 : 240;

		var mediaWidth							= (vp.width > 767) ? maxWidth : vp.width * 0.85;
		var mediaHeight							= mediaWidth / mediaRatio;

		if (mediaHeight > maxHeight) // media taller than the colorbox max height
		{
			mediaHeight							= maxHeight;
			mediaWidth							= maxHeight * mediaRatio;
		}
		return {'width': mediaWidth, 'height': mediaHeight, 'ratio': mediaRatio};
	}
}


function imageZoom(selector)
{
	$(selector).elevateZoom(
	{
		constrainType:		'height',
		constrainSize:		350,
		zoomType: 			'lens',
		containLensZoom: 	true,
		cursor: 			'pointer'
	});
}


// spinner plugin - spin.js
function showSpinner(targetId)
{
	var opts 									= {
		lines		: 13 // The number of lines to draw
		, length	: 28 // The length of each line
		, width		: 14 // The line thickness
		, radius	: 42 // The radius of the inner circle
		, scale		: 1 // Scales overall size of the spinner
		, corners	: 1 // Corner roundness (0..1)
		, color		: '#000' // #rgb or #rrggbb or array of colors
		, opacity	: 0.25 // Opacity of the lines
		, rotate	: 0 // The rotation offset
		, direction	: 1 // 1: clockwise, -1: counterclockwise
		, speed		: 1 // Rounds per second
		, trail		: 60 // Afterglow percentage
		, fps		: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex	: 2e9 // The z-index (defaults to 2000000000)
		, className	: 'spinner-' + targetId // The CSS class to assign to the spinner
		, top		: '50%' // Top position relative to parent
		, left		: '50%' // Left position relative to parent
		, shadow	: false // Whether to render a shadow
		, hwaccel	: false // Whether to use hardware acceleration
		, position	: 'absolute' // Element positioning
	};

	var target 									= document.getElementById(targetId);
	var spinner 								= new Spinner(opts).spin(target);

	return spinner;
}


function hideSpinner(targetId)
{
	$('.spinner-' + targetId).remove();
}


function goBack()
{
	window.history.back();
}


function redirect(url)
{
	window.location.href 						= url;
}


// close modal
function closeModal()
{
	$.colorbox.close();
}