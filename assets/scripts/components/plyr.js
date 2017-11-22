import watching from '../util/watching';
import $ from 'jquery';
// const Plyr = require('plyr');
import plyr from 'plyr';

window.jQuery = $;

watching('.js-player:not(.plyr__video-wrapper)', {
    init() {
        let instance = plyr.setup(this.element)[0];
        // console.log('Plyr Instanz');
        // console.log(instance);
        instance
            .on('pause, ended', event => this.showDescription(event))
            .on('playing', event => this.hideDescription(event));

        this.description = this.$element.closest('.video-card').find('.card-content');
    },
    showDescription() {
        this.description.show();
    },
    hideDescription() {
        this.description.hide();
    }
});

watching('.js-audio-player', {
    init() {
        console.log(this.element);
        let instance = plyr.setup(this.element)[0];
    }
});
