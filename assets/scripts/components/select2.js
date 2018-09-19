import watching from '../util/watching';
import $ from 'jquery';
import 'select2';

window.jQuery = $;

require('select2/dist/js/i18n/de');

watching('select', {
    init() {
        var $element = $(this.element);

        if ($element.next().hasClass('select2')) {
            $element.next().remove();
        }

        const options = {
            minimumResultsForSearch: 5,
            // allowClear: !$element.find('option:first').val(),
            language: 'de',
            // theme: "bootstrap",
            width: null,
        };

        if ($element.is('[data-allow-add]')) {
            options.minimumResultsForSearch = 0;
            options.tags = true;
        }

        $element.select2(options);
    }
});
