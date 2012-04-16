enyo.kind({
	name: "StopTorrentToolbarButton",
	kind: enyo.Button,

	content: "Stop torrent",

	tap: function( sender, event ) {
		if( enyo.application.selectedTorrents.length <= 0 ) {
			return;
		}

		this.bubble( "onStartLoading" );
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" })
		.response(this, "stopped")
		.go( { method: "stopTorrents", 'torrents[]': enyo.application.selectedTorrents } );
	},

	stopped: function( sender, response ) {
		this.bubble( "onStopLoading" );
	}


	

});