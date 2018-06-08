import $ from 'jquery';

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

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

const selectors = [];

const observer = new MutationObserver(objects => {
    objects.forEach(object => {
        for (let node of object.addedNodes) {
            if (Node.ELEMENT_NODE !== node.nodeType) {
                continue;
            }

            selectors.forEach(watching => {
                if (node.matches(watching.selector)) {
                    watching.createInstance(node);
                }
                watching.createInstances(node.querySelectorAll(watching.selector));
            });
        }
    });
});

observer.observe(document, {
    childList: true,
    subtree: true
});

const Watching = {
    create(selector, definition) {
        const base = Object.create(this);

        extend(base, definition);

        base.first = true;
        base.selector = selector;

        selectors.push(base);

        base.createInstances(document.querySelectorAll(selector));
    },

    createInstances(elements) {
        for (let element of elements) {
            this.createInstance(element);
        }
    },

    createInstance(element) {
        if (this.first) {
            this.config();
            this.first = false;
        }

        const instance = Object.create(this, {
            element: {
                value: element,
                writable: false
            },
            $element: {
                value: $(element),
                writable: false
            }
        });

        instance.init();
    },

    config() {},

    init() {}
};

export default (selector, definition) => Watching.create(selector, definition);
