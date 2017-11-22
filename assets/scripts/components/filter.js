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

require('imagesloaded');

$(window).on("load", function() {
    watching('[data-yfilter]', {
        init() {
            let item = this.$element.data('item');
            this.masonry = new Masonry(this.element, {
                'itemSelector': item,
                'columnWidth': item
            });

            this.filters = this.$element.data('toggle');
            let $filters = $(this.filters);
            $filters.find('[data-filter]').on('click', event => this.filter(event));

            let $active = $filters.find('.active').not('[data-filter="*"]');
            if ($active.length > 0) {
                $active.trigger('click');
            } else {
                $filters.find('[data-filter="*"]').not('.active').addClass('active');
            }

            this.$element.imagesLoaded().progress(() => {
                this.masonry.layout();
            });
        },

        filter(event) {
            const filter = $(event.target).data('filter');
            this.masonry.layout({
                filter: filter
            });

            this.$element.trigger('filter:changed', [filter]);

            $(this.filters).find('.active').removeClass('active');
            $(event.target).addClass('active');
        }
    });
});

