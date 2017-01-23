import watching from '../util/watching';

import $ from 'jquery';
window.jQuery = $;

require('bootstrap-sass/assets/javascripts/bootstrap/tooltip');

watching('[data-toggle~=tooltip]', {
    init() {
        const $element = $(this.element);

        let $container = $element.parent();
        if ($container.closest('.table-responsive').length) {
            $container = $container.closest('.table-responsive').parent().parent();
        }

        $element.tooltip({
            placement: 'top',
            container: $container
        });
    }
});
