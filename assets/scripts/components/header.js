import watching from '../util/watching';
import $ from 'jquery';

window.jQuery = $;

let $lastScrollTop = 0;
let $delta = 5;
let $menu = $('.main-menu');
let $headerHeight = $('.global-header').outerHeight();

$(document).scroll(function(event) {
    hasScrolled();
});

function hasScrolled() {
    // if ($menu.is(':visible')) {
        let $scrollTop = $(document).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs($lastScrollTop - $scrollTop) <= $delta) {
            return;
        }

        if($scrollTop > $headerHeight) {
            $('.global-header').addClass('shrink');
        } else {
            $('.global-header').removeClass('shrink');
        }

        $lastScrollTop = $scrollTop;
    // }
}
