import watched from 'watched';

function extend(obj) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (source) {
        if (source) {
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    var descriptor = Object.getOwnPropertyDescriptor(source, prop);
                    Object.defineProperty(obj, prop, descriptor);
                }
            }
        }
    });
    return obj;
}

const Watching = {
    create(selector, definition) {
        const base = Object.create(this);

        extend(base, definition);

        const elements = watched(selector);

        elements.forEach(element => this.createInstance(base, element));
        elements.on('added', elements => {
            elements.forEach(element => {
                // TODO workaround for "watched" bug
                if (element.matches(selector)) {
                    this.createInstance(base, element);
                }
            });
        });
    },

    createInstance(base, element) {
        const instance = Object.create(base, {
            element: {
                value: element,
                writable: false
            }
        });

        instance.init();
    },

    init() {}
};

export default (selector, definition) => Watching.create(selector, definition);
