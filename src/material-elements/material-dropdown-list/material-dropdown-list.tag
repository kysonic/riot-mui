<material-dropdown-list>
    <ul class="{dropdown-content:true,opening:opening}" if="{opened}" >
        <li each="{item,key in items}" class="{selected:parent.selected==key}">
            <span if="{!item.link}" onclick="{parent.select}">{item.title}</span>
            <a if="{item.link}" href="{item.link}" onclick="{parent.select}" title="{item.title}">{item.title}</a>
        </li>
    </ul>
    <div name="overlay" if="{opts.extraclose && opened}" onclick="{close}" class="material-dropdown-list-overlay"></div>
    <script type="es6">
        // Basics
        this.opened = false;
        // Attributes
        if(opts.items) {
            try{this.items = eval(opts.items) || []}
            catch(e){console.error(`Something wrong with your items. For details look at it - ${e}`)}
            this.update({items:this.items});
        }
        // Set selected
        if(opts.selected) {
            this.update({selected:opts.selected});
        }
        /**
         * Select dropdown item
         * @param e
         */
        this.select = (e)=>{
            this.update({selected:e.item.key});
            this.close();
            // Trigger event. It will help you to grab selected value from outside
            // of this component
            this.trigger('selectChanged',e.item.key,e.item.item);
            return true;
            ///if(e.item.item.link) location.href = e.item.item.link;
        }
        /**
         * Open dropdown list
         */
        this.open = ()=>{
            this.update({opened:true,opening:true});
            if(this.opts.extraclose) document.body.appendChild(this.overlay);
            setTimeout(()=>{
                this.update({opening:false});
            },0);
        }
        /**
         * Close dropdown list
         */
        this.close = ()=>{
            this.update({opening:true});
            setTimeout(()=>{
                this.update({opened:false});
            },200)
        }
    </script>
</material-dropdown-list>