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
riot.tag2('material-button', '<material-waves onclick="{click}" onmousedown="{launch}" center="{opts.wavesCenter}" rounded="{opts.rounded}" opacity="{opts.wavesOpacity}" color="{opts.wavesColor}" duration="{opts[\'waves-duration\']}"></material-waves> <div class="content"><yield></yield></div>', '', '', function(opts) {
var _this = this;

this.dynamicAttributes = ['disabled'];

this.disabled = opts.disabled || false;

this.launch = function (e) {
    if (!_this.disabled) _this.tags['material-waves'].trigger('launch', e);
};

this.tags['material-waves'].on('wavestart', function (wave) {
    _this.trigger('wavestart', wave);
});

this.tags['material-waves'].on('waveend', function () {
    _this.trigger('waveend');
});

this.click = function () {
    if (opts.link) window.location.href = opts.link;
    _this.trigger('click');
};

this.mixin('dynamicAttributes');
});
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
riot.tag2('material-card', '<div class="title" if="{titleExist}"> <content select=".material-card-title"></content> </div> <yield></yield>', '', '', function(opts) {
var _this = this;

this.titleExist = false;
this.on('mount', function () {
    _this.update({ titleExist: !!_this.root.querySelector('.material-card-title') });
});
this.mixin('content');
});
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
riot.tag2('material-checkbox', '<div class="{checkbox:true,checked:checked}" onclick="{toggle}"> <div class="checkmark"></div> </div> <div class="label" onclick="{toggle}"><yield></yield></div> <input type="hidden" name="{opts.name}" value="{checked}">', '', '', function(opts) {
var _this = this;

this.checked = opts.checked || false;

this.disabled = opts.disabled || false;

this.toggle = function () {
    if (_this.disabled) return false;
    _this.update({ checked: !_this.checked });
    _this.trigger('toggle', _this.checked);
};
});
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
riot.tag2('material-combo', '<material-input name="input"></material-input> <material-dropdown-list selected="{opts.selected}" name="dropdown"></material-dropdown-list> <input type="hidden" value="{value}" name="{opts.name || \'combo\'}"> <div name="options" hidden if="{!isParsed}"> <yield></yield> </div>', '', '', function(opts) {
var _this = this;

this.items = [];
this.isParsed = true;
this.title = null;
var lastValue = this.value;
var valueChanged = function valueChanged() {
    if (_this.value !== lastValue) {
        lastValue = _this.value;
        _this.root.dispatchEvent(new CustomEvent('change', { value: _this.value }));
    }
};

this.getOptions = function () {
    Array.prototype.forEach.call(_this.options.children, function (option, key) {
        if (option.tagName.toLowerCase() == 'option') {
            var item = { title: option.innerHTML, value: option.getAttribute('value') };
            _this.items.push(item);

            if (option.getAttribute('isSelected') != null) {
                _this.tags.dropdown.update({ selected: key });
                _this.update({ value: item.value || item.title });
                valueChanged();
                _this.title = item.title;
            }
        }
    });

    _this.tags.dropdown.update({ items: _this.items });

    if (_this.tags.dropdown.selected) {
        _this.update({ hValue: _this.tags.dropdown.items[_this.tags.dropdown.selected].value || _this.tags.dropdown.items[_this.tags.dropdown.selected].title });
    }
    _this.update({ isParsed: true });
    valueChanged();
};

this.getOptions();

if (opts.items) {
    try {
        this.items = eval(opts.items) || [];
        if (this.items.length) this.tags.dropdown.update({ items: this.items });
    } catch (e) {
        console.error('Something wrong with your items. For details look at it - ' + e);
    }
}

this.on('mount', function () {
    _this.tags.dropdown.root.style.top = _this.tags.input.root.getBoundingClientRect().height + 'px';
    _this.tags.input.update({ value: _this.title || opts.defaulttext || 'Choose item' });
});

this.tags.dropdown.on('selectChanged', function (selected) {
    _this.update({ value: _this.tags.dropdown.items[selected].value || _this.tags.dropdown.items[selected].title });
    valueChanged();
    _this.tags.input.update({ value: _this.tags.dropdown.items[selected].title });

    setTimeout(function () {
        _this.tags.dropdown.update({ items: _this.items });
    }, 200);
});

this.tags.input.on('valueChanged', function (value) {
    _this.tags.dropdown.update({ items: _this.filter('items', { title: value }) });
});

this.tags.input.on('focusChanged', function (focus) {
    if (_this.tags.input.value == (opts.defaulttext || 'Choose item') && focus) {
        _this.tags.input.update({ value: '' });
    }
    if (_this.tags.input.value == '' && !focus) {
        _this.tags.input.update({ value: opts.defaulttext || 'Choose item' });
    }
    focus ? _this.tags.dropdown.open() : null;
});

this.mixin('collection');
});

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
riot.tag2('material-dropdown', '<div name="dropdown" class="{dropdown:true,opening:opening}" if="{opened}"> <yield></yield> </div>', '', '', function(opts) {
var _this = this;

this.opened = opts.opened || false;

this.dropdown.classList.add(opts.animation || 'top');

this.open = function () {
    _this.update({ opened: true, opening: true });
    setTimeout(function () {
        _this.update({ opening: false });
    }, 0);
};

this.close = function () {
    _this.update({ opening: true });
    setTimeout(function () {
        _this.update({ opened: false });
    }, 200);
};
});
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
riot.tag2('material-dropdown-list', '<ul class="{dropdown-content:true,opening:opening}" if="{opened}"> <li each="{item,key in items}" class="{selected:parent.selected==key}"> <span if="{!item.link}" onclick="{parent.select}">{item.title}</span> <a if="{item.link}" href="{item.link}" onclick="{parent.select}" title="{item.title}">{item.title}</a> </li> </ul> <div name="overlay" if="{opts.extraclose && opened}" onclick="{close}" class="material-dropdown-list-overlay"></div>', '', '', function(opts) {
var _this = this;

this.opened = false;

if (opts.items) {
    try {
        this.items = eval(opts.items) || [];
    } catch (e) {
        console.error('Something wrong with your items. For details look at it - ' + e);
    }
    this.update({ items: this.items });
}

if (opts.selected) {
    this.update({ selected: opts.selected });
}

this.select = function (e) {
    _this.update({ selected: e.item.key });
    _this.close();

    _this.trigger('selectChanged', e.item.key, e.item.item);
    return true;
};

this.open = function () {
    _this.update({ opened: true, opening: true });
    if (_this.opts.extraclose) document.body.appendChild(_this.overlay);
    setTimeout(function () {
        _this.update({ opening: false });
    }, 0);
};

this.close = function () {
    _this.update({ opening: true });
    setTimeout(function () {
        _this.update({ opened: false });
    }, 200);
};
});
riot.tag2('material-navbar', '<div class="nav-wrapper"> <yield></yield> </div>', '', 'role="toolbar"', function(opts) {
});
riot.tag2('material-input', '<div class="label-placeholder"></div> <div class="{input-content:true,not-empty:value,error:error}"> <label for="input" name="label" if="{opts.label}">{opts.label}</label> <input type="{opts.type||\'text\'}" disabled="{disabled}" placeholder="{opts.placeholder}" onkeyup="{changeValue}" value="{value}" autocomplete="off" name="{opts.name||\'default-input\'}" required="{required}"> <div class="iconWrapper" name="iconWrapper" if="{opts.icon}"> <material-button name="iconButton" center="true" waves-center="true" waves-color="{opts[\'waves-color\']||\'#fff\'}" rounded="true" onclick="{iconClickHandler}" waves-opacity="{opts[\'waves-opacity\']||\'0.6\'}" waves-duration="{opts[\'waves-duration\']||\'600\'}"> <yield></yield> </material-button> </div> </div> <div class="{underline:true,focused:focused,error:error}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>', '', '', function(opts) {
var _this = this;

this.opts = opts;
this.required = "";

this.name = opts.name || 'input';

this.notSupportedTypes = ['date', 'color', 'datetime', 'month', 'range', 'time'];
if (this.notSupportedTypes.indexOf(opts.type) != -1) throw new Error('Sorry but we do not support ' + opts.type + ' type yet!');

this.update({ showIcon: false });

this.on('mount', function () {
    _this.update({
        value: opts.value || '',
        disabled: opts.disabled || false,
        required: opts.required || false
    });

    _this.n = opts.name || 'default-input';
    _this[_this.n].addEventListener('focus', _this.changeFocus);
    _this[_this.n].addEventListener('blur', _this.changeFocus);
});

this.changeFocus = function (e) {
    if (_this.disabled) return false;
    _this.update({ focused: _this[_this.n] == document.activeElement });
    _this.trigger('focusChanged', _this.focused, e);
    if (opts.focuschanged && typeof opts.focuschanged === "function") {
        opts.focuschanged(_this.focused);
    }
};

this.changeValue = function (e) {
    _this.update({ value: _this[_this.n].value });
    _this.trigger('valueChanged', _this[_this.n].value, e);
    if (opts.valuechanged && typeof opts.valuechanged === "function") {
        opts.valuechanged(_this[_this.n].value);
    }
};

this.iconClickHandler = function (e) {
    if (_this.opts.iconClicked && typeof _this.opts.iconClicked === 'function') _this.opts.iconClicked.call(_this, e);
    _this.trigger('iconClick', e);
};

this.on('update', function (updated) {
    if (updated && updated.value != undefined) {
        if (_this.validationType) {
            _this.isValid(_this.validate(updated.value));
        }
    }
});

this.isValid = function (isValid) {
    _this.update({ error: !isValid });
};
this.mixin('validate');
});

riot.tag2('material-pane', '<material-navbar style="height:{opts.materialNavbarHeight || \'60px\'};line-height: {opts.materialNavbarHeight || \'60px\'};background-color:{opts.materialNavbarColor || \'#ccc\'}"> <content select=".material-pane-left-bar"></content> <content select=".material-pane-title"></content> <content select=".material-pane-right-bar"></content> </material-navbar> <div class="content"> <content select=".material-pane-content"></content> <yield></yield> </div>', '', '', function(opts) {
this.mixin('content');
});
riot.tag2('material-popup', '<div name="popup" class="{popup:true,opening:opening}" if="{opened}"> <div class="content"> <content select=".material-popup-title"></content> <yield></yield> </div> <div select=".material-popup-action"></div> </div> <div class="overlay" onclick="{close}" if="{opened}"></div>', '', '', function(opts) {
var _this = this;

this.opened = opts.opened || false;

this.popup.classList.add(opts.animation || 'top');

this.on('mount', function () {
    document.body.appendChild(_this.root);
});

this.open = function () {
    _this.update({ opened: true, opening: true });
    setTimeout(function () {
        _this.update({ opening: false });
    }, 0);
};

this.close = function () {
    _this.update({ opening: true });
    setTimeout(function () {
        _this.update({ opened: false });
    }, 200);
};
this.mixin('content');
});
riot.tag2('material-snackbar', '<div class="{toast:true,error:toast.isError,opening:toast.opening}" onclick="{parent.removeToastByClick}" each="{toast,key in toasts}"> {toast.message} </div>', '', '', function(opts) {
var _this = this;

this.toasts = [];
this.intervals = {};

this.addToast = function (toast, duration) {
    var toastID = _this.toastID = Math.random().toString(36).substring(7);

    _this.toasts.push(Object.assign(toast, { opening: true, _id: toastID }));
    _this.update({ toasts: _this.toasts });

    setTimeout(function () {
        _this.toasts[_this.findToastKeyByID(toastID)].opening = false;
        _this.update({ toasts: _this.toasts });
    }, 50);

    _this.intervals[toastID] = setTimeout(function () {
        _this.removeToast(toastID);
    }, opts.duration || duration || 5000);
};

this.removeToastAfterDurationEnding = function (toastID) {
    _this.removeToast(toastID);
};

this.findToastKeyByID = function (ID) {
    var toastKey = null;
    _this.toasts.forEach(function (toast, key) {
        if (toast._id == ID) toastKey = key;
    });
    return toastKey;
};

this.removeToastByClick = function (e) {
    var toastID = e.item.toast._id;
    clearInterval(_this.intervals[toastID]);
    _this.removeToast(toastID);
};

this.removeToast = function (toastID) {
    if (_this.findToastKeyByID(toastID) != null) {
        _this.toasts[_this.findToastKeyByID(toastID)].opening = true;
        _this.update({ toasts: _this.toasts });

        setTimeout(function () {
            _this.toasts.splice(_this.findToastKeyByID(toastID), 1);
            _this.update({ toasts: _this.toasts });
        }, 200);
    }
};
});
riot.tag2('material-spinner', '<svg class="loader-circular" height="50" width="50"> <circle class="loader-path" cx="25" cy="25.2" r="19.9" fill="none" stroke-width="{opts.strokewidth||3}" stroke-miterlimit="10"></circle> </svg>', '', '', function(opts) {
});
riot.tag2('material-tabs', '<material-button each="{tab,k in tabs}" onclick="{parent.onChangeTab}" class="{selected:parent.selected==k}" waves-opacity="{parent.opts.wavesOpacity}" waves-duration="{parent.opts.wavesDuration}" waves-center="{parent.opts.wavesCenter}" waves-color="{parent.opts.wavesColor}"> <div class="text" title="{tab.title}">{parent.opts.cut ? parent.cut(tab.title) : tab.title}</div> </material-button> <div class="line-wrapper" if="{opts.useline}"> <div class="line" name="line"></div> </div> <yield></yield>', '', '', function(opts) {
var _this = this;

this.selected = 0;
this.tabs = [];

if (opts.tabs) {
    var tabs = [];
    try {
        tabs = opts.tabs ? eval(opts.tabs) : [];
        this.tabs = tabs;
    } catch (e) {}
}

this.on('mount', function () {
    _this.setWidth();
    _this.setLinePosition();
});

this.setWidth = function () {
    [].forEach.call(_this.root.querySelectorAll('material-button'), function (node) {
        node.style.width = _this.line.style.width = (100 / _this.tabs.length).toFixed(2) + '%';
    });
};

this.onChangeTab = function (e) {
    var selected = _this.tabs.indexOf(e.item.tab);
    _this.changeTab(selected);
};

this.changeTab = function (index) {
    _this.update({ selected: index });
    _this.setLinePosition();

    _this.trigger('tabChanged', _this.tabs[index], index);
    if (opts.tabchanged && typeof opts.tabchanged === "function") {
        opts.tabchanged(_this.tabs[index], index);
    }
};

this.setLinePosition = function () {
    _this.line.style.left = (100 / _this.tabs.length).toFixed(2) * _this.selected + '%';
};

this.cut = function (title) {
    return title.length > opts.cut ? title.substr(0, opts.cut) + '...' : title;
};
});
riot.tag2('material-textarea', '<div class="label-placeholder"></div> <div class="{textarea-content:true,not-empty:value,error:error}"> <label for="textarea" name="label" if="{opts.label}">{opts.label}</label> <div class="mirror" name="mirror"></div> <div class="textarea-container"> <textarea disabled="{disabled}" name="{opts.name||\'default-textarea\'}" value="{value}"></textarea> </div> </div> <div class="{underline:true,focused:focused,error:error}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>', '', '', function(opts) {
var _this = this;

this.opts = opts;

this.disabled = opts.disabled || false;

this.on('mount', function () {
    if (opts.maxRows) _this.mirror.style.maxHeight = opts.maxRows * _this[_this.n].getBoundingClientRect().height + 'px';
    _this.n = opts.name || 'default-textarea';

    _this[_this.n].scrollTop = _this[_this.n].scrollHeight;

    _this[_this.n].addEventListener('focus', _this.changeFocus);
    _this[_this.n].addEventListener('blur', _this.changeFocus);
    _this[_this.n].addEventListener('input', _this.inputHandler);
});

this.changeFocus = function (e) {
    if (_this.disabled) return false;
    var focused = _this[_this.n] == document.activeElement;
    _this.update({ focused: focused });
    _this.trigger('focusChanged', focused);
};

this.inputHandler = function (e) {
    var value = _this[_this.n].value;
    _this.mirror.innerHTML = _this.format(value);
    _this.update({ value: value });
    _this.trigger('valueChanged', value);
};

this.on('update', function (updated) {
    if (updated && updated.value != undefined) {
        if (_this.validationType) {
            _this.isValid(_this.validate(updated.value));
        }
    }
});

this.isValid = function (isValid) {
    _this.update({ error: !isValid });
};

this.format = function (value) {
    return value.replace(/\n/g, '<br/>&nbsp;');
};
this.mixin('validate');
});
riot.tag2('material-waves', '<div id="waves" name="waves"></div>', '', '', function(opts) {
var _this3 = this;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wave = (function (_Bound) {
    _inherits(Wave, _Bound);

    function Wave(container, opts, e) {
        _classCallCheck(this, Wave);

        _get(Object.getPrototypeOf(Wave.prototype), 'constructor', this).call(this);

        if (!container) console.error('You should set container to the wave!');
        this.container = container;

        this.maxOpacity = opts.opacity || 0.6;
        this.duration = opts.duration || 750;
        this.color = opts.color || '#fff';
        this.center = opts.center || false;

        this.event = e;

        this.containerBound = this.receiveBound();
        this.maxScale = this.containerBound.size / 100 * 10;
        this.created = Date.now();

        this.start = {};

        this.createNode();
        this.waveIn();
    }

    _createClass(Wave, [{
        key: 'createNode',
        value: function createNode() {
            this.wave = document.createElement('div');
            this.wave.classList.add('wave');
            this.container.appendChild(this.wave);
        }
    }, {
        key: 'waveIn',
        value: function waveIn() {
            var _this = this;

            if (this.center && !this.event) console.error('Setup at least mouse event... Or just set center attribute');

            this.start.x = this.center ? this.containerBound.height / 2 : this.event.pageY - this.containerBound.offsetTop;
            this.start.y = this.center ? this.containerBound.width / 2 : this.event.pageX - this.containerBound.offsetLeft;

            var isIE = window.navigator.userAgent.indexOf('Trident') !== -1;
            setTimeout(function () {
                return _this.setStyles(_this.maxOpacity);
            }, isIE ? 50 : 0);
        }
    }, {
        key: 'waveOut',
        value: function waveOut(cb) {
            var _this2 = this;

            var delta = Date.now() - this.created;
            var deltaX = Math.round(this.duration / 2) - delta;
            var delay = deltaX > 0 ? deltaX : 0;
            setTimeout(function () {
                _this2.setStyles(0);
                setTimeout(function () {
                    if (_this2.wave.parentNode === _this2.container) {
                        _this2.container.removeChild(_this2.wave);
                        cb();
                    }
                }, _this2.duration);
            }, delay);
        }
    }, {
        key: 'setStyles',
        value: function setStyles(opacity) {
            this.wave.setAttribute('style', this.convertStyle({
                'top': this.start.x + 'px',
                'left': this.start.y + 'px',
                'transform': 'scale(' + this.maxScale + ')',
                'transition-duration': this.duration + 'ms',
                'transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
                'background': this.color,
                'opacity': opacity
            }));
        }
    }, {
        key: 'convertStyle',
        value: function convertStyle(o) {
            var style = '';
            Object.keys(o).forEach(function (key) {
                if (o.hasOwnProperty(key)) {
                    style += key + ':' + o[key] + ';';
                }
            });
            return style;
        }
    }]);

    return Wave;
})(Bound);

this._waves = [];
this._events = [];

this.on('launch', function (e) {
    var wave = new Wave(_this3.waves, opts, e);
    _this3._waves.push(wave);
    _this3.trigger('wavestart', wave);
    if (_this3.parent && _this3.parent.opts && _this3.parent.opts.wavestart) {
        _this3.parent.opts.wavestart(wave);
    }
    if (!_this3._events.length) {
        _this3._events.push(e.target.addEventListener('mouseup', function () {
            return _this3.trigger('hold');
        }));
        _this3._events.push(e.target.addEventListener('mouseleave', function () {
            return _this3.trigger('hold');
        }));
    }
});

this.on('hold', function () {
    if (_this3._waves[_this3._waves.length - 1]) _this3._waves[_this3._waves.length - 1].waveOut(_this3.waveOut);
    if (_this3._waves[_this3._waves.length - 1]) _this3._waves.slice(_this3._waves.length - 1, 1);
});

this.waveOut = function () {
    _this3.trigger('waveend');

    if (_this3.parent && _this3.parent.opts && _this3.parent.opts.waveend) {
        _this3.parent.opts.waveend();
    }
};
});
