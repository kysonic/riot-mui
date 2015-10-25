<material-snackbar>
    <div class="{{toast:true,error:toast.isError,opening:toast.opening}}" onclick="{{parent.removeToastByClick}}" each="{{toast,key in toasts}}" >
        {{toast.message}}
    </div>
    <script type="es6">
        // Basics
        this.toasts = [];
        this.intervals = {};
        /**
         * Add new toast in collection
         * @param toast
         */
        this.addToast = (toast,duration)=>{
            // Generate uniqe ID
            var toastID = this.toastID = Math.random().toString(36).substring(7);
            // Create new toast and open it
            this.toasts.push(Object.assign(toast,{opening:true,_id:toastID}));
            this.update({toasts:this.toasts});
            // Opening
            setTimeout(()=>{
                this.toasts[this.findToastKeyByID(toastID)].opening = false;
                this.update({toasts:this.toasts});
            },50);
            // Close after ending of duration time
            this.intervals[toastID] = setTimeout(()=>{this.removeToast(toastID);},opts.duration || duration || 5000);
        }
        /**
         * Remove toast after
         * @param toastID
         */
        this.removeToastAfterDurationEnding = (toastID)=>{
            this.removeToast(toastID);
        }
        /**
         * Helper. Allow to get key of toast (in toast array) by id
         * @param ID
         * @returns {*}
         */
        this.findToastKeyByID = (ID)=>{
            var toastKey = null;
            this.toasts.forEach((toast,key)=>{
                if(toast._id==ID) toastKey = key;
            });
            return toastKey;
        }
        /**
         * Remove toast by click
         * @param e - event
         */
        this.removeToastByClick = (e)=>{
            var toastID = e.item.toast._id;
            clearInterval(this.intervals[toastID]);
            this.removeToast(toastID);
        }
        /**
         * Remove toast from snackbar
         * @param toastID
         */
        this.removeToast = (toastID)=>{
            // First we should make sure that a requested toast is exist
            if(this.findToastKeyByID(toastID)!=null) {
                this.toasts[this.findToastKeyByID(toastID)].opening = true;
                this.update({toasts:this.toasts});
                // Wait a some time animation will end
                setTimeout(()=>{
                    this.toasts.splice(this.findToastKeyByID(toastID),1);
                    this.update({toasts:this.toasts});
                },200);
            }
        }
    </script>
</material-snackbar>