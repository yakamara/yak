import watching from '../util/watching';
import $ from 'jquery';

window.jQuery = $;

watching('[data-jumper]', {
    init() {
        this.$element.click(this.onClick.bind(this));
    },
    onClick(event) {
        event.preventDefault();

        let target = this.$element.data('jumper');
        if (typeof target !== 'undefined') {
            let position = Math.abs($('body').offset().top) + $(target).offset().top;
            $('html, body').animate({
                scrollTop: position
            }, 500);
        }
    }
});
