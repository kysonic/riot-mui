<material-input>
    <div class="label-placeholder"></div>
    <div class="{input-content:true,not-empty:value,error:error}">
        <label for="input" name="label" if="{opts.label}">{opts.label}</label>
        <input type="{opts.type||'text'}" disabled="{disabled}" placeholder="{opts.placeholder}" onkeyup="{changeValue}" value="{value}" autocomplete="off" name="{opts.name||'default-input'}" required="{required}"/>
        <div class="iconWrapper" name="iconWrapper" if="{opts.icon}" >
            <material-button name="iconButton" center="true" waves-center="true" waves-color="{opts['waves-color']||'#fff'}"
                             rounded="true" waves-opacity="{opts['waves-opacity']||'0.6'}" waves-duration="{opts['waves-duration']||'600'}">
                <yield></yield>
            </material-button>
        </div>
    </div>
    <div class="{underline:true,focused:focused,error:error}">
        <div class="unfocused-line"></div>
        <div class="focused-line"></div>
    </div>

    <script type="es6">
        
        // For Validation Mixin
        this.opts = opts;
        this.required="";
        // From options
        this.name = opts.name || 'input';
        // Not supported types
        this.notSupportedTypes = ['date','color','datetime','month','range','time'];
        if(this.notSupportedTypes.indexOf(opts.type)!=-1) throw new Error(`Sorry but we not support ${date} type yet!`);
        // Icons
        this.update({showIcon:false});
        // Ready
        this.on('mount',()=>{
            // Attributes
            this.update({
                value:opts.value || '',
                disabled : opts.disabled || false,
                required: opts.required||false
            });

            this.n = opts.name||'default-input';
            this[this.n].addEventListener('focus',this.changeFocus);
            this[this.n].addEventListener('blur',this.changeFocus);
        });
        /**
         * When element focus changed update expressions.
         */
        this.changeFocus = (e)=>{
            if(this.disabled) return false;
            this.update({focused:this[this.n]==document.activeElement});
            this.trigger('focusChanged',this.focused,e);
            if(opts.focuschanged&&(typeof(opts.focuschanged)==="function")){
                opts.focuschanged(this.focused);
            }
        }
        /**
         * Change input value should change tag behavior.
         * @param e
         */
        this.changeValue = (e)=>{
            this.update({value:this[this.n].value});
            this.trigger('valueChanged',this[this.n].value,e);
            if(opts.valuechanged&&(typeof(opts.valuechanged)==="function")){
                opts.valuechanged(this[this.n].value);
            }
        }
        // Validation
        this.on('update',(updated)=>{
            if(updated && updated.value!=undefined) {
                if(this.validationType) {
                    this.isValid(this.validate(updated.value));
                }
            }
        });
        /**
         * Behevior after validation
         * @param isValid - (true/false)
         */
        this.isValid = (isValid)=>{
            this.update({error:!isValid});
        }
        this.mixin('validate');
    </script>
</material-input>