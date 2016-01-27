<material-textarea>
    <div class="label-placeholder"></div>
    <div class="{textarea-content:true,not-empty:value,error:error}">
        <label for="textarea" name="label" if="{opts.label}">{opts.label}</label>
        <div class="mirror" name="mirror"></div>
        <div class="textarea-container">
            <textarea disabled="{disabled}" name="textarea" value="{value}"></textarea>
        </div>
        <input type="hidden" value="{value}" name="{opts.name||'default'}">
    </div>
    <div class="{underline:true,focused:focused,error:error}">
        <div class="unfocused-line"></div>
        <div class="focused-line"></div>
    </div>
    <script type="es6">
        // Defaults
        this["textarea"].scrollTop = this["textarea"].scrollHeight;
        // For Validation Mixin
        this.opts = opts;
        // From options
        this.disabled = opts.disabled || false;
        // Ready
        this.on('mount',()=>{
            // Set max height to mirror, if we have max-rows option.
            if(opts.maxRows) this.mirror.style.maxHeight = opts.maxRows*this["textarea"].getBoundingClientRect().height + 'px';
            this.textarea.name = opts.name || 'textarea';
        })
        /**
         * When element focus changed update expressions.
         */
        this.changeFocus = (e)=>{
           if(this.disabled) return false;
           let focused = this["textarea"]==document.activeElement;
           this.update({focused:focused});
           this.trigger('focusChanged',focused);
        }
        /**
         * Change input value should change tag behavior.
         * @param e
         */
        this.inputHandler = (e)=>{
            let value = this["textarea"].value;
            this.mirror.innerHTML = this.format(value);
            this.update({value:value});
            this.trigger('valueChanged',value);
        }
        // Add event listeners to input. It is wat which will help us
        // to provide focus\blur on material-input
        this["textarea"].addEventListener('focus',this.changeFocus);
        this["textarea"].addEventListener('blur',this.changeFocus);
        this["textarea"].addEventListener('input',this.inputHandler);
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
        /**
         * Format the value of textarea
         */
        this.format = (value)=>{
            return value.replace(/\n/g,'<br/>&nbsp;');
        }
        this.mixin('validate');
    </script>
</material-textarea>