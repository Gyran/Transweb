function Tracker ( props ) {
    this.announce = "";
    this.id       = 0;
    this.scrape   = "";
    this.tier     = 0;

    if ( props !== undefined ) {
        this.fill( props );
    }

}

Tracker.prototype = {

    fill: function ( props ) {
        for ( prop in props ) {
            if ( props.hasOwnProperty(prop) ) {
                this[prop] = props[prop];
            }
        }
    }

}