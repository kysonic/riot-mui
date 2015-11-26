riot.tag('material-button', '<material-waves onclick="{{click}}" onmousedown="{{launch}}" center="{{opts[\'waves-center\']}}" rounded="{{opts[\'rounded\']}}" opacity="{{opts[\'waves-opacity\']}}" color="{{opts[\'waves-color\']}}" duration="{{opts[\'waves-duration\']}}"></material-waves> <div class="content"><yield></yield></div>', function(opts) {var _this = this;

// Dynamic attribute for using special styles.
this.dynamicAttributes = ['disabled'];
// Attributes
this.disabled = opts.disabled || false;
// Launch waves
this.launch = function (e) {
    if (!_this.disabled) _this.tags['material-waves'].trigger('launch', e);
};
// Trigger the click
this.click = function () {
    if (opts.link) window.location.href = opts.link;
    _this.trigger('click');
};
// Add mixin
this.mixin('dynamicAttributes');
});
riot.tag('material-card', '<div class="title" if="{{titleExist}}"> <content select=".material-card-title"></content> </div> <yield></yield>', function(opts) {var _this = this;

this.titleExist = false;
this.on('mount', function () {
    _this.update({ titleExist: !!_this.root.querySelector('.material-card-title') });
});
this.mixin('content');
});
riot.tag('material-checkbox', '<div class="{{checkbox:true,checked:checked}}" onclick="{{toggle}}"> <div class="checkmark"></div> </div> <div class="label" onclick="{{toggle}}"><yield></yield></div> <input type="hidden" name="{{opts.name}}" value="{{checked}}">', function(opts) {var _this = this;

this.checked = opts.checked || false;
// Attributes
this.disabled = opts.disabled || false;
/**
 * Toggle checkbox
 */
this.toggle = function () {
    if (_this.disabled) return false;
    _this.update({ checked: !_this.checked });
    _this.trigger('toggle', _this.checked);
};
});
riot.tag('material-combo', '<material-input name="input" ></material-input> <material-dropdown-list __selected="{{opts.selected}}" name="dropdown"></material-dropdown-list> <input type="hidden" value="{{value}}" name="{{opts.name}}"> <div name="options" hidden if="{{!isParsed}}"> <yield></yield> </div>', function(opts) {var _this = this;

// Basics
this.items = [];
this.isParsed = true;
this.title = null;
// Yielding
this.getOptions = function () {
    // Get all options if it exits
    Array.prototype.forEach.call(_this.options.children, function (option, key) {
        if (option.tagName.toLowerCase() == 'option') {
            var item = { title: option.innerHTML, value: option.getAttribute('value') };
            _this.items.push(item);
            // Set Selected
            if (option.getAttribute('isSelected') != null) {
                _this.tags.dropdown.update({ selected: key });
                _this.update({ value: item.value || item.title });
                _this.title = item.title;
            }
        }
    });
    // Submit items to the dropdown
    _this.tags.dropdown.update({ items: _this.items });
    // We should update value of material combo
    if (_this.tags.dropdown.selected) {
        _this.update({ hValue: _this.tags.dropdown.items[_this.tags.dropdown.selected].value || _this.tags.dropdown.items[_this.tags.dropdown.selected].title });
    }
    _this.update({ isParsed: true });
};
// Setup options
this.getOptions();
// Attributes
if (opts.items) {
    try {
        this.items = eval(opts.items) || [];
        if (this.items.length) this.tags.dropdown.update({ items: this.items });
    } catch (e) {
        console.error('Something wrong with your items. For details look at it - ' + e);
    }
}
/**
 * Ready
 */
this.on('mount', function () {
    // Defaults
    _this.tags.dropdown.root.style.top = _this.tags.input.root.getBoundingClientRect().height + 'px';
    _this.tags.input.update({ value: _this.title || (opts.defaulttext || 'Choose item') });
});
/**
 * When dropdown select event is working we
 * update material-input and hidden
 */
this.tags.dropdown.on('selectChanged', function (selected) {
    _this.update({ value: _this.tags.dropdown.items[selected].value || _this.tags.dropdown.items[selected].title });
    _this.tags.input.update({ value: _this.tags.dropdown.items[selected].title });
    // After animation end
    setTimeout(function () {
        _this.tags.dropdown.update({ items: _this.items });
    }, 200);
});
/**
 * When material-input value has been changed
 */
this.tags.input.on('valueChanged', function (value) {
    _this.tags.dropdown.update({ items: _this.filter('items', { title: value }) });
});
/**
 * If material-input focus has been changed
 * control dropdown opening
 */
this.tags.input.on('focusChanged', function (focus) {
    if (_this.tags.input.value == (opts.defaulttext || 'Choose item') && focus) {
        _this.tags.input.update({ value: '' });
    }
    if (_this.tags.input.value == '' && !focus) {
        _this.tags.input.update({ value: opts.defaulttext || 'Choose item' });
    }
    focus ? _this.tags.dropdown.open() : _this.tags.dropdown.close();
});
// Manage collection
this.mixin('collection');
});
riot.tag('material-dropdown', '<div name="dropdown" class="{{dropdown:true,opening:opening}}" if="{{opened}}"> <yield></yield> </div>', function(opts) {var _this = this;

// Basics
this.opened = opts.opened || false;
// Attributes
this.dropdown.classList.add(opts.animation || 'top');
/**
 * Open dropdown
 */
this.open = function () {
    _this.update({ opened: true, opening: true });
    setTimeout(function () {
        _this.update({ opening: false });
    }, 0);
};
/**
 * Close dropdown
 */
this.close = function () {
    _this.update({ opening: true });
    setTimeout(function () {
        _this.update({ opened: false });
    }, 200);
};
});
riot.tag('material-dropdown-list', '<ul class="{{dropdown-content:true,opening:opening}}" if="{{opened}}" > <li each="{{item,key in items}}" class="{{selected:parent.selected==key}}"> <span if="{{!item.link}}" onclick="{{parent.select}}">{{item.title}}</span> <a if="{{item.link}}" href="{{item.link}}" onclick="{{parent.select}}" title="{{item.title}}">{{item.title}}</a> </li> </ul> <div name="overlay" if="{{opts.extraclose && opened}}" onclick="{{close}}" class="material-dropdown-list-overlay"></div>', function(opts) {var _this = this;

// Basics
this.opened = false;
// Attributes
if (opts.items) {
    try {
        this.items = eval(opts.items) || [];
    } catch (e) {
        console.error('Something wrong with your items. For details look at it - ' + e);
    }
    this.update({ items: this.items });
}
// Set selected
if (opts.selected) {
    this.update({ selected: opts.selected });
}
/**
 * Select dropdown item
 * @param e
 */
this.select = function (e) {
    _this.update({ selected: e.item.key });
    _this.close();
    // Trigger event. It will help you to grab selected value from outside
    // of this component
    _this.trigger('selectChanged', e.item.key, e.item.item);
    return true;
    ///if(e.item.item.link) location.href = e.item.item.link;
};
/**
 * Open dropdown list
 */
this.open = function () {
    _this.update({ opened: true, opening: true });
    if (_this.opts.extraclose) document.body.appendChild(_this.overlay);
    setTimeout(function () {
        _this.update({ opening: false });
    }, 0);
};
/**
 * Close dropdown list
 */
this.close = function () {
    _this.update({ opening: true });
    setTimeout(function () {
        _this.update({ opened: false });
    }, 200);
};
});
riot.tag('material-input', '<div class="label-placeholder"></div> <div class="{{input-content:true,not-empty:value,error:error}}"> <label for="input" name="label" if="{{opts.label}}">{{opts.label}}</label> <input type="{{opts.type || \'text\'}}" __disabled="{{disabled}}" placeholder="{{opts.placeholder}}" onkeyup="{{changeValue}}" value="{{value}}" autocomplete="off" name="{{this.name}}"> <div class="iconWrapper" name="iconWrapper" if="{{opts.icon}}" > <material-button name="iconButton" center="true" waves-center="true" waves-color="{{opts[\'waves-color\']||\'#fff\'}}" rounded="true" waves-opacity="{{opts[\'waves-opacity\']||\'0.6\'}}" waves-duration="{{opts[\'waves-duration\']||\'600\'}}"> <yield></yield> </material-button> </div> </div> <div class="{{underline:true,focused:focused,error:error}}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>', function(opts) {var _this = this;

// Attributes
this.update({ value: opts.value || '' });
// For Validation Mixin
this.opts = opts;
// From options
this.disabled = opts.disabled || false;
this.name = opts.name || 'input';
// Not supported types
this.notSupportedTypes = ['date', 'color', 'datetime', 'month', 'range', 'time'];
if (this.notSupportedTypes.indexOf(opts.type) != -1) throw new Error('Sorry but we not support ' + date + ' type yet!');
// Icons
this.update({ showIcon: false });
/**
 * When element focus changed update expressions.
 */
this.changeFocus = function (e) {
    if (_this.disabled) return false;
    _this.update({ focused: _this['{{this.name}}'] == document.activeElement });
    _this.trigger('focusChanged', _this.focused, e);
};
/**
 * Change input value should change tag behavior.
 * @param e
 */
this.changeValue = function (e) {
    _this.update({ value: _this['{{this.name}}'].value });
    _this.trigger('valueChanged', _this['{{this.name}}'].value, e);
};
// Add event listeners to input. It is wat which will help us
// to provide focus\blur on material-input
this['{{this.name}}'].addEventListener('focus', this.changeFocus);
this['{{this.name}}'].addEventListener('blur', this.changeFocus);
// Validation
this.on('update', function (updated) {
    if (updated && updated.value != undefined) {
        if (_this.validationType) {
            _this.isValid(_this.validate(updated.value));
        }
    }
});
/**
 * Behevior after validation
 * @param isValid - (true/false)
 */
this.isValid = function (isValid) {
    _this.update({ error: !isValid });
};
this.mixin('validate');
});
riot.tag('material-navbar', '<div class="nav-wrapper"> <yield></yield> </div>', 'role="toolbar"', function(opts) {

});
riot.tag('material-pane', '<material-navbar riot-style="height:{{opts[\'material-navbar-height\'] || \'60px\'}};line-height: {{opts[\'material-navbar-height\'] || \'60px\'}};background-color:{{opts[\'material-navbar-color\'] || \'#ccc\'}}"> <content select=".material-pane-left-bar"></content> <content select=".material-pane-title"></content> <content select=".material-pane-right-bar"></content> </material-navbar> <div class="content"> <content select=".material-pane-content"></content> <yield></yield> </div>', function(opts) {
this.mixin('content');
});
riot.tag('material-popup', '<div name="popup" class="{{popup:true,opening:opening}}" if="{{opened}}"> <div class="content"> <content select=".material-popup-title"></content> <div class="close" onclick="{{close}}"> <i class="material-icons">close</i> </div> <yield></yield> </div> </div> <div class="overlay" onclick="{{close}}" if="{{opened}}"></div>', function(opts) {var _this = this;

// Basics
this.opened = opts.opened || false;
// Attributes
this.popup.classList.add(opts.animation || 'top');
/**
 * Ready
 */
this.on('mount', function () {
    // Transfer a root node to body
    document.body.appendChild(_this.root);
});
/**
 * Open dropdown
 */
this.open = function () {
    _this.update({ opened: true, opening: true });
    setTimeout(function () {
        _this.update({ opening: false });
    }, 0);
};
/**
 * Close dropdown
 */
this.close = function () {
    _this.update({ opening: true });
    setTimeout(function () {
        _this.update({ opened: false });
    }, 200);
};
this.mixin('content');
});
riot.tag('material-snackbar', '<div class="{{toast:true,error:toast.isError,opening:toast.opening}}" onclick="{{parent.removeToastByClick}}" each="{{toast,key in toasts}}" > {{toast.message}} </div>', function(opts) {var _this = this;

// Basics
this.toasts = [];
this.intervals = {};
/**
 * Add new toast in collection
 * @param toast
 */
this.addToast = function (toast, duration) {
    // Generate uniqe ID
    var toastID = _this.toastID = Math.random().toString(36).substring(7);
    // Create new toast and open it
    _this.toasts.push(Object.assign(toast, { opening: true, _id: toastID }));
    _this.update({ toasts: _this.toasts });
    // Opening
    setTimeout(function () {
        _this.toasts[_this.findToastKeyByID(toastID)].opening = false;
        _this.update({ toasts: _this.toasts });
    }, 50);
    // Close after ending of duration time
    _this.intervals[toastID] = setTimeout(function () {
        _this.removeToast(toastID);
    }, opts.duration || duration || 5000);
};
/**
 * Remove toast after
 * @param toastID
 */
this.removeToastAfterDurationEnding = function (toastID) {
    _this.removeToast(toastID);
};
/**
 * Helper. Allow to get key of toast (in toast array) by id
 * @param ID
 * @returns {*}
 */
this.findToastKeyByID = function (ID) {
    var toastKey = null;
    _this.toasts.forEach(function (toast, key) {
        if (toast._id == ID) toastKey = key;
    });
    return toastKey;
};
/**
 * Remove toast by click
 * @param e - event
 */
this.removeToastByClick = function (e) {
    var toastID = e.item.toast._id;
    clearInterval(_this.intervals[toastID]);
    _this.removeToast(toastID);
};
/**
 * Remove toast from snackbar
 * @param toastID
 */
this.removeToast = function (toastID) {
    // First we should make sure that a requested toast is exist
    if (_this.findToastKeyByID(toastID) != null) {
        _this.toasts[_this.findToastKeyByID(toastID)].opening = true;
        _this.update({ toasts: _this.toasts });
        // Wait a some time animation will end
        setTimeout(function () {
            _this.toasts.splice(_this.findToastKeyByID(toastID), 1);
            _this.update({ toasts: _this.toasts });
        }, 200);
    }
};
});
riot.tag('material-tabs', '<material-button each="{{tab,k in tabs}}" onclick="{{parent.onChangeTab}}" class="{{selected:parent.selected==k}}" waves-opacity="{{parent.opts[\'waves-opacity\']}}" waves-duration="{{parent.opts[\'waves-duration\']}}" waves-center="{{parent.opts[\'waves-center\']}}" waves-color="{{parent.opts[\'waves-color\']}}" > <div class="text" title="{{tab.title}}">{{parent.opts.cut ? parent.cut(tab.title) : tab.title}}</div> </material-button> <div class="line-wrapper" if="{{opts.useline}}"> <div class="line" name="line"></div> </div> <yield></yield>', function(opts) {var _this = this;

// Basics
this.selected = 0;
this.tabs = [];
// Attributes
if (opts.tabs) {
    var tabs = [];
    try {
        tabs = opts.tabs ? eval(opts.tabs) : [];
        this.tabs = tabs;
    } catch (e) {}
}
/**
 * Ready
 */
this.on('mount', function () {
    _this.setWidth();
    _this.setLinePosition();
});
/**
 * Set width on tab buttons and line
 * @param
 */
this.setWidth = function () {
    [].forEach.call(_this.root.querySelectorAll('material-button'), function (node) {
        node.style.width = _this.line.style.width = (100 / _this.tabs.length).toFixed(2) + '%';
    });
};
/**
 * Change selected tab by click on it.
 * @param e
 */
this.onChangeTab = function (e) {
    var selected = _this.tabs.indexOf(e.item.tab);
    _this.changeTab(selected);
};
/**
 * Change tab handler. Change selected and line position.
 * @param index
 */
this.changeTab = function (index) {
    _this.update({ selected: index });
    _this.setLinePosition();
    // Fire
    _this.trigger('tabChanged', _this.tabs[index], index);
};
/**
 * Set line left style.
 */
this.setLinePosition = function () {
    _this.line.style.left = _this.line.getBoundingClientRect().width * _this.selected + 'px';
};
/**
 * Cut symbols
 * @param title
 * @returns {string}
 */
this.cut = function (title) {
    return title.length > opts.cut ? title.substr(0, opts.cut) + '...' : title;
};
});
riot.tag('material-textarea', '<div class="label-placeholder"></div> <div class="{{textarea-content:true,not-empty:value,error:error}}"> <label for="{{opts.name}}" name="label" if="{{opts.label}}">{{opts.label}}</label> <div class="mirror" name="mirror"></div> <div class="textarea-container"> <textarea __disabled="{{disabled}}" name="{{opts.name}}" value="{{value}}"></textarea> </div> </div> <div class="{{underline:true,focused:focused,error:error}}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>', function(opts) {var _this = this;

// Defaults
this["{{opts.name}}"].scrollTop = this["{{opts.name}}"].scrollHeight;
// For Validation Mixin
this.opts = opts;
// From options
this.disabled = opts.disabled || false;
// Ready
this.on('mount', function () {
    // Set max height to mirror, if we have max-rows option.
    if (opts['max-rows']) _this.mirror.style.maxHeight = opts['max-rows'] * _this["{{opts.name}}"].getBoundingClientRect().height + 'px';
});
/**
 * When element focus changed update expressions.
 */
this.changeFocus = function (e) {
    if (_this.disabled) return false;
    var focused = _this["{{opts.name}}"] == document.activeElement;
    _this.update({ focused: focused });
    _this.trigger('focusChanged', focused);
};
/**
 * Change input value should change tag behavior.
 * @param e
 */
this.inputHandler = function (e) {
    var value = _this["{{opts.name}}"].value;
    _this.mirror.innerHTML = _this.format(value);
    _this.update({ value: value });
    _this.trigger('valueChanged', value);
};
// Add event listeners to input. It is wat which will help us
// to provide focus\blur on material-input
this["{{opts.name}}"].addEventListener('focus', this.changeFocus);
this["{{opts.name}}"].addEventListener('blur', this.changeFocus);
this["{{opts.name}}"].addEventListener('input', this.inputHandler);
// Validation
this.on('update', function (updated) {
    if (updated && updated.value != undefined) {
        if (_this.validationType) {
            _this.isValid(_this.validate(updated.value));
        }
    }
});
/**
 * Behevior after validation
 * @param isValid - (true/false)
 */
this.isValid = function (isValid) {
    _this.update({ error: !isValid });
};
/**
 * Format the value of textarea
 */
this.format = function (value) {
    return value.replace(/\n/g, '<br/>&nbsp;');
};
this.mixin('validate');
});
riot.tag('material-waves', '<div id="waves" name="waves"></div>', function(opts) {var _this3 = this;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Get Bound Class from riot mixin source
var Bound = riot.mixin('Bound');
/**
 * Wave class. Contain wave node and
 * all of waves logic.
 */

var Wave = (function (_Bound) {
    _inherits(Wave, _Bound);

    function Wave(container, opts, e) {
        _classCallCheck(this, Wave);

        _get(Object.getPrototypeOf(Wave.prototype), 'constructor', this).call(this);
        // Initialize
        if (!container) console.error('You should to set container to the wave!');
        this.container = container;
        // Throw the components options
        this.maxOpacity = opts.opacity || 0.6;
        this.duration = opts.duration || 750;
        this.color = opts.color || '#fff';
        this.center = opts.center || false;
        // And event
        this.event = e;
        // Find related parameters
        this.containerBound = this.receiveBound();
        this.maxScale = this.containerBound.size / 100 * 10;
        this.created = Date.now();
        // Start point (center\mouse)
        this.start = {};
        // Startup
        this.createNode();
        this.waveIn();
    }

    // Basics

    /**
     * Create node for wave
     */

    _createClass(Wave, [{
        key: 'createNode',
        value: function createNode() {
            this.wave = document.createElement('div');
            this.wave.classList.add('wave');
            this.container.appendChild(this.wave);
        }

        /**
         * Starting the wave ripple.
         */
    }, {
        key: 'waveIn',
        value: function waveIn() {
            var _this = this;

            if (this.center && !this.event) console.error('Setup at least mouse event... Or just set center attribute');
            // Starting point
            this.start.x = this.center ? this.containerBound.height / 2 : this.event.pageY - this.containerBound.offsetTop;
            this.start.y = this.center ? this.containerBound.width / 2 : this.event.pageX - this.containerBound.offsetLeft;
            // Set styles at next tick. Add a little delay to lovely retarded IE :D
            var isIE = window.navigator.userAgent.indexOf('Trident') !== -1;
            setTimeout(function () {
                return _this.setStyles(_this.maxOpacity);
            }, isIE ? 50 : 0);
        }

        /**
         * Fade out wave ripple. Just disappear...
         */
    }, {
        key: 'waveOut',
        value: function waveOut() {
            var _this2 = this;

            var delta = Date.now() - this.created;
            var deltaX = Math.round(this.duration / 2) - delta;
            var delay = deltaX > 0 ? deltaX : 0;
            setTimeout(function () {
                _this2.setStyles(0);
                setTimeout(function () {
                    if (_this2.wave.parentNode === _this2.container) {
                        _this2.container.removeChild(_this2.wave);
                    }
                }, _this2.duration);
            }, delay);
        }

        /**
         * Set styles to in\out
         * @param opacity - variable
         */
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

        /**
         * Convert object into style string.
         * @param o - object with styles
         * @returns {string}
         */
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
// Launch the ripple
this.on('launch', function (e) {
    _this3._waves.push(new Wave(_this3.waves, opts, e));
    if (!_this3._events.length) {
        _this3._events.push(e.target.addEventListener('mouseup', function () {
            return _this3.trigger('hold');
        }));
        _this3._events.push(e.target.addEventListener('mouseleave', function () {
            return _this3.trigger('hold');
        }));
    }
});
// Hold the ripple. After it will be removed.
this.on('hold', function () {
    // The last of waves
    if (_this3._waves[_this3._waves.length - 1]) _this3._waves[_this3._waves.length - 1].waveOut();
    if (_this3._waves[_this3._waves.length - 1]) _this3._waves.slice(_this3._waves.length - 1, 1);
});
});