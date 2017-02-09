/*
* indentifier   data-yfilter    contents all filter-items
* param         data-item       filter item selector (.filter-item)
* param         data-toggle     selector for filter buttons
*
* Use
* <ul class="filters">
*     <li data-filter="*">Alle</li>
*     <li data-filter="A">A</li>
*     <li data-filter="B">B</li>
* </ul>
* <div data-yfilter data-item=".filter-item" data-toggle=".filters">
*     <div class="filter-item"> ... </div>
*     <div class="filter-item"> ... </div>
*     <div class="filter-item"> ... </div>
* </div>
*
* */
import watching from '../util/watching';
import $ from 'jquery';
window.jQuery = $;

window.getSize = require('get-size');
const Masonry = require('masonry-plus');

watching('[data-yfilter]', {
    init() {
        let item = this.$element.data('item');
        this.masonry = new Masonry(this.element, {
            'itemSelector': item,
            'columnWidth': item
        });

        this.filters = this.$element.data('toggle');
        $(this.filters).find('[data-filter]').on('click', event => this.filter(event));

    },

    filter(event) {
        this.masonry.layout({
            filter: $(event.target).data('filter')
        });
    }
});

