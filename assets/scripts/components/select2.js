import watching from '../util/watching';
import $ from 'jquery';
import select2 from 'select2';

// https://github.com/select2/select2/issues/5053#issuecomment-333816006
select2(window, $);

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

        this.$element.on('select2:open', event => {
            document.querySelector('.select2-container--open input.select2-search__field').focus();
        });
    }
});
