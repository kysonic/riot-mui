let ValidateMixin = {
    get base(){
      return {
          'email': /^(([\w\.\-_]+)@[\w\-\_]+(\.\w+){1,}|)$/i,
          'number': /^(\d+|)$/i,
          'tel': /^((\+|\d)?([\d\-\(\)\#])|)+$/i,
          'url': /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/i
      }
    },
    init(){
      if(!this.opts) console.debug('Sorry, but for using validate mixin you should add following code in your component: this.opts = opts;')
      if(this.opts && this.opts.valid) {
          this.validationType = typeof this[this.opts.valid] == 'function' ? 'Function' : 'Regexp';
          if(this.validationType==='Regexp') {
              try{this.validationRegexp = eval(this.opts.valid);}
              catch (e) {throw new Error(`Something wrong with your regular expression!. Checkout --- ${e}`)}
          }
          if(this.validationType==='Function') {
              this.validationFunction = this[this.opts.valid] || false;
          }
      }else if(this.opts && Object.keys(this.base).indexOf(this.opts.type)!=-1) {
             this.validationType = 'Type';
      }
    },
    validate(value){
        if(this.validationType)  {
            return this['validateBy'+this.validationType](value);
        }
        return null;
    },
    validateByFunction(value) {
        if(this.validationFunction) {
            return this.validationFunction(value);
        }
    },
    validateByRegexp(value) {
        if(this.validationRegexp) {
            return this.validationRegexp.test(value);
        }
    },
    validateByType(value) {
        return this.base[this.opts.type].test(value);
    }
}

riot.mixin('validate',ValidateMixin);