function TorrentsUpdater( cb ) {
	this.running = false;
	this.callback = cb;
}

TorrentsUpdater.prototype = {
	update: function( ) {
		var that = this;

		if ( that.running ) {
			return;
		}
		that.running = true;

		var addTorrent = function( torrent ) {
			t = new Torrent( );
			t.fill(torrent);
			enyo.application.addTorrent( t );
		}

		var response = function ( sender, response ) {
			if ( response.success ) {
				enyo.application.destoryTorrents( );
				enyo.forEach( response.arguments.torrents, addTorrent , that );
				that.running = false;
				that.callback( "onTorrentsUpdated" );
			} else {
				log( "Couldn't update torrents. Error " + response.message );
			}
		}

		//new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } )
		new enyo.Ajax( { url: "php/getTorrents.php" } )
		.response( response )
		.go( );
	}
}