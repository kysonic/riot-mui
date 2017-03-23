<material-textarea>
    <div class="label-placeholder"></div>
    <div class="{textarea-content:true,not-empty:value,error:error}">
        <label for="textarea" ref="label" if="{opts.label}">{opts.label}</label>
        <div class="mirror" ref="mirror"></div>
        <div class="textarea-container">
            <textarea disabled="{disabled}" ref="{opts.ref||'default-textarea'}" value="{value}"></textarea>
        </div>
    </div>
    <div class="{underline:true,focused:focused,error:error}">
        <div class="unfocused-line"></div>
        <div class="focused-line"></div>
    </div>
    <script type="es6">
        // For Validation Mixin
        this.opts = opts;
        // From options
        this.disabled = opts.disabled || false;
        // Ready
        this.on('mount',()=>{
            // Set max height to mirror, if we have max-rows option.
            if(opts.maxRows) this.refs.mirror.style.maxHeight = opts.maxRows*this.refs[this.n].getBoundingClientRect().height + 'px';
            this.n = opts.ref||'default-textarea';
            // Defaults
            this.refs[this.n].scrollTop = this.refs[this.n].scrollHeight;
            // Add event listeners to input. It is wat which will help us
            // to provide focus\blur on material-input
            this.refs[this.n].addEventListener('focus',this.changeFocus);
            this.refs[this.n].addEventListener('blur',this.changeFocus);
            this.refs[this.n].addEventListener('input',this.inputHandler);
        })
        /**
         * When element focus changed update expressions.
         */
        this.changeFocus = (e)=>{
           if(this.disabled) return false;
           let focused = this.refs[this.n]==document.activeElement;
           this.update({focused:focused});
           this.trigger('focusChanged',focused);
        }
        /**
         * Change input value should change tag behavior.
         * @param e
         */
        this.inputHandler = (e)=>{
            let value = this.refs[this.n].value;
            this.refs.mirror.innerHTML = this.format(value);
            this.update({value:value});
            this.trigger('valueChanged',value);
        }
        // Validation
        this.on('update',(updated)=>{
            if(updated && updated.value!=undefined) {
                if(this.validationType) {
                    this.isValid(this.validate(updated.value));
                }
            }
        /**
         * Behevior after validation
         * @param isValid - (true/false)
         */
        this.isValid = (isValid)=>{
            this.update({error:!isValid});
        }
        /**
         * Format the value of textarea
         */
        this.format = (value)=>{
            return value.replace(/\n/g,'<br/>&nbsp;');
        }
        });
        this.mixin('validate');
    </script>
</material-textarea>