import watching from '../util/watching';
import $ from 'jquery';
import 'bootstrap-daterangepicker';
import 'jquery.inputmask';
import moment from 'moment';
import moment_de from "moment/locale/de";

moment.locale('de', moment_de);

watching('input.input-date:not([readonly])', {
    init() {
        var $input = $(this.element);

        $input.daterangepicker({
            minDate: $input.data('min') ? new Date($input.data('min')) : moment().startOf('year').subtract(100, 'year'),
            maxDate: $input.data('max') ? new Date($input.data('max')) : moment().endOf('year').add(20, 'year'),
            singleDatePicker: true,
            showDropdowns: true,
            autoUpdateInput: false,
            showWeekNumbers: true,
            locale: {
                format: 'DD.MM.YYYY'
            }
        }).on('apply.daterangepicker', function (event, picker) {
            var date = picker.startDate.format('DD.MM.YYYY');
            $input.inputmask('setvalue', date).trigger('change');
        }).inputmask('99.99.9999');
    }
});
