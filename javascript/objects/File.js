function File( props ) {
    this._bytesCompleted = 0;
    this._length         = 0;
    this._name           = "";

    if ( props !== undefined ) {
        this.fill( props );
    }
}

File.prototype = {
    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                this["_" + prop] = props[prop];
            }
        }
    },

    /**** Getters ****/
    getName: function () { return this._name },
    getLength: function () { return this._length },
    getBytesCompleted: function () { return this._bytesCompleted },
    /**** /Getters ****/

    /**** Custom Getters ****/
    getFileName: function () { return this.getName().replace( /(.*\/)/, "" )  }
    /**** /Custom Getters ****/
}