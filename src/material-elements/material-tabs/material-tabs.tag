<material-tabs>
        <material-button each="{tab,k in tabs}" onclick="{parent.onChangeTab}" class="{selected:parent.selected==k}" waves-opacity="{parent.opts.wavesOpacity}" waves-duration="{parent.opts.wavesDuration}" waves-center="{parent.opts.wavesCenter}" waves-color="{parent.opts.wavesColor}" >
            <div class="text" title="{tab.title}">{parent.opts.cut ? parent.cut(tab.title) : tab.title}</div>
        </material-button>
        <div class="line-wrapper" if="{opts.useline}">
            <div class="line" name="line"></div>
        </div>
        <yield></yield>
    <script type="es6">
        // Basics
        this.selected = 0;
        this.tabs = [];
        // Attributes
        if(opts.tabs) {
            var tabs = [];
            try{
                tabs = opts.tabs ? eval(opts.tabs) : [];
                this.tabs = tabs;
            }catch(e){}
        }
        /**
         * Ready
         */
        this.on('mount',()=>{
            this.setWidth();
            this.setLinePosition();
        });
        /**
         * Set width on tab buttons and line
         * @param
         */
        this.setWidth = ()=>  {
            [].forEach.call(this.root.querySelectorAll('material-button'),(node)=>{
                node.style.width = this.line.style.width = (100/this.tabs.length).toFixed(2) +'%';
            });
        }
        /**
         * Change selected tab by click on it.
         * @param e
         */
        this.onChangeTab = (e)=>{
            var selected = this.tabs.indexOf(e.item.tab);
            this.changeTab(selected);
        }
        /**
         * Change tab handler. Change selected and line position.
         * @param index
         */
        this.changeTab = (index)=>{
            this.update({selected:index});
            this.setLinePosition();
            // Fire
            this.trigger('tabChanged',this.tabs[index],index);
            if(opts.tabchanged&&(typeof(opts.tabchanged)==="function")){
                opts.tabchanged(this.tabs[index],index);
            }
        }
        /**
         * Set line left style.
         */
        this.setLinePosition = ()=>{
            this.line.style.left = (100/this.tabs.length).toFixed(2) * (this.selected) +'%';
        }
        /**
         * Cut symbols
         * @param title
         * @returns {string}
         */
        this.cut = (title)=>{
            return title.length > opts.cut ? title.substr(0,opts.cut)+'...' : title;
        }
    </script>
</material-tabs>