//require('./material-dropdown.scss');
<material-dropdown>
    <div name="dropdown" class="{{dropdown:true,opening:opening}}" if="{{opened}}">
        <yield></yield>
    </div>
    <script type="es6">
        // Basics
        this.opened = opts.opened || false;
        // Attributes
        this.dropdown.classList.add(opts.animation || 'top');
        /**
         * Open dropdown
         */
        this.open = ()=>{
            this.update({opened:true,opening:true});
            setTimeout(()=>{
                this.update({opening:false});
            },0);
        }
        /**
         * Close dropdown
         */
        this.close = ()=>{
            this.update({opening:true});
            setTimeout(()=>{
                this.update({opened:false});
            },200)
        }
    </script>
</material-dropdown>