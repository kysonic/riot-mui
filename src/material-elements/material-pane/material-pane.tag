<material-pane>
    <material-navbar style="height:{opts['material-navbar-height'] || '60px'};line-height: {opts['material-navbar-height'] || '60px'};background-color:{opts['material-navbar-color'] || '#ccc'}">
        <content select=".material-pane-left-bar"></content>
        <content select=".material-pane-title"></content>
        <content select=".material-pane-right-bar"></content>
    </material-navbar>
    <div class="content">
        <content select=".material-pane-content"></content>
        <yield></yield>
    </div>
    <script type="es6">
        this.mixin('content');
    </script>
</material-pane>