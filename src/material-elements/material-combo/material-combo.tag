<material-combo>
    <material-input name="input"></material-input>
    <material-dropdown-list selected="{opts.selected}" name="dropdown"></material-dropdown-list>
    <input type="hidden" value="{value}" name="{opts.name || 'combo'}"/>
    <div name="options" hidden if="{!isParsed}">
        <yield></yield>
    </div>
    <script type="es6">
        // Basics
        this.items = [];
        this.isParsed = true;
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
            Array.prototype.forEach.call(this.options.children,(option,key)=>{
                if(option.tagName.toLowerCase()=='option') {
                    var item = {title:option.innerHTML,value:option.getAttribute('value')};
                    this.items.push(item);
                    // Set Selected
                    if(option.getAttribute('isSelected')!=null) {
                        this.tags.dropdown.update({selected:key});
                        this.update({value:item.value || item.title});
                        valueChanged();
                        this.title = item.title;
                    }
                }
            });
            // Submit items to the dropdown
            this.tags.dropdown.update({items:this.items});
            // We should update value of material combo
            if(this.tags.dropdown.selected) {
                this.update({hValue:this.tags.dropdown.items[this.tags.dropdown.selected].value || this.tags.dropdown.items[this.tags.dropdown.selected].title});
            }
            this.update({isParsed:true});
            valueChanged();
        }
        // Setup options
        this.getOptions();
        // Attributes
        if(opts.items) {
            try {
                this.items = eval(opts.items) || [];
                if(this.items.length) this.tags.dropdown.update({items:this.items});
            }
            catch(e){console.error(`Something wrong with your items. For details look at it - ${e}`)}
        }
        /**
         * Ready
         */
        this.on('mount',()=>{
            // Defaults
            this.tags.dropdown.root.style.top = this.tags.input.root.getBoundingClientRect().height + 'px';
            this.tags.input.update({value:this.title || (opts.defaulttext || 'Choose item')});
        });
        /**
         * When dropdown select event is working we
         * update material-input and hidden
         */
        this.tags.dropdown.on('selectChanged',(selected)=>{
            this.update({value:this.tags.dropdown.items[selected].value || this.tags.dropdown.items[selected].title});
            valueChanged();
            this.tags.input.update({value:this.tags.dropdown.items[selected].title});
            // After animation end
            setTimeout(()=>{
                this.tags.dropdown.update({items:this.items});
            },200);
        });
        /**
         * When material-input value has been changed
         */
        this.tags.input.on('valueChanged',(value)=>{
            this.tags.dropdown.update({items:this.filter('items',{title:value})});
        });
        /**
         * If material-input focus has been changed
         * control dropdown opening
         */
        this.tags.input.on('focusChanged',(focus)=>{
            if(this.tags.input.value==(opts.defaulttext || 'Choose item') && focus) {this.tags.input.update({value:''})}
            if(this.tags.input.value=='' && !focus) {this.tags.input.update({value:(opts.defaulttext || 'Choose item')})}
            focus ? this.tags.dropdown.open() : null;
        });
        // Manage collection
        this.mixin('collection');
    </script>
</material-combo>
