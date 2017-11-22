import watching from '../util/watching';
import $ from 'jquery';


watching('img', {
    init() {
        this.$current = null;

        if (this.$element.prop('complete')) {
            this.logSrc();
        } else {
            this.$element.on('load', event => this.logSrc());
        }

        setTimeout(() => {
            $(window).resize(event => this.onResize());
        }, 300);
    },

    logSrc() {
        let $src = '';
        if (typeof this.element.currentSrc === "undefined" ) {
            //Old browser
            $src = this.$element.src;
        } else {
            //Modern browser
            $src = this.element.currentSrc;
        }

        if (this.$current) {
            if (this.$current === $src) {
                return;
            }
        }
        this.$current = $src;
        console.log(this.$current);
    },

    onResize() {
        if (!this.$current) {
            return;
        }
        this.logSrc();
    }
});
