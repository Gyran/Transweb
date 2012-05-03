enyo.kind({
    name: "TrackerFilter",
    kind: enyo.Control,
    tag: "li",

    published: {
        tracker: ""
    },

    handlers: {
        onTorrentsUpdated: "torrentsUpdated"
    },

    i: 0,

    create: function () {
        this.inherited( arguments );
        this.trackerChanged();
        
    },

    trackerChanged: function () {
        this.setContent( this.tracker + " (" + this.i + ")" );
    },

    tap: function ( sender, event ) {
        enyo.application.setPref( "torrentFilterFunction", enyo.bind( this, "filterFunction" ) );
        this.bubble( "onForceUpdate" );
    },



    filterFunction: function ( torrent ) {
        var tracker = torrent.getFirstTrackerStatus();
        var trackerHost =  tracker.getHostName();
        if ( trackerHost === this.tracker ) {
            return true;
        }
        return false;
    },

    torrentsUpdated: function ( ) {
        var t = this;
        t.i = 0;
        enyo.forEach( enyo.application.getTorrents( ), 
            function( torrent ) {
                if( t.filterFunction( torrent ) ){
                    t.i++;
                }
        }, this );
        t.trackerChanged( );
    }
});
