import watching from '../util/watching';
import autosize from 'autosize';

watching('textarea', {
    init() {
        autosize(this.element);
    }
})
