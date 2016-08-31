import watching from '../watching';
import autosize from 'autosize';

watching('textarea', {
    init() {
        autosize(this.element);
    }
})
