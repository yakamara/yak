import watching from '../util/watching';
import $ from 'jquery';

watching('[data-expandable-section]', {
    init() {
        let scroll = false;
        this.$items = this.$element.find('[data-expandable-item]');
        this.$current = null;

        this.$items.find('[data-expandable-toggle]').click(event => this.onClickToggle(event, scroll));
        this.$items.find('[data-expandable-close]').click(event => this.close(scroll));

        this.$window = $(window);
        this.$body = $('body');

        this.$window.resize(event => this.onResize());

        setTimeout(() => {
            this.$items.filter('[data-expand]').find('[data-expandable-toggle]').trigger('click');
        }, 300);
    },

    onClickToggle(event, scroll = true) {
        const $item = $(event.currentTarget).closest('[data-expandable-item]');
        const $current = this.$current;

        if (this.$current) {
            if ($item[0] === $current[0]) {
                this.close(scroll);
                return;
            }

            this.close(false);
        }

        this.$current = $item;
        this.$current.find('[data-expandable-refresh]').click(event => this.onResize());

        const $content = $item.find('[data-expandable-content]');
        const height = $content.prop('scrollHeight');

        // $item.addClass('expanded').css('padding-bottom', height);
        $content.slideDown('slow', function() {
            $item.addClass('expanded');
        });

        if (scroll) {
            const winHeight = this.$window.height();
            let position;

            if (winHeight > $item.outerHeight()) {
                position = $item.offset().top - 30;
            } else if (winHeight > height) {
                position = $content.offset().top - winHeight + height;
            } else {
                position = $content.offset().top;
            }

            $('html,body').animate({scrollTop : position}, 300);
        }
    },

    onResize() {
        if (!this.$current) {
            return;
        }

        this.$current.css('padding-bottom', this.$current.find('[data-expandable-content]').prop('scrollHeight'));
    },

    close(scroll = true) {
        const $item = this.$current;
        const $content = $item.find('[data-expandable-content]');

        $content.slideUp('fast', function() {
            $item.removeClass('expanded').removeAttr('style');
        });

        this.$current = null;

        if (scroll) {
            $('html,body').animate({scrollTop : $item.offset().top - 30}, 300);
        }
    }
});
