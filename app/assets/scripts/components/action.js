import watching from '../util/watching';
import $ from 'jquery';

watching('button[data-action]', {
    init() {
        this.element.addEventListener('click', this.onClick.bind(this));
    },

    onClick() {
        const data = [{name: 'action', value: this.element.dataset.action}];

        $.ajax({
            url: this.element.dataset.url,
            method: 'POST',
            data: data,
        }).done(function (data, textStatus, response) {
            window.location.reload();
        }).fail(function (jqXHR) {
            alert('Es ist ein Fehler aufgetreten!');
        });
    }
});
