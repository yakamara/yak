import watching from '../util/watching';
import $ from 'jquery';

window.jQuery = $;

watching('.dropdown', {
    init() {
        this.$element.mouseleave(this.onClose.bind(this));
        this.$element.mouseenter(this.onHover.bind(this));
        this.$element.find('.dropdown-menu > *').click(this.onClickMenuItem.bind(this));
    },
    onClickMenuItem(event) {
        const $dropdownMenu = $(event.currentTarget).closest('.dropdown-menu');
        if ($dropdownMenu.is(':visible')) {
            $dropdownMenu.hide();
        } else {
            $dropdownMenu.show();
        }
    },
    onHover(event) {
        const $dropdownMenu = this.$element.find('.dropdown-menu');
        if ($dropdownMenu.is(':visible')) {
            $dropdownMenu.hide();
        } else {
            $dropdownMenu.show();
        }
    },
    onClose(event) {
        const $dropdownMenu = this.$element.find('.dropdown-menu');
        $dropdownMenu.hide();
    }
});
