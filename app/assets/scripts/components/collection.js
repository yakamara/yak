import watching from '../util/watching';
import $ from 'jquery';

watching('[data-collection]', {
    init() {
        this.$element = $(this.element);
        this.index = this.$element.data('max-index');

        this.$element.on('click', 'button[data-add]', event => this.add(event));
        this.$element.on('click', 'button[data-remove]', event => this.remove(event));
    },

    add() {
        ++this.index;
        const $newField = $(this.$element.data('prototype').replace(/__name__/g, this.index));
        this.$element.find('[data-items]').append($newField);
    },

    remove(event) {
        $(event.target).closest('[data-item]').remove();
    }
});
