/**
 * The mixin ables to update root tag attributes
 * if in this.dynamicAttributes array contains
 * name of attribute, which equals variable into tag instance
 * Example:
 * <my-tag disabled="true"></my-tag>
 * <my-tag>
 *     ....
 *     <script>
 *         this.disabled = true;
 *         this.dynamicAttributes = ['disabled'];
 *         setTimeout(function(){
 *              this.update({disabled:false});
 *         }.bind(this),1000);
 *     </script>
 * </my-tag>
 * In this example disabled attribute of my-tag
 * will be changed after 1s and we will see following HTML
 * <my-tag disabled="false"></my-tag>
 */
let DynamicAttributesMixin = {
    init(){
        this.on('update', (updated)=>{
            if(updated && this.dynamicAttributes) {
                this.dynamicAttributes.forEach((key)=>{
                    if(updated[key]!=undefined) {
                        this.root.setAttribute(key,updated[key]);
                    }
                });
            }
        });
    }
}

riot.mixin('dynamicAttributes',DynamicAttributesMixin);