function Units ( props ) {
    this._speed_units  = [];
    this._speed_bytes  = 0;
    this._size_units   = [];
    this._size_bytes   = 0;
    this._memory_units = [];
    this._memory_bytes = 0;

    if ( props !== undefined ) {
        this.fill( props );
    }

}

Units.prototype = {

    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty( prop ) ) {
                this["_" + prop] = props[prop];
            }
        }
    },

    /* Getters */
    getSpeedUnits: function () { return this._speed_units },
    getSpeedBytes: function () { return this._speed_bytes },
    getSizeUnits: function () { return this._size_units },
    getSizeBytes: function () { return this._size_bytes },
    getMemoryUnits: function () { return this._memory_units },
    getMemoryBytes: function () { return this._memory_bytes },
    /* /Getters */

    /* Cusom getters */
    getSpeedUnit: function ( n ) { return this.getSpeedUnits()[n] },
    getSizeUnit: function ( n ) { return this.getSizeUnits()[n] },
    getMemoryUnit: function ( n ) { return this.getMemoryUnits()[n] }
    /* /Cusom getters */

}