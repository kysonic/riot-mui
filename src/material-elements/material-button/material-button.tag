require('./material-button.scss');
require('../../mixins/dynamicAttributes.es6');
require('../material-waves/material-waves.tag');
<material-button>
    <material-waves onclick="{{click}}" onmousedown="{{launch}}" center="{{opts['waves-center']}}" rounded="{{opts['rounded']}}" opacity="{{opts['waves-opacity']}}" color="{{opts['waves-color']}}"
                    duration="{{opts['waves-duration']}}"></material-waves>
    <div class="content"><yield></yield></div>

    <script type="es6">
        // Dynamic attribute for using special styles.
        this.dynamicAttributes = ['disabled'];
        // Attributes
        this.disabled = opts.disabled || false;
        // Launch waves
        this.launch = (e)=>{
            if(!this.disabled) this.tags['material-waves'].trigger('launch',e);
        }
        // Trigger the click
        this.click = ()=>{
            if(opts.link) window.location.href=opts.link;
            this.trigger('click');
        }
        // Add mixin
        this.mixin('dynamicAttributes');
    </script>
</material-button>