let RiotHelpers = {
    /**
     * Find tag in pack
     */
     findTag(pack,name){
         var searched = null;
         pack.forEach(function(tag){
             if(tag.root.getAttribute('name').toLowerCase()==name.toLowerCase() || tag.root.tagName.toLowerCase()==name.toLowerCase()) {
                 searched = tag;
             }
         });
         return searched;
     },
    /**
     * By the default riot don't support a camel case options
     * but in some cases we just use camel case, like a options
     * for instance
     */
     turnHyphensOptsToCamelCase(opts) {
         for(var p in opts) {
             if(/-/.test(p)) {
                 var camelCased = p.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                 opts[camelCased] = opts[p];
                 delete opts[p];
             }
         }
     }
}

riot.findTag = RiotHelpers.findTag;

riot.mixin('helpers',RiotHelpers);