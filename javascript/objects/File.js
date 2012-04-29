function File( props ) {
    this.bytesCompleted = 0;
    this.length         = 0;
    this.name           = "";

    if ( props !== undefined ) {
        this.fill( props );
    }
}

File.prototype = {
    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                this[prop] = props[prop];
            }
        }
    }
}