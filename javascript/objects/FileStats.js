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
    getPriority: function () { return this._priority }
    /**** /Getters ****/
}

FileStats.PRIORITY_LOW    = -1;
FileStats.PRIORITY_NORMAL =  0;
FileStats.PRIORITY_HIGH   =  1;