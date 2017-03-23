<material-combo>
    <material-input ref="input"></material-input>
    <material-dropdown-list selected="{opts.selected}" ref="dropdown"></material-dropdown-list>
    <input type="hidden" value="{value}" ref="{opts.ref || 'combo'}"/>
    <div ref="options" hidden>
        <yield></yield>
    </div>
    <script type="es6">
        // Basics
        this.items = [];
        this.title = null;
        var lastValue = this.value;
        const valueChanged = ()=>{
          if(this.value !== lastValue) {
            lastValue = this.value;
            this.root.dispatchEvent(new CustomEvent('change', {value: this.value}));
          }
        }
        // Yielding
        this.getOptions = ()=>{
            // Get all options if it exits
            Array.prototype.forEach.call(this.refs.options.children,(option,key)=>{
                if(option.tagName.toLowerCase()=='option') {
                    var item = {title:option.innerHTML,value:option.getAttribute('value')};
                    this.items.push(item);
                    // Set Selected
                    if(option.getAttribute('isSelected')!=null) {
                        this.refs.dropdown.update({selected:key});
                        this.update({value:item.value || item.title});
                        valueChanged();
                        this.title = item.title;
                    }
                }
            });
            // Submit items to the dropdown
            this.refs.dropdown.update({items:this.items});
            // We should update value of material combo
            if(this.refs.dropdown.selected) {
                this.update({hValue:this.refs.dropdown.items[this.refs.dropdown.selected].value || this.refs.dropdown.items[this.refs.dropdown.selected].title});
            }
            this.update({isParsed:true});
            valueChanged();
        }
        // Attributes
        if(opts.items) {
            try {
                this.items = eval(opts.items) || [];
                if(this.items.length) this.refs.dropdown.update({items:this.items});
            }
            catch(e){console.error(`Something wrong with your items. For details look at it - ${e}`)}
        }
        /**
         * Ready
         */
        this.on('mount',()=>{
            // Setup options
            this.getOptions();
            /**
             * When dropdown select event is working we
             * update material-input and hidden
             */
            this.refs.dropdown.on('selectChanged',(selected)=>{
                this.update({value:this.refs.dropdown.items[selected].value || this.refs.dropdown.items[selected].title});
                valueChanged();
                this.refs.input.update({value:this.refs.dropdown.items[selected].title});
                // After animation end
                setTimeout(()=>{
                    this.refs.dropdown.update({items:this.items});
                },200);
            });
            /**
             * When material-input value has been changed
             */
            this.refs.input.on('valueChanged',(value)=>{
                this.refs.dropdown.update({items:this.filter('items',{title:value})});
            });
            /**
             * If material-input focus has been changed
             * control dropdown opening
             */
            this.refs.input.on('focusChanged',(focus)=>{
                if(this.refs.input.value==(opts.defaulttext || 'Choose item') && focus) {this.refs.input.update({value:''})}
                if(this.refs.input.value=='' && !focus) {this.refs.input.update({value:(opts.defaulttext || 'Choose item')})}
                focus ? this.refs.dropdown.open() : null;
            });
            // Defaults
            this.refs.dropdown.root.style.top = this.refs.input.root.getBoundingClientRect().height + 'px';
            this.refs.input.update({value:this.title || (opts.defaulttext || 'Choose item')});
        });

        // Manage collection
        this.mixin('collection');
    </script>
</material-combo>
