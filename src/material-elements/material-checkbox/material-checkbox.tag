<material-checkbox>
    <div class="{{checkbox:true,checked:checked}}" onclick="{{toggle}}">
        <div class="checkmark"></div>
    </div>
    <div class="label" onclick="{{toggle}}"><yield></yield></div>
    <input type="hidden" name="{{opts.name}}" value="{{checked}}">
    <script type="es6">
        this.checked = opts.checked || false;
        // Attributes
        this.disabled = opts.disabled || false;
        /**
         * Toggle checkbox
         */
        this.toggle = ()=>{
            if(this.disabled) return false;
            this.update({checked: !this.checked});
            this.trigger('toggle',this.checked);
        }
    </script>
</material-checkbox>