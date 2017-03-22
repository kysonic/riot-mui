<material-dropdown>
    <div ref="dropdown" class="{dropdown:true,opening:opening} {opts.animation || 'top'}" if="{opened}">
        <yield></yield>
    </div>
    <script type="es6">
        // Basics
        this.opened = opts.opened || false;
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