import watching from '../util/watching';
import $ from 'jquery';

window.jQuery = $;

const $body = $('body');
watching('[data-toggle="hamburger"]', {
    init() {
        this.$element.click(this.onClick.bind(this));
    },
    onClick(event) {
        // event.preventDefault();
        $body.toggleClass('nav-is-visible');
        this.$element.toggleClass('is-active');
    }
});
