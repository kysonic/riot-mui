<material-popup>
    <div name="popup" class="{popup:true,opening:opening}" if="{opened}">
        <div class="content">
            <content select=".material-popup-title"></content>
            <div class="close" onclick="{close}">
                <i class="material-icons">close</i>
            </div>
            <yield></yield>
        </div>
    </div>
    <div class="overlay" onclick="{close}" if="{opened}"></div>
    <script type="es6">
        // Basics
        this.opened = opts.opened || false;
        // Attributes
        this.popup.classList.add(opts.animation || 'top');
        /**
         * Ready
         */
        this.on('mount',()=>{
            // Transfer a root node to body
            document.body.appendChild(this.root);
        });
        /**
         * Open dropdown
         */
        this.open = ()=>{
            this.update({opened:true,opening:true});
            setTimeout(()=>{
                this.update({opening:false});
            },0)
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
        this.mixin('content');
    </script>
</material-popup>