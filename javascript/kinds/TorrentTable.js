enyo.kind({
	name: "TorrentTable",
	kind: enyo.Control,
	tag: "table",

	classes: "torrentTable",

	components: [
		{ kind: "TorrentTableHead" }
	],

	handlers: {
		onUpdate: "update",
		onDeselectAll: "deselectAll",
		onSelectAll: "selectAll"
	},

	update: function(){
		this.listTorrents();
	},

	create: function () {
		this.inherited( arguments );
		this.update( );
	},

	listTorrents: function(){
		this.bubble( "onStartLoading" );
		new enyo.Ajax( { url: "php/rpcconnection.php", method: "post" } ).response( this, "listTorrentsResponse" ).go( { method: "getAll" } );
	},

	listTorrentsResponse: function(sender, response) {
		enyo.application.destoryTorrents( );
		this.destroyClientControls();
		enyo.forEach( response.arguments.torrents, this.addTorrentToList, this );
		this.render();
		this.bubble( "onStopLoading" );
	},

	addTorrentToList: function(torrent){
		t = new Torrent( );
		t.fill(torrent);
		enyo.application.addTorrent( t );
		if( enyo.application.torrentFilterFunction( t ) ){
			newTorrent = { kind: "TorrentRow", container: this, torrent: t };

			if( enyo.application.selectedTorrents.indexOf(t.hashString) !== -1 ) {
				newTorrent.classes = "selected";
			}

			this.createComponent(newTorrent);
		}
	},

	tap: function( sender, event ) {

	},

	deselectAll: function( ) {
		this.waterfall( "onDeselect" );
	},

	selectAll: function( ) {
		this.waterfall( "onSelect" );	
	}

});
