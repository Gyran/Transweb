enyo.kind({
	name: "StartTorrentToolbarButton",
	kind: enyo.Button,

	content: "Start torrent",

	tap: function( sender, event ) {
		if( enyo.application.selectedTorrents.length <= 0 ) {
			return;
		}

		this.bubble( "onStartLoading" );
		new enyo.Ajax({url: "php/rpcconnection.php", method: "post" })
		.response(this, "started")
		.go( { method: "startTorrents", 'torrents[]': enyo.application.selectedTorrents } );
	},

	started: function( sender, response ) {
		this.bubble( "onForceUpdate" );
		this.bubble( "onStopLoading" );
	}


	

});