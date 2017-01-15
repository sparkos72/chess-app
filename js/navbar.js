
/*

NAVBAR

*/

var navbarOffset								= 50;

// handle menu interaction
function menuAction(context)
{
	$('.navbar').on('click', 'a', function()
	{
		var section								= $(this).data('section');
		var target								= (section == 'home') ? 'top' : section;
		var mobileMenu							= ($('.navbar .navbar-toggle').css('display') == 'block') ? true : false;

		if (context == 'home')
		{
 			scrollToSection('#' + target);// is mobile menu dislayed?
			if (mobileMenu)
			{
				// close mobile menu to reveal content
				$('.navbar-toggle').trigger('click');
			}
		}
		else // go back to homepage & set autoscroll trigger
		{
			var baseURL							= $('body').data('url');
			var sectionTrigger					= (section != 'home') ? '?j2=' + section : '';
			window.location						= baseURL + sectionTrigger;
		}
		return false;
	});
};

// handle menu reveal
function menuReveal(context)
{
	$('.navbar').on('click', '.navbar-reveal.open-trigger', function() // show navbar
	{
		$('.navbar').removeClass('navbar-closed');
		showMenu();
	});

	$('.navbar').on('click', '.navbar-reveal.close-trigger', function() // hide navbar
	{
		$('.navbar').addClass('navbar-closed');
		hideMenu();
	});

	/*$( window ).scroll( function() // auto reveal menu after splash screen
	{
		if (! $('.navbar').hasClass('navbar-revealed')) // if menu isn't visible & user hasn't manually closed it
		{
			if (! $('.navbar').hasClass('navbar-closed')) // if the user hasn't manually closed it
			{
				autoRevealMenu(context);
			}
		}
	});*/
}

function showMenu()
{
	$('.navbar-reveal.open-trigger').stop().velocity({ opacity: 0 }, 200, 'easeOutCubic', function()
	{
		var revealCss							= {
			'opacity':							0,
			'min-height':						navbarOffset + 'px',
			'background-color':					'#fff',
			'display':							'block',
			'-webkit-box-shadow':				'0 10px 6px -6px #777',
			'-moz-box-shadow':					'0 10px 6px -6px #777',
			'box-shadow':						'0 10px 6px -6px #777'
		};
		$('.navbar-wrapper').css(revealCss).velocity({ opacity: 1 }, 500, 'easeInCubic');
		$('.navbar-reveal.open-trigger').css('display','none');
		$('.navbar').addClass('navbar-revealed');
	});
}

function hideMenu()
{
	$('.navbar-wrapper').stop().velocity({ opacity: 0 }, 500, 'easeOutCubic', function()
	{
		var hideCss								= {
			'opacity':							0,
			'min-height':						'20px',
			'background':						'none',
			'display':							'block',
			'-webkit-box-shadow':				'none',
			'-moz-box-shadow':					'none',
			'box-shadow':						'none'
		};
		$('.navbar-reveal.open-trigger').css(hideCss).velocity({ opacity: 1 }, 200, 'easeInCubic');
		$('.navbar-wrapper').css('display','none');
		$('.navbar').removeClass('navbar-revealed');
	});
}

function autoRevealMenu(context)
{
	// is mobile menu dislayed?
	var mobileMenu								= ($('.navbar .navbar-toggle').css('display') == 'block') ? true : false;

	if ((! $('.navbar').hasClass('navbar-auto-revealed')) && (! mobileMenu) && (context == 'home'))
	{
		var timeout;
		var revealHeight						= $('#splash .flexslider').css('height').replace('px','');
		if ($(this).scrollTop() > revealHeight - (navbarOffset + 2))
		{
			showMenu();
			$('.navbar').addClass('navbar-auto-revealed'); // flag auto reveal has been run

			// reposition section
			timeout = setTimeout( function () // wait for data-spy
			{
				//$('.navbar-nav .active a').trigger('click');
				targetSection					= $('.navbar-nav .active a').data('section');
				if (typeof targetSection !== 'undefined' && targetSection != '')
				{
					scrollToSection(targetSection);
				}
			}, 300);
		}
		// cancel reposition if user stil scrolling
		$( window ).scroll( function()
		{
			clearTimeout(timeout);
		});
	}
}


/*

 AUTO SCROLL

*/

// listen for j2 qs value - used to aut scroll to section
function jump2IDListener()
{
	var j2section								= qsLookup('j2'); // get target
	if (typeof j2section !== 'undefined')
	{
		timeout									= setTimeout( function () // wait page to load
		{
			if ($('#' + j2section).length > 0)
			{
				scrollToSection('#' + j2section);
			}
		}, 250);
	}
}

// scroll to section
function scrollToSection(targetSection)
{
	var mobileMenu								= ($('.navbar .navbar-toggle').css('display') == 'block') ? true : false;
	//var desktopOffset							= ($('.navbar').hasClass('navbar-revealed')) ? navbarOffset : 0;
	var desktopOffset							= ($('.navbar-reveal').css('display') == 'block') ? 0 : navbarOffset ;
	var menuOffset								= (mobileMenu) ? 50 : desktopOffset;


	if (targetSection == 'top')
	{
		$.scrollTo( {top:'0px', left:'0px'},
		{
			'duration': 900, 'easing': 'swing'
		});
	}
	else if ($(targetSection).length > 0) // check section exists
	{
		$.scrollTo( {top: $(targetSection).offset().top - menuOffset, left:'0px'},
		{
			'duration': 900, 'easing': 'swing'
		});
	}
}

// scroll to top icon
function scrollToTop()
{
	$('.scrollup').css('display','none');

	// show / hide icon
	$( window ).scroll( function()
	{
		if ($(this).scrollTop() > 100)
		{
			$('.scrollup').fadeIn();
		}
		else
		{
			$('.scrollup').fadeOut();
		}
	});

	// assign listener: scroll to top of screen
	$('.scrollup').on('click', '.fa', function()
	{
		scrollToSection('top');
		return false;
	});
}


function initStickyMenu(targetMenu)
{
	handleStickyMenu(targetMenu);

	$( window ).scroll( function()
	{
		handleStickyMenu(targetMenu);
	});

	$( window ).resize( function()
	{
		// reset width
		var containerWidth 						= $(targetMenu).parent().width();
		$(targetMenu).css('width', containerWidth);

		if ( $( window ).width() < 768 )
		{
			$(targetMenu).removeClass('fixed');
		}
	});
}

function handleStickyMenu(targetMenu)
{
	var contentHeight							= $( window ).height();
	var footerHeight							= $('footer').height();
	var navbarHeight							= $('.navbar').height();
	var menuHeight								= $(targetMenu).height();
	var headerOffset							= 0;

	// set width
	var containerWidth 							= $(targetMenu).parent().width();
	$(targetMenu).css('width', containerWidth);

	// cancel sticky menu on smaller screens or where menu is taller than screen height
	if ( $( window ).width() <= 768 || $( window ).height() < menuHeight)
	{
		$(targetMenu).removeClass('fixed');
	}
	else
	{
		if ($( window ).scrollTop() > headerOffset) // not at top of the page
		{
			$(targetMenu).addClass('fixed');

			// adjust position top to stop sticky menu being above the footer
			var scrollBottom					= $( document ).height() - $( window ).height() - $( window ).scrollTop();
			var contentArea						= contentHeight - (navbarHeight - (scrollBottom - footerHeight));
			var menuOffset						= contentHeight - menuHeight - navbarHeight - 40;
			var triggerHeight					= footerHeight - (menuOffset);

			if (scrollBottom < triggerHeight)
			{
				$(targetMenu).css('top', (contentArea + navbarHeight) - menuHeight - 20);
			}
			else
			{
				$(targetMenu).css('top', 'auto');
			}
		}
		else
		{
			$(targetMenu).removeClass('fixed');
		}
	}
}
