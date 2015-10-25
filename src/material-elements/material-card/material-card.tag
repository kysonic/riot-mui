<material-card>
    <div class="title" if="{{titleExist}}">
        <content select=".material-card-title"></content>
    </div>
    <yield/>
    <script type="es6">
        this.titleExist = false;
        this.on('mount',()=>{
            this.update({titleExist:!!this.root.querySelector('.material-card-title')});
        });
        this.mixin('content');
    </script>
</material-card>