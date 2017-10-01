/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Bound class contain methods for
 * receiving bounds of DOM element.
 */
var Bound = function () {
    function Bound() {
        _classCallCheck(this, Bound);
    }

    /**
     * Get Bounds
     * @returns {*}
     */
    Bound.prototype.receiveBound = function receiveBound() {
        if (!this.container) console.error('Yor class must contain a container. It is DOM Element. Define please this.container property.');
        var document,
            window,
            box,
            doc = this.container && this.container.ownerDocument;
        // Get document
        document = doc.documentElement;
        // Get container
        if (_typeof(this.container.getBoundingClientRect) !== ( true ? 'undefined' : _typeof(undefined))) {
            box = this.container.getBoundingClientRect();
        }
        window = this.getWindow(doc);
        // Return BoundingRect with additional properties.
        return this.mix(box, {
            size: Math.max(box.width, box.height),
            offsetTop: box.top + window.pageYOffset - document.clientTop,
            offsetLeft: box.left + window.pageXOffset - document.clientLeft
        });
    };

    /**
     * Window or not?
     * @param o - supposing object
     * @returns {boolean}
     */


    Bound.prototype.isWindow = function isWindow(o) {
        return o !== null && o === o.window;
    };

    /**
     * Get window method
     * @param e - supposing object
     * @returns {*}
     */


    Bound.prototype.getWindow = function getWindow(o) {
        return this.isWindow(o) ? o : o.nodeType === 9 && o.defaultView;
    };

    /**
     * Simple mixin. Unfortunately, babel doesn't support Object.assign \ or mixin
     * @param so
     * @param to
     * @returns {*}
     */


    Bound.prototype.mix = function mix(so, to) {
        for (var key in so) {
            // only copy if not already present
            if (!(key in to)) {
                to[key] = so[key];
            }
        }
        return to;
    };

    return Bound;
}();

exports.default = Bound;


riot.mixin('Bound', Bound);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-button', '<material-waves onclick="{click}" onmousedown="{launch}" center="{opts.wavesCenter}" rounded="{opts.rounded}" opacity="{opts.wavesOpacity}" color="{opts.wavesColor}" duration="{opts[\'waves-duration\']}" ref="material-waves"></material-waves> <div class="content"><yield></yield></div>', '', '', function (opts) {
    var _this = this;

    // Dynamic attribute for using special styles.
    this.dynamicAttributes = ['disabled'];
    // Attributes
    this.disabled = opts.disabled || false;
    // Launch waves
    this.launch = function (e) {
        if (!_this.disabled) _this.refs['material-waves'].trigger('launch', e);
    };
    this.on('mount', function () {
        /**
         * When wave will be starting invoke appropriate event
         */
        _this.refs['material-waves'].on('wavestart', function (wave) {
            _this.trigger('wavestart', wave);
        });
        /**
         * When wave will end invoke appropriate event
         */
        _this.refs['material-waves'].on('waveend', function () {
            _this.trigger('waveend');
        });
    });
    // Trigger the click
    this.click = function () {
        if (opts.link) window.location.href = opts.link;
        _this.trigger('click');
    };
    // Add mixin
    this.mixin('dynamicAttributes');
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-card', '<div class="title" if="{titleExist}"> <content select=".material-card-title"></content> </div> <yield></yield>', '', '', function (opts) {
    var _this = this;

    this.titleExist = false;
    this.on('mount', function () {
        _this.update({ titleExist: !!_this.root.querySelector('.material-card-title') });
    });
    this.mixin('content');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-checkbox', '<div class="{checkbox:true,checked:checked}" onclick="{toggle}"> <div class="checkmark"></div> </div> <div class="label" onclick="{toggle}"><yield></yield></div> <input type="hidden" ref="{opts.ref}" riot-value="{checked}">', '', '', function (opts) {
    var _this = this;

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-combo', '<material-input ref="input"></material-input> <material-dropdown-list selected="{opts.selected}" ref="dropdown"></material-dropdown-list> <input type="hidden" riot-value="{value}" ref="{opts.ref || \'combo\'}"> <div ref="options" hidden> <yield></yield> </div>', '', '', function (opts) {
    var _this = this;

    // Basics
    this.items = [];
    this.title = null;
    var lastValue = this.value;
    var valueChanged = function valueChanged() {
        if (_this.value !== lastValue) {
            lastValue = _this.value;
            _this.root.dispatchEvent(new CustomEvent('change', { value: _this.value }));
        }
    };
    // Yielding
    this.getOptions = function () {
        // Get all options if it exits
        Array.prototype.forEach.call(_this.refs.options.children, function (option, key) {
            if (option.tagName.toLowerCase() == 'option') {
                var item = { title: option.innerHTML, value: option.getAttribute('value') };
                _this.items.push(item);
                // Set Selected
                if (option.getAttribute('isSelected') != null) {
                    _this.refs.dropdown.update({ selected: key });
                    _this.update({ value: item.value || item.title });
                    valueChanged();
                    _this.title = item.title;
                }
            }
        });
        // Submit items to the dropdown
        _this.refs.dropdown.update({ items: _this.items });
        // We should update value of material combo
        if (_this.refs.dropdown.selected) {
            _this.update({ hValue: _this.refs.dropdown.items[_this.refs.dropdown.selected].value || _this.refs.dropdown.items[_this.refs.dropdown.selected].title });
        }
        _this.update({ isParsed: true });
        valueChanged();
    };
    // Attributes
    if (opts.items) {
        try {
            this.items = eval(opts.items) || [];
            if (this.items.length) this.refs.dropdown.update({ items: this.items });
        } catch (e) {
            console.error('Something wrong with your items. For details look at it - ' + e);
        }
    }
    /**
     * Ready
     */
    this.on('mount', function () {
        // Setup options
        _this.getOptions();
        /**
         * When dropdown select event is working we
         * update material-input and hidden
         */
        _this.refs.dropdown.on('selectChanged', function (selected) {
            _this.update({ value: _this.refs.dropdown.items[selected].value || _this.refs.dropdown.items[selected].title });
            valueChanged();
            _this.refs.input.update({ value: _this.refs.dropdown.items[selected].title });
            // After animation end
            setTimeout(function () {
                _this.refs.dropdown.update({ items: _this.items });
            }, 200);
        });
        /**
         * When material-input value has been changed
         */
        _this.refs.input.on('valueChanged', function (value) {
            _this.refs.dropdown.update({ items: _this.filter('items', { title: value }) });
        });
        /**
         * If material-input focus has been changed
         * control dropdown opening
         */
        _this.refs.input.on('focusChanged', function (focus) {
            if (_this.refs.input.value == (opts.defaulttext || 'Choose item') && focus) {
                _this.refs.input.update({ value: '' });
            }
            if (_this.refs.input.value == '' && !focus) {
                _this.refs.input.update({ value: opts.defaulttext || 'Choose item' });
            }
            focus ? _this.refs.dropdown.open() : null;
        });
        // Defaults
        _this.refs.dropdown.root.style.top = _this.refs.input.root.getBoundingClientRect().height + 'px';
        _this.refs.input.update({ value: _this.title || opts.defaulttext || 'Choose item' });
    });

    // Manage collection
    this.mixin('collection');
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-dropdown-list', '<ul class="{dropdown-content:true,opening:opening}" if="{opened}"> <li each="{item,key in items}" class="{selected:parent.selected==key}"> <span if="{!item.link}" onclick="{parent.select}">{item.title}</span> <a if="{item.link}" href="{item.link}" onclick="{parent.select}" title="{item.title}">{item.title}</a> </li> </ul> <div ref="overlay" if="{opts.extraclose && opened}" onclick="{close}" class="material-dropdown-list-overlay"></div>', '', '', function (opts) {
    var _this = this;

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
        if (_this.opts.extraclose) document.body.appendChild(_this.refs.overlay);
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-dropdown', '<div ref="dropdown" class="{dropdown:true,opening:opening} {opts.animation || \'top\'}" if="{opened}"> <yield></yield> </div>', '', '', function (opts) {
    var _this = this;

    // Basics
    this.opened = opts.opened || false;
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-footer', '<content select=".material-footer-sections"></content> <div class="mini-footer"> <content select=".material-footer-logo"></content> <content select=".material-footer-link-list"></content> </div> <yield></yeild>', '', '', function (opts) {
  this.mixin('content');
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-input', '<div class="label-placeholder"></div> <div class="{input-content:true,not-empty:value,error:error}"> <label for="input" ref="label" if="{opts.label}">{opts.label}</label> <input type="{opts.type||\'text\'}" disabled="{disabled}" placeholder="{opts.placeholder}" onkeyup="{changeValue}" riot-value="{value}" autocomplete="off" ref="{opts.ref||\'default-input\'}" required="{required}"> <div class="iconWrapper" ref="iconWrapper" if="{opts.icon}"> <material-button ref="iconButton" center="true" waves-center="true" waves-color="{opts[\'waves-color\']||\'#fff\'}" rounded="true" onclick="{iconClickHandler}" waves-opacity="{opts[\'waves-opacity\']||\'0.6\'}" waves-duration="{opts[\'waves-duration\']||\'600\'}"> <yield></yield> </material-button> </div> </div> <div class="{underline:true,focused:focused,error:error}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>', '', '', function (opts) {
    var _this = this;

    // For Validation Mixin
    this.opts = opts;
    this.required = "";
    // From options
    this.name = opts.ref || 'input';
    // Not supported types
    this.notSupportedTypes = ['date', 'color', 'datetime', 'month', 'range', 'time'];
    if (this.notSupportedTypes.indexOf(opts.type) != -1) throw new Error('Sorry but we do not support ' + opts.type + ' type yet!');
    // Icons
    this.update({ showIcon: false });
    // Ready
    this.on('mount', function () {
        // Attributes
        _this.update({
            value: opts.value || '',
            disabled: opts.disabled || false,
            required: opts.required || false
        });

        _this.n = opts.ref || 'default-input';
        _this.refs[_this.n].addEventListener('focus', _this.changeFocus);
        _this.refs[_this.n].addEventListener('blur', _this.changeFocus);
    });
    /**
     * When element focus changed update expressions.
     */
    this.changeFocus = function (e) {
        if (_this.disabled) return false;
        _this.update({ focused: _this.refs[_this.n] == document.activeElement });
        _this.trigger('focusChanged', _this.focused, e);
        if (opts.focuschanged && typeof opts.focuschanged === "function") {
            opts.focuschanged(_this.focused);
        }
    };
    /**
     * Change input value should change tag behavior.
     * @param e
     */
    this.changeValue = function (e) {
        _this.update({ value: _this.refs[_this.n].value });
        _this.trigger('valueChanged', _this.refs[_this.n].value, e);
        if (opts.valuechanged && typeof opts.valuechanged === "function") {
            opts.valuechanged(_this.refs[_this.n].value);
        }
    };
    /**
     * Fire clicking on icon to outside world
     * @param e
     */
    this.iconClickHandler = function (e) {
        if (_this.opts.iconclicked && typeof _this.opts.iconclicked === 'function') _this.opts.iconclicked.call(_this, e);
        _this.trigger('iconclicked', e);
    };
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-navbar', '<div class="nav-wrapper"> <yield></yield> </div>', '', 'role="toolbar"', function (opts) {});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-pane', '<material-navbar riot-style="height:{opts.materialNavbarHeight || \'60px\'};line-height: {opts.materialNavbarHeight || \'60px\'};background-color:{opts.materialNavbarColor || \'#ccc\'}"> <content select=".material-pane-left-bar"></content> <content select=".material-pane-title"></content> <content select=".material-pane-right-bar"></content> </material-navbar> <div class="content"> <content select=".material-pane-content"></content> <yield></yield> </div>', '', '', function (opts) {
  this.mixin('content');
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-popup', '<div ref="popup" class="{popup:true,opening:opening} {opts.animation || \'top\'}" if="{opened}"> <div class="content"> <content select=".material-popup-title"></content> <yield></yield> </div> <div select=".material-popup-action"></div> </div> <div class="overlay" onclick="{close}" if="{opened}"></div>', '', '', function (opts) {
    var _this = this;

    // Basics
    this.opened = opts.opened || false;
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-snackbar', '<div class="{toast:true,error:toast.isError,opening:toast.opening}" onclick="{parent.removeToastByClick}" each="{toast,key in toasts}"> {toast.message} </div>', '', '', function (opts) {
    var _this = this;

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-spinner', '<svg class="loader-circular" height="50" width="50"> <circle class="loader-path" cx="25" cy="25.2" r="19.9" fill="none" stroke-width="{opts.strokewidth||3}" stroke-miterlimit="10"></circle> </svg>', '', '', function (opts) {});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-tabs', '<material-button each="{tab,k in tabs}" onclick="{parent.onChangeTab}" class="{selected:parent.selected==k}" waves-opacity="{parent.opts.wavesOpacity}" waves-duration="{parent.opts.wavesDuration}" waves-center="{parent.opts.wavesCenter}" waves-color="{parent.opts.wavesColor}"> <div class="text" title="{tab.title}">{parent.opts.cut ? parent.cut(tab.title) : tab.title}</div> </material-button> <div class="line-wrapper" if="{opts.useline}"> <div class="line" ref="line"></div> </div> <yield></yield>', '', '', function (opts) {
    var _this = this;

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
            node.style.width = _this.refs.line.style.width = (100 / _this.tabs.length).toFixed(2) + '%';
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
        if (opts.tabchanged && typeof opts.tabchanged === "function") {
            opts.tabchanged(_this.tabs[index], index);
        }
    };
    /**
     * Set line left style.
     */
    this.setLinePosition = function () {
        _this.refs.line.style.left = (100 / _this.tabs.length).toFixed(2) * _this.selected + '%';
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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


riot.tag2('material-textarea', '<div class="label-placeholder"></div> <div class="{textarea-content:true,not-empty:value,error:error}"> <label for="textarea" ref="label" if="{opts.label}">{opts.label}</label> <div class="mirror" ref="mirror"></div> <div class="textarea-container"> <textarea disabled="{disabled}" onkeyup="{changeValue}" ref="{opts.ref||\'default-textarea\'}"></textarea> </div> </div> <div class="{underline:true,focused:focused,error:error}"> <div class="unfocused-line"></div> <div class="focused-line"></div> </div>', '', '', function (opts) {
    var _this = this;

    // For Validation Mixin
    this.opts = opts;
    // From options
    this.disabled = opts.disabled || false;
    // Ready
    this.on('mount', function () {
        // Set max height to mirror, if we have max-rows option.
        if (opts.maxRows) _this.refs.mirror.style.maxHeight = opts.maxRows * _this.refs[_this.n].getBoundingClientRect().height + 'px';
        _this.n = opts.ref || 'default-textarea';
        // Defaults
        _this.value = opts.value || '';
        _this.refs.mirror.innerHTML = _this.format(_this.value);
        _this.refs[_this.n].value = _this.value;
        _this.refs[_this.n].scrollTop = _this.refs[_this.n].scrollHeight;
        // Add event listeners to input. It is wat which will help us
        // to provide focus\blur on material-input
        _this.refs[_this.n].addEventListener('focus', _this.changeFocus);
        _this.refs[_this.n].addEventListener('blur', _this.changeFocus);
        _this.refs[_this.n].addEventListener('input', _this.inputHandler);
        _this.update({ value: _this.value });
    });
    /**
     * When element focus changed update expressions.
     */
    this.changeFocus = function (e) {
        if (_this.disabled) return false;
        var focused = _this.refs[_this.n] == document.activeElement;
        _this.update({ focused: focused });
        _this.trigger('focusChanged', focused);
    };
    /**
     * Change input value should change tag behavior.
     * @param e
     */
    this.inputHandler = function (e) {
        var value = _this.refs[_this.n].value;
        _this.refs.mirror.innerHTML = _this.format(value);
        _this.update({ value: value });
    };

    this.changeValue = function (e) {
        _this.trigger('valueChanged', _this.refs[_this.n].value, e);
        if (opts.valuechanged && typeof opts.valuechanged === "function") {
            opts.valuechanged(_this.refs[_this.n].value);
        }
    };

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
    // Validation
    this.on('update', function (updated) {
        if (updated && updated.value != undefined) {
            if (_this.validationType) {
                _this.isValid(_this.validate(updated.value));
            }
        }
    });
    this.mixin('validate');
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bound = __webpack_require__(0);

var _bound2 = _interopRequireDefault(_bound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

riot.tag2('material-waves', '<div id="waves" ref="waves"></div>', '', '', function (opts) {
    var _this = this;
    /**
     * Wave class. Contain wave node and
     * all of waves logic.
     */

    var Wave = function (_Bound) {
        _inherits(Wave, _Bound);

        function Wave(container, opts, e) {
            _classCallCheck(this, Wave);

            // Initialize
            var _this2 = _possibleConstructorReturn(this, _Bound.call(this));

            if (!container) console.error('You should set container to the wave!');
            _this2.container = container;
            // Throw the components options
            _this2.maxOpacity = opts.opacity || 0.6;
            _this2.duration = opts.duration || 750;
            _this2.color = opts.color || '#fff';
            _this2.center = opts.center || false;
            // And event
            _this2.event = e;
            // Find related parameters
            _this2.containerBound = _this2.receiveBound();
            _this2.maxScale = _this2.containerBound.size / 100 * 10;
            _this2.created = Date.now();
            // Start point (center\mouse)
            _this2.start = {};
            // Startup
            _this2.createNode();
            _this2.waveIn();
            return _this2;
        }
        /**
         * Create node for wave
         */


        Wave.prototype.createNode = function createNode() {
            this.wave = document.createElement('div');
            this.wave.classList.add('wave');
            this.container.appendChild(this.wave);
        };
        /**
         * Starting the wave ripple.
         */


        Wave.prototype.waveIn = function waveIn() {
            var _this3 = this;

            if (this.center && !this.event) console.error('Setup at least mouse event... Or just set center attribute');
            // Starting point
            this.start.x = this.center ? this.containerBound.height / 2 : this.event.pageY - this.containerBound.offsetTop;
            this.start.y = this.center ? this.containerBound.width / 2 : this.event.pageX - this.containerBound.offsetLeft;
            // Set styles at next tick. Add a little delay to lovely retarded IE :D
            var isIE = window.navigator.userAgent.indexOf('Trident') !== -1;
            setTimeout(function () {
                return _this3.setStyles(_this3.maxOpacity);
            }, isIE ? 50 : 0);
        };
        /**
         * Fade out wave ripple. Just disappear...
         */


        Wave.prototype.waveOut = function waveOut(cb) {
            var _this4 = this;

            var delta = Date.now() - this.created;
            var deltaX = Math.round(this.duration / 2) - delta;
            var delay = deltaX > 0 ? deltaX : 0;
            setTimeout(function () {
                _this4.setStyles(0);
                setTimeout(function () {
                    if (_this4.wave.parentNode === _this4.container) {
                        _this4.container.removeChild(_this4.wave);
                        cb();
                    }
                }, _this4.duration);
            }, delay);
        };

        /**
         * Set styles to in\out
         * @param opacity - variable
         */


        Wave.prototype.setStyles = function setStyles(opacity) {
            this.wave.setAttribute('style', this.convertStyle({
                'top': this.start.x + 'px',
                'left': this.start.y + 'px',
                'transform': 'scale(' + this.maxScale + ')',
                'transition-duration': this.duration + 'ms',
                'transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
                'background': this.color,
                'opacity': opacity
            }));
        };
        /**
         * Convert object into style string.
         * @param o - object with styles
         * @returns {string}
         */


        Wave.prototype.convertStyle = function convertStyle(o) {
            var style = '';
            Object.keys(o).forEach(function (key) {
                if (o.hasOwnProperty(key)) {
                    style += key + ':' + o[key] + ';';
                }
            });
            return style;
        };

        return Wave;
    }(_bound2.default);
    // Basics


    this._waves = [];
    this._events = [];
    // Launch the ripple
    this.on('launch', function (e) {
        var wave = new Wave(_this.refs.waves, opts, e);
        _this._waves.push(wave);
        _this.trigger('wavestart', wave);
        if (_this.parent && _this.parent.opts && _this.parent.opts.wavestart) {
            _this.parent.opts.wavestart(wave);
        }
        if (!_this._events.length) {
            _this._events.push(e.target.addEventListener('mouseup', function () {
                return _this.trigger('hold');
            }));
            _this._events.push(e.target.addEventListener('mouseleave', function () {
                return _this.trigger('hold');
            }));
        }
    });
    // Hold the ripple. It will be removed later.
    this.on('hold', function () {
        // The last of waves
        if (_this._waves[_this._waves.length - 1]) _this._waves[_this._waves.length - 1].waveOut(_this.waveOut);
        if (_this._waves[_this._waves.length - 1]) _this._waves.slice(_this._waves.length - 1, 1);
    });
    /**
     * When a wave has been done its work.
     */
    this.waveOut = function () {
        _this.trigger('waveend');

        if (_this.parent && _this.parent.opts && _this.parent.opts.waveend) {
            _this.parent.opts.waveend();
        }
    };
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollectionMixin = function () {
    function CollectionMixin() {
        _classCallCheck(this, CollectionMixin);
    }

    /**
     * Filter collection by criteria
     * @params prop - collection name
     * @params criteria - object (Which field should be filtred)
     */
    CollectionMixin.prototype.filter = function filter(prop, criteria) {
        return this[prop].filter(function (item) {
            var criteriaPass = false;
            Object.keys(criteria).forEach(function (k) {
                var v = criteria[k];
                var regexp = new RegExp('' + v, 'i');
                criteriaPass = regexp.test(item[k]);
            });
            return criteriaPass;
        });
    };
    /**
     * Find something in collection
     * @params prop - collection name
     * @params criteria - object (Which field should be filtred)
     */


    CollectionMixin.prototype.find = function find(data, criteria) {
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
    };

    return CollectionMixin;
}();

exports.default = CollectionMixin;


riot.mixin('collection', CollectionMixin);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var DynamicAttributesMixin = function () {
    function DynamicAttributesMixin() {
        _classCallCheck(this, DynamicAttributesMixin);
    }

    DynamicAttributesMixin.prototype.init = function init() {
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
    };

    return DynamicAttributesMixin;
}();

exports.default = DynamicAttributesMixin;


riot.mixin('dynamicAttributes', DynamicAttributesMixin);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RiotHelpers = function () {
    function RiotHelpers() {
        _classCallCheck(this, RiotHelpers);
    }

    /**
     * Find tag in pack
     */
    RiotHelpers.prototype.findTag = function findTag(pack, name) {
        var searched = null;
        pack.forEach(function (tag) {
            if (tag.root.getAttribute('name').toLowerCase() == name.toLowerCase() || tag.root.tagName.toLowerCase() == name.toLowerCase() || tag.root.getAttribute('ref').toLowerCase() == name.toLowerCase()) {
                searched = tag;
            }
        });
        return searched;
    };
    /**
     * By the default riot don't support a camel case options
     * but in some cases we just use camel case, like a options
     * for instance
     */


    RiotHelpers.prototype.turnHyphensOptsToCamelCase = function turnHyphensOptsToCamelCase(opts) {
        for (var p in opts) {
            if (/-/.test(p)) {
                var camelCased = p.replace(/-([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                });
                opts[camelCased] = opts[p];
                delete opts[p];
            }
        }
    };

    return RiotHelpers;
}();

exports.default = RiotHelpers;


riot.findTag = RiotHelpers.findTag;

riot.mixin('helpers', RiotHelpers);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateMixin = function () {
    function ValidateMixin() {
        _classCallCheck(this, ValidateMixin);
    }

    ValidateMixin.prototype.init = function init() {
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
    };

    ValidateMixin.prototype.validate = function validate(value) {
        if (this.validationType) {
            return this['validateBy' + this.validationType](value);
        }
        return null;
    };

    ValidateMixin.prototype.validateByFunction = function validateByFunction(value) {
        if (this.validationFunction) {
            return this.validationFunction(value);
        }
    };

    ValidateMixin.prototype.validateByRegexp = function validateByRegexp(value) {
        if (this.validationRegexp) {
            return this.validationRegexp.test(value);
        }
    };

    ValidateMixin.prototype.validateByType = function validateByType(value) {
        return this.base[this.opts.type].test(value);
    };

    _createClass(ValidateMixin, [{
        key: 'base',
        get: function get() {
            return {
                'email': /^(([\w\.\-_]+)@[\w\-\_]+(\.\w+){1,}|)$/i,
                'number': /^(\d+|)$/i,
                'tel': /^((\+|\d)?([\d\-\(\)\#])|)+$/i,
                'url': /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/i
            };
        }
    }]);

    return ValidateMixin;
}();

exports.default = ValidateMixin;


riot.mixin('validate', ValidateMixin);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(6);
__webpack_require__(5);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(7);

__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(27);
__webpack_require__(26);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(28);

/***/ })
/******/ ]);