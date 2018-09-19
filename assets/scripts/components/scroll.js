import watching from '../util/watching';
import $ from 'jquery';

window.jQuery = $;

function scrollToAnchor(hash) {
    // hash.preventDefault();
    // $(document).off('scroll');

    let $target = $(hash);
    let $headerHeight = $('.global-header').outerHeight();

    $target = $target.length ? $target : $('[name=' + hash.slice(1) +']');
    let $container = $target.closest('.content-container');

    if ($container.length) {
        $target = $container;
    }

    if ($target.length) {
        $('html,body').animate({
            scrollTop: $target.offset().top - $headerHeight
        }, 300, 'swing', function () {
            // window.location.hash = target;
            $(document).on('scroll', onScroll);
        });

        return false;
    }
}

function onScroll(event) {
    let scrollPosition = $(document).scrollTop();
    // $('.main-menu a').each(function () {
    //     let $current = $(this);
    //     let $section = $($current.attr('href').slice(1));
    //     if ($section.position().top <= scrollPosition && $section.position().top + $section.height() > scrollPosition) {
    //         $('.main-menu a').removeClass('is-active');
    //         $current.addClass('is-active');
    //     }
    //     else {
    //         $current.removeClass('is-active');
    //     }
    // });

    $('[data-section]').each(function () {
        let $section = $(this);

        if ($section.position().top <= scrollPosition && $section.position().top + $section.height() > scrollPosition) {
            let $id = $section.attr('id');
            if (typeof $id === 'undefined') {
                // Suche die vorherige section mit einer Id
                $id = $section.prev('[id]').attr('id');
            }

            $('.main-menu a').removeClass('is-active');
            $('.main-menu a[href="/#'+$id+'"]').addClass('is-active');
        }
    });
}

if(window.location.hash) {
    scrollToAnchor(window.location.hash);
}


$("a[href*=\\#]:not([href=\\#])").click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
        scrollToAnchor(this.hash);
    }
});

$(document).ready(function () {
    $('.main-menu a').first().addClass('is-active');
    $(document).on('scroll', onScroll);
});
