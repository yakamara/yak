jQuery(document).ready(function(){

	// Externe Links im neuen Fenster
	$("a[href^='http://']").attr('target', '_blank');
	$("a[href^='https://']").attr('target', '_blank');

	// Hero-Slider
    $('.hero-slider').flexslider({
        start: function () {
            $('.slides li').each(function () {
                $(this).find('.animated').addClass('animatedd fadeInUp');
            });
        },
        before: function () {
            $('.slides li').each(function () {
                $(this).find('.animated').removeClass('animatedd fadeInUp');
            });
        },
        after: function () {
            $('.slides li').each(function () {
                $(this).find('.animated').addClass('animated fadeInUp');
            });
        }
    });

	// Slider
    $('.slider').flexslider({});


    // Accordions
    $('.accordion li').click(function() {
        if ($(this).closest('.accordion').hasClass('one-open')) {
            $(this).closest('.accordion').find('li').removeClass('active');
            $(this).addClass('active');
        } else {
            $(this).toggleClass('active');
        }
    });

    // Tabs
    $('.tabbed-content').each(function() {
        $(this).append('<ul class="content"></ul>');
    });

    $('.tabs li').each(function() {
        var originalTab = $(this),
            activeClass = "";
        if (originalTab.is('.tabs>li:first-child')) {
            activeClass = ' class="active"';
        }
        var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
        originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });

    $('.tabs li').click(function() {
        $(this).closest('.tabs').find('li').removeClass('active');
        $(this).addClass('active');
        var liIndex = $(this).index() + 1;
        $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
        $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
    });



    // SlideHoehe fuer .slider-fullscreen anpassen
    $('.slider-fullscreen .slides li').each(function () {
        $(this).css('height', $(window).height());
    });

    $('.slides li').each(function () {

        // Background-Bild <img> als li-Element anhaengen,  CSS background fuer bessere Responsive performance
        if ($(this).children('.background-image').length) {
            var imgSrc = jQuery(this).children('.background-image').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).children('.background-image').remove();
            $(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav
        }

        // Slide Inhalt vertikal zentrieren
        if ($('.overlay-nav').length && !$('nav').hasClass('nav-transparent')) {
            $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2) + $('.overlay-nav').height());
        } else {
            $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2));
        }
    });

    $(window).resize(function () {

        $('.slides li').each(function () {
            if ($('.overlay-nav').length && !$('nav').hasClass('nav-transparent')) {
                $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2) + $('.overlay-nav').height());
            } else {
                $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2));
            }
        });
    });



    // Die Slide-Hoehe fuer Fullscreen anpassen
    $('.slider-fullscreen .slides li').each(function () {
        $(this).css('height', $(window).height());
    });
    $(window).resize(function () {
        $('.slider-fullscreen .slides li').each(function () {
            $(this).css('height', $(window).height());
        });
    });



	// Netter Code Output
    prettyPrint();

	// Galerie

		$("a[rel^='prettyPhoto']").prettyPhoto({
			animationSpeed: 'slow',
			theme: 'light_square',
			slideshow: false,
			overlay_gallery: true,
			social_tools: false,
			deeplinking: false
		});
	});
