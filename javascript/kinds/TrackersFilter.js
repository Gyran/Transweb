enyo.kind({
    name: "TrackersFilter",
    kind: enyo.Control,
    tag: "ul",

    handlers: {
        onTorrentsUpdated: "torrentsUpdated"
    },

    trackers: [],

    create: function( ) {
        this.inherited( arguments );
    },

    filterTrackers: function( torrent ) {
        var tracker = torrent.getFirstTrackerStatus();
        var trackerHost =  tracker.getHostName();

        if ( enyo.indexOf( trackerHost, this.trackers ) === -1 ) {
            this.trackers.push( trackerHost );
        }
    },

    addTrackerFilter: function ( tracker ) {
        this.createComponent({
            kind: "TrackerFilter",
            tracker: tracker
        });
    },


    torrentsUpdated: function( sender ) {
        this.trackers = [];
        this.destroyClientControls( );
        enyo.forEach( enyo.application.getTorrents( ), enyo.bind( this, "filterTrackers" ), this );
        this.trackers.sort( function ( a, b ){
            an = a.toLowerCase();
            bn = b.toLowerCase();
            return ( an.localeCompare( bn ) );
        });
        enyo.forEach( this.trackers, enyo.bind( this, "addTrackerFilter" ), this );
        this.render();
    }
});