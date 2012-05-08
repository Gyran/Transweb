function FileStats( props ) {
    this._bytesCompleted = 0;
    this._wanted         = false;
    this._priority       = 0;

    if ( props !== undefined ) {
        this.fill( props );
    }
}

FileStats.prototype = {
    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                this["_" + prop] = props[prop];
            }
        }
    },

    /**** Getters ****/
    getBytesCompleted: function () { return this._bytesCompleted },
    getWanted: function () { return this._wanted },
    getPriority: function () { 
        if ( this.isWanted() ) {
            return this._priority 
        } else {
            return FileStats._DONT_DOWNLOAD;
        }
    },

    /**** /Getters ****/

    /**** Custom Geeters ****/
    getPriorityName: function () {
        switch ( this.getPriority() ) {
            case FileStats._DONT_DOWNLOAD:
                return "Don't download";
            case FileStats._PRIORITY_LOW:
                return "Low priority";
            case FileStats._PRIORITY_NORMAL:
                return "Normal priority";
            case FileStats._PRIORITY_HIGH:
                return "High priority";
        }
    },

    /**** /Custom Getters ****/

    isWanted: function () { return this.getWanted() }
}

FileStats._DONT_DOWNLOAD   = -100;
FileStats._PRIORITY_LOW    = -1;
FileStats._PRIORITY_NORMAL =  0;
FileStats._PRIORITY_HIGH   =  1;

FileStats._DONT_DOWNLOAD_NAME   = "Don't download";
FileStats._PRIORITY_LOW_NAME    = "Low priority";
FileStats._PRIORITY_NORMAL_NAME = "Normal priority";
FileStats._PRIORITY_HIGH_NAME   = "High priority";