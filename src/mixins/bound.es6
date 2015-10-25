/**
 * Bound class contain methods for
 * receiving bounds of DOM element.
 */
class Bound {
    /**
     * Get Bounds
     * @returns {*}
     */
    receiveBound(){
        if(!this.container) console.error('Yor class must contain a container. It is DOM Element. Define please this.container property.')
        var document, window, box,
            doc = this.container && this.container.ownerDocument;
        // Get document
        document = doc.documentElement;
        // Get container
        if (typeof this.container.getBoundingClientRect !== typeof undefined) {
            box = this.container.getBoundingClientRect();
        }
        window = this.getWindow(doc);
        // Return BoundingRect with additional properties.
        return this.mix(box,{
            size:  Math.max(box.width, box.height),
            offsetTop: box.top + window.pageYOffset - document.clientTop,
            offsetLeft: box.left + window.pageXOffset - document.clientLeft
        })
    }

    /**
     * Window or not?
     * @param o - supposing object
     * @returns {boolean}
     */
    isWindow (o){
        return o !== null && o === o.window;
    }

    /**
     * Get window method
     * @param e - supposing object
     * @returns {*}
     */
    getWindow(o){
        return this.isWindow(o) ? o : o.nodeType === 9 && o.defaultView;
    }

    /**
     * Simple mixin. Unfortunately, babel don't support Object.assign \ or mixin
     * @param so
     * @param to
     * @returns {*}
     */
    mix(so,to) {
        for (var key in so) {
            // only copy if not already present
            if (!(key in to)) {
                to[key] = so[key];
            }
        }
        return to;
    }
}

riot.mixin('Bound',Bound);

