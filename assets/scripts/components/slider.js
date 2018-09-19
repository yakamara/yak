import watching from '../util/watching';
import $ from 'jquery';
window.jQuery = $;
require('owl.carousel/dist/owl.carousel.js');

watching('[data-yslider]', {
    init() {
        this.items = 1;
        if (this.$element.data('items')) {
            this.items = this.$element.data('items');
        }
        this.responsive = {};
        if (this.$element.data('responsive')) {
            this.responsive = this.$element.data('responsive');
        }
        this.$element.owlCarousel({
            // animateIn: 'fadeIn',
            // animateOut: 'fadeOut',
            autoplay: true,
            autoplayTimeout: 8000,
            autoplaySpeed: 1000,
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            items: this.items,
            responsive: this.responsive,
            slideBy: this.items,
            navText: [
                '<svg class="icon icon-slider-previous" aria-hidden="true"><use xlink:href="#icon-chevron-left"></use></svg>',
                '<svg class="icon icon-slider-next" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>'
            ]
        });
    }
});
