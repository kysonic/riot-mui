/**
 * Bound class contain methods for
 * receiving bounds of DOM element.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Bound = (function () {
    function Bound() {
        _classCallCheck(this, Bound);
    }

    _createClass(Bound, [{
        key: 'receiveBound',

        /**
         * Get Bounds
         * @returns {*}
         */
        value: function receiveBound() {
            if (!this.container) console.error('Yor class must contain a container. It is DOM Element. Define please this.container property.');
            var document,
                window,
                box,
                doc = this.container && this.container.ownerDocument;
            // Get document
            document = doc.documentElement;
            // Get container
            if (typeof this.container.getBoundingClientRect !== typeof undefined) {
                box = this.container.getBoundingClientRect();
            }
            window = this.getWindow(doc);
            // Return BoundingRect with additional properties.
            return this.mix(box, {
                size: Math.max(box.width, box.height),
                offsetTop: box.top + window.pageYOffset - document.clientTop,
                offsetLeft: box.left + window.pageXOffset - document.clientLeft
            });
        }

        /**
         * Window or not?
         * @param o - supposing object
         * @returns {boolean}
         */
    }, {
        key: 'isWindow',
        value: function isWindow(o) {
            return o !== null && o === o.window;
        }

        /**
         * Get window method
         * @param e - supposing object
         * @returns {*}
         */
    }, {
        key: 'getWindow',
        value: function getWindow(o) {
            return this.isWindow(o) ? o : o.nodeType === 9 && o.defaultView;
        }

        /**
         * Simple mixin. Unfortunately, babel doesn't support Object.assign \ or mixin
         * @param so
         * @param to
         * @returns {*}
         */
    }, {
        key: 'mix',
        value: function mix(so, to) {
            for (var key in so) {
                // only copy if not already present
                if (!(key in to)) {
                    to[key] = so[key];
                }
            }
            return to;
        }
    }]);

    return Bound;
})();

riot.mixin('Bound', Bound);
'use strict';

var CollectionMixin = {
    /**
     * Filter collection by criteria
     * @params prop - collection name
     * @params criteria - object (Which field should be filtred)
     */
    filter: function filter(prop, criteria) {
        return this[prop].filter(function (item) {
            var criteriaPass = false;
            Object.keys(criteria).forEach(function (k) {
                var v = criteria[k];
                var regexp = new RegExp('' + v, 'i');
                criteriaPass = regexp.test(item[k]);
            });
            return criteriaPass;
        });
    },
    /**
     * Find something in collection
     * @params prop - collection name
     * @params criteria - object (Which field should be filtred)
     */
    find: function find(data, criteria) {
        var searched = {};
        var i = 0;
        data.forEach(function (e) {
            Object.keys(criteria).forEach(function (k) {
                var v = criteria[k];
                if (e[k] == v) {
                    searched.e = e;
                    searched.k = i;
                }
            });
            i++;
        });
        return searched;
    }
};

riot.mixin('collection', CollectionMixin);
'use strict';

var Content = {
    init: function init() {
        var _this = this;

        this.on('mount', function () {
            [].forEach.call(_this.root.querySelectorAll('content'), function (node) {
                var selector = node.getAttribute('select');
                [].forEach.call(_this.root.querySelectorAll(selector), function (content) {
                    node.parentNode.insertBefore(content, node.nextSibling);
                });
                node.parentNode.removeChild(node);
            });
        });
    }
};
riot.mixin('content', Content);
/**
 * The mixin ables to update root tag attributes
 * if in this.dynamicAttributes array contains
 * name of attribute, which equals variable into tag instance
 * Example:
 * <my-tag disabled="true"></my-tag>
 * <my-tag>
 *     ....
 *     <script>
 *         this.disabled = true;
 *         this.dynamicAttributes = ['disabled'];
 *         setTimeout(function(){
 *              this.update({disabled:false});
 *         }.bind(this),1000);
 *     </script>
 * </my-tag>
 * In this example disabled attribute of my-tag
 * will be changed after 1s and we will see following HTML
 * <my-tag disabled="false"></my-tag>
 */
'use strict';

var DynamicAttributesMixin = {
    init: function init() {
        var _this = this;

        this.on('update', function (updated) {
            if (updated && _this.dynamicAttributes) {
                _this.dynamicAttributes.forEach(function (key) {
                    if (updated[key] != undefined) {
                        _this.root.setAttribute(key, updated[key]);
                    }
                });
            }
        });
    }
};

riot.mixin('dynamicAttributes', DynamicAttributesMixin);
'use strict';

var RiotHelpers = {
    /**
     * Find tag in pack
     */
    findTag: function findTag(pack, name) {
        var searched = null;
        pack.forEach(function (tag) {
            if (tag.root.getAttribute('name').toLowerCase() == name.toLowerCase() || tag.root.tagName.toLowerCase() == name.toLowerCase()) {
                searched = tag;
            }
        });
        return searched;
    },
    /**
     * By the default riot don't support a camel case options
     * but in some cases we just use camel case, like a options
     * for instance
     */
    turnHyphensOptsToCamelCase: function turnHyphensOptsToCamelCase(opts) {
        for (var p in opts) {
            if (/-/.test(p)) {
                var camelCased = p.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });
                opts[camelCased] = opts[p];
                delete opts[p];
            }
        }
    }
};

riot.findTag = RiotHelpers.findTag;

riot.mixin('helpers', RiotHelpers);
'use strict';

var ValidateMixin = Object.defineProperties({
    init: function init() {
        if (!this.opts) console.debug('Sorry, but for using validate mixin you should add following code in your component: this.opts = opts;');
        if (this.opts && this.opts.valid) {
            this.validationType = typeof this[this.opts.valid] == 'function' ? 'Function' : 'Regexp';
            if (this.validationType === 'Regexp') {
                try {
                    this.validationRegexp = eval(this.opts.valid);
                } catch (e) {
                    throw new Error('Something wrong with your regular expression!. Checkout --- ' + e);
                }
            }
            if (this.validationType === 'Function') {
                this.validationFunction = this[this.opts.valid] || false;
            }
        } else if (this.opts && Object.keys(this.base).indexOf(this.opts.type) != -1) {
            this.validationType = 'Type';
        }
    },
    validate: function validate(value) {
        if (this.validationType) {
            return this['validateBy' + this.validationType](value);
        }
        return null;
    },
    validateByFunction: function validateByFunction(value) {
        if (this.validationFunction) {
            return this.validationFunction(value);
        }
    },
    validateByRegexp: function validateByRegexp(value) {
        if (this.validationRegexp) {
            return this.validationRegexp.test(value);
        }
    },
    validateByType: function validateByType(value) {
        return this.base[this.opts.type].test(value);
    }
}, {
    base: {
        get: function get() {
            return {
                'email': /^(([\w\.\-_]+)@[\w\-\_]+(\.\w+){1,}|)$/i,
                'number': /^(\d+|)$/i,
                'tel': /^((\+|\d)?([\d\-\(\)\#])|)+$/i,
                'url': /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/i
            };
        },
        configurable: true,
        enumerable: true
    }
});

riot.mixin('validate', ValidateMixin);